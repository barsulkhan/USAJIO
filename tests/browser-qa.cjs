const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const pages = [
  'compound-interest.html','loan-calculator.html','monthly-budget.html',
  'savings-goal.html','emergency-fund.html','debt-payoff.html',
  'mortgage-calculator.html','auto-loan-calculator.html','credit-card-payoff.html',
  'retirement-calculator.html','student-loan-payoff.html','net-worth-calculator.html'
];
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err,data) => {
    if (err) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, {'content-type':mime[path.extname(file)] || 'application/octet-stream'}); res.end(data);
  });
});

(async()=>{
  await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
  const browser = await chromium.launch({headless:true});
  const errors=[];
  const accessibilityFindings=[];
  try {
    const page = await browser.newPage({viewport:{width:1365,height:900}});
    page.on('pageerror',e=>errors.push('pageerror: '+e.message));
    page.on('console',m=>{if(m.type()==='error') errors.push('console: '+m.text());});
    page.on('response',r=>{if(r.status()>=400) errors.push('HTTP '+r.status()+' '+r.url());});

    const home=await page.goto('http://127.0.0.1:4173/index.html');
    const axe = require('axe-core');
    const auditA11y=async(label)=>{
      // Each page navigation replaces the document, so inject axe for every page.
      await page.addScriptTag({content:axe.source});
      const result=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
      for(const v of result.violations){
        accessibilityFindings.push({page:label,id:v.id,impact:v.impact,description:v.help,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))});
      }
    };
    await auditA11y('index.html');
    if(!home.ok()) throw new Error('Homepage did not load');
    const homeCards=await page.locator('.tool-card a[href]').count();
    if(homeCards<12) throw new Error('Homepage calculator navigation links missing: '+homeCards);

    for(const file of pages){
      const response=await page.goto('http://127.0.0.1:4173/'+file);
      if(!response || !response.ok()) throw new Error(file+' failed to load');
      await page.waitForLoadState('networkidle');
      await auditA11y(file);
      const title=await page.title();
      if(!title.includes('USAJIO')) throw new Error(file+' missing branded title');
      const calc=page.locator('button[id$="-calc"]');
      if(await calc.count()!==1) throw new Error(file+' should have exactly one calculator action');
      await calc.click();
      const results=page.locator('.result-grid');
      if(await results.count()!==1) throw new Error(file+' missing result region');
      const text=(await results.innerText()).trim();
      if(!text || /—/.test(text) || /Check inputs/.test(text)) throw new Error(file+' default calculation did not produce results: '+text);
      if(await results.getAttribute('aria-live')!=='polite') throw new Error(file+' result region is not announced politely');
    }


    // Reproducible financial-math and input-boundary matrix for all 12 tools.
    const money = async id => {
      const raw=(await page.locator('#'+id).innerText()).replace(/[^0-9.-]/g,'');
      const value=Number(raw);
      if(!Number.isFinite(value)) throw new Error(id+' is not a finite money result: '+raw);
      return value;
    };
    const textOf = async id => (await page.locator('#'+id).innerText()).trim();
    const set = async values => { for(const [id,value] of Object.entries(values)) await page.locator('#'+id).fill(String(value)); };
    const calculate = async (file,button,values) => {
      await page.goto('http://127.0.0.1:4173/'+file);
      await set(values);
      await page.locator('#'+button).click();
    };
    const near = (actual,expected,label,tolerance=0.02) => {
      if(Math.abs(actual-expected)>tolerance) throw new Error(label+': expected '+expected+', got '+actual);
    };
    const expectInvalid = async (id,label) => {
      const value=await textOf(id);
      if(!/Check inputs/.test(value)) throw new Error(label+': expected input validation, got '+value);
    };

    // 1. Compound interest: month-end deposits and all compounding choices.
    for(const [frequency,expected] of [[12,2279.047447],[4,2278.713893],[1,2277.257753]]){
      await calculate('compound-interest.html','ci-calc',{'ci-principal':1000,'ci-monthly':100,'ci-rate':5,'ci-years':1});
      await page.locator('#ci-frequency').selectOption(String(frequency));
      await page.locator('#ci-calc').click();
      near(await money('ci-result'),expected,'Compound frequency '+frequency);
      near(await money('ci-paid'),2200,'Compound contributions');
    }
    await calculate('compound-interest.html','ci-calc',{'ci-principal':0,'ci-monthly':0,'ci-rate':0,'ci-years':1});
    near(await money('ci-result'),0,'Compound all-zero');
    await page.locator('#ci-years').fill('0'); await page.locator('#ci-calc').click(); await expectInvalid('ci-result','Compound zero years');

    // 2. Fixed-rate personal loan: standard payment, zero-rate and extra-payment payoff.
    await calculate('loan-calculator.html','loan-calc',{'loan-amount':10000,'loan-rate':7,'loan-years':5,'loan-extra':0});
    near(await money('loan-monthly'),198.013,'Loan scheduled payment',0.02);
    near(await money('loan-interest'),1880.72,'Loan total interest');
    near(await money('loan-total'),11880.72,'Loan total repayment');
    await set({'loan-amount':1200,'loan-rate':0,'loan-years':1,'loan-extra':0}); await page.locator('#loan-calc').click();
    near(await money('loan-monthly'),100,'Zero-rate loan payment'); near(await money('loan-interest'),0,'Zero-rate loan interest'); near(await money('loan-total'),1200,'Zero-rate loan total');
    await page.locator('#loan-amount').fill('0'); await page.locator('#loan-calc').click(); await expectInvalid('loan-monthly','Zero principal loan');

    // 3. Monthly budget: surplus and deficit.
    await calculate('monthly-budget.html','budget-calc',{'budget-income':3500,'budget-housing':900,'budget-food':500,'budget-transport':300,'budget-bills':250,'budget-other':400});
    near(await money('budget-expenses'),2350,'Budget expenses'); near(await money('budget-remaining'),1150,'Budget surplus');
    if(await textOf('budget-share')!=='32.9%') throw new Error('Budget surplus percentage mismatch');
    await set({'budget-income':2000,'budget-housing':900,'budget-food':500,'budget-transport':300,'budget-bills':250,'budget-other':300}); await page.locator('#budget-calc').click();
    near(await money('budget-remaining'),-250,'Budget deficit');
    await page.locator('#budget-income').fill('-1'); await page.locator('#budget-calc').click(); await expectInvalid('budget-remaining','Negative budget income');

    // 4. Savings goal: ordinary gap, already-funded target, invalid duration.
    await calculate('savings-goal.html','save-calc',{'save-target':5000,'save-current':500,'save-months':18});
    near(await money('save-monthly'),250,'Savings monthly contribution');
    await set({'save-target':5000,'save-current':6000,'save-months':18}); await page.locator('#save-calc').click(); near(await money('save-monthly'),0,'Savings goal already reached');
    await page.locator('#save-months').fill('0'); await page.locator('#save-calc').click(); await expectInvalid('save-monthly','Zero savings duration');

    // 5. Emergency fund: target, gap and already-funded state.
    await calculate('emergency-fund.html','ef-calc',{'ef-cost':1800,'ef-months':6,'ef-current':1000});
    near(await money('ef-goal'),10800,'Emergency fund target'); near(await money('ef-gap'),9800,'Emergency fund gap');
    await page.locator('#ef-current').fill('12000'); await page.locator('#ef-calc').click(); near(await money('ef-gap'),0,'Emergency fund already funded');
    await page.locator('#ef-months').fill('0'); await page.locator('#ef-calc').click(); await expectInvalid('ef-gap','Zero emergency months');

    // 6. Debt payoff: amortization, zero APR, zero balance and insufficient payment.
    await calculate('debt-payoff.html','debt-calc',{'debt-balance':5000,'debt-rate':12,'debt-payment':250});
    if(await textOf('debt-months')!=='23') throw new Error('Debt payoff expected 23 months, got '+await textOf('debt-months'));
    near(await money('debt-interest'),606.7396,'Debt payoff interest');
    await set({'debt-balance':5000,'debt-rate':0,'debt-payment':250}); await page.locator('#debt-calc').click();
    if(await textOf('debt-months')!=='20') throw new Error('Zero-rate debt payoff expected 20 months');
    near(await money('debt-interest'),0,'Zero-rate debt interest');
    await set({'debt-balance':0,'debt-rate':12,'debt-payment':0}); await page.locator('#debt-calc').click(); if(await textOf('debt-months')!=='0') throw new Error('Zero debt balance must return zero months');
    await set({'debt-balance':5000,'debt-rate':12,'debt-payment':50}); await page.locator('#debt-calc').click(); if(await textOf('debt-months')!=='Payment too low') throw new Error('Debt payment below interest must be rejected');

    // 7. Mortgage: principal/interest, zero APR and full down payment.
    await calculate('mortgage-calculator.html','mortgage-calc',{'mortgage-price':280000,'mortgage-down':0,'mortgage-rate':6.5,'mortgage-years':30,'mortgage-tax':0,'mortgage-insurance':0,'mortgage-hoa':0});
    near(await money('mortgage-pi'),1769.7905,'Mortgage monthly P&I'); near(await money('mortgage-interest'),357124.5677,'Mortgage total interest');
    await set({'mortgage-price':120000,'mortgage-down':100,'mortgage-rate':0,'mortgage-years':15,'mortgage-tax':0,'mortgage-insurance':0,'mortgage-hoa':0}); await page.locator('#mortgage-calc').click();
    near(await money('mortgage-pi'),0,'Mortgage full down payment'); near(await money('mortgage-interest'),0,'Mortgage full down interest');
    await page.locator('#mortgage-down').fill('101'); await page.locator('#mortgage-calc').click(); await expectInvalid('mortgage-pi','Mortgage down payment above 100%');

    // 8. Auto loan: scheduled payment, total interest and accelerated payoff.
    await calculate('auto-loan-calculator.html','auto-calc',{'auto-amount':28000,'auto-rate':6.9,'auto-months':60,'auto-extra':0});
    near(await money('auto-payment'),553.1135,'Auto scheduled payment'); near(await money('auto-interest'),5186.808,'Auto interest');
    if(await textOf('auto-duration')!=='60 months') throw new Error('Auto loan duration expected 60 months');
    await set({'auto-amount':28000,'auto-rate':0,'auto-months':60,'auto-extra':0}); await page.locator('#auto-calc').click(); near(await money('auto-interest'),0,'Zero-rate auto interest');
    await page.locator('#auto-amount').fill('0'); await page.locator('#auto-calc').click(); await expectInvalid('auto-payment','Zero auto principal');

    // 9. Credit card payoff: standard payoff, zero balance and insufficient payment.
    await calculate('credit-card-payoff.html','card-calc',{'card-balance':4500,'card-rate':24.99,'card-payment':200});
    if(await textOf('card-months')!=='31 months') throw new Error('Credit card expected 31 months, got '+await textOf('card-months'));
    near(await money('card-interest'),1634.7115,'Credit card interest');
    await set({'card-balance':0,'card-rate':24.99,'card-payment':0}); await page.locator('#card-calc').click(); if(await textOf('card-months')!=='0') throw new Error('Zero card balance must return zero months');
    await set({'card-balance':4500,'card-rate':24.99,'card-payment':10}); await page.locator('#card-calc').click(); if(await textOf('card-months')!=='Payment too low') throw new Error('Credit card payment below interest must be rejected');

    // 10. Retirement: zero-return and positive-return projections.
    await calculate('retirement-calculator.html','retirement-calc',{'retirement-current':0,'retirement-monthly':100,'retirement-years':10,'retirement-return':0,'retirement-match':0});
    near(await money('retirement-balance'),12000,'Retirement zero-return balance'); near(await money('retirement-contrib'),12000,'Retirement contributions'); near(await money('retirement-total'),0,'Retirement zero-return growth');
    await set({'retirement-current':10000,'retirement-monthly':200,'retirement-years':20,'retirement-return':5,'retirement-match':50}); await page.locator('#retirement-calc').click();
    near(await money('retirement-balance'),148274.3226,'Retirement positive-return balance');

    // 11. Student loan payoff: amortization, zero balance and insufficient payment.
    await calculate('student-loan-payoff.html','student-calc',{'student-balance':5000,'student-rate':6.8,'student-payment':100});
    if(await textOf('student-months')!=='59 months') throw new Error('Student loan expected 59 months, got '+await textOf('student-months'));
    near(await money('student-interest'),895.6729,'Student loan interest');
    await set({'student-balance':0,'student-rate':6.8,'student-payment':0}); await page.locator('#student-calc').click(); if(await textOf('student-months')!=='0') throw new Error('Zero student balance must return zero months');
    await set({'student-balance':5000,'student-rate':6.8,'student-payment':10}); await page.locator('#student-calc').click(); if(await textOf('student-months')!=='Payment too low') throw new Error('Student payment below interest must be rejected');

    // 12. Net worth: positive and negative net worth, all-zero and invalid inputs.
    await calculate('net-worth-calculator.html','networth-calc',{'net-cash':8000,'net-investments':12000,'net-retirement':25000,'net-home':250000,'net-other-assets':18000,'net-mortgage':190000,'net-auto':9000,'net-student':12000,'net-credit':2500,'net-other-debt':1500});
    near(await money('net-assets'),313000,'Net worth assets'); near(await money('net-liabilities'),215000,'Net worth liabilities'); near(await money('net-result'),98000,'Net worth positive');
    await set({'net-cash':1000,'net-investments':0,'net-retirement':0,'net-home':0,'net-other-assets':0,'net-mortgage':5000,'net-auto':0,'net-student':0,'net-credit':0,'net-other-debt':0}); await page.locator('#networth-calc').click();
    near(await money('net-result'),-4000,'Net worth negative');
    await page.locator('#net-cash').fill('-1'); await page.locator('#networth-calc').click(); await expectInvalid('net-result','Negative net worth input');

    console.log('PASS: 12-calculator known-answer, zero-rate, boundary, invalid, deficit/negative, insufficient-payment and amortization checks.');


    // Net Worth privacy regression: entered amounts must stay in this browser tab.
    const privacyPage=await browser.newPage({viewport:{width:390,height:844}});
    const privacyLeaks=[];
    const privateValues=['87654321','76543210','65432109','54321098','43210987','32109876','21098765','10987654','99887766','88776655'];
    await privacyPage.addInitScript(()=>{
      window.__privacyCalls={fetch:0,xhr:0,beacon:0};
      const originalFetch=window.fetch;
      window.fetch=function(...args){window.__privacyCalls.fetch++;return originalFetch.apply(this,args);};
      const originalOpen=XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open=function(method,...args){if(!/^(GET|HEAD)$/i.test(String(method)))window.__privacyCalls.xhr++;return originalOpen.call(this,method,...args);};
      if(Navigator.prototype.sendBeacon){
        const originalBeacon=Navigator.prototype.sendBeacon;
        Navigator.prototype.sendBeacon=function(...args){window.__privacyCalls.beacon++;return originalBeacon.apply(this,args);};
      }
    });
    privacyPage.on('request',request=>{
      const payload=(request.url()+' '+(request.postData()||''));
      if(!['GET','HEAD'].includes(request.method().toUpperCase())) privacyLeaks.push('non-read request: '+request.method()+' '+request.url());
      for(const value of privateValues) if(payload.includes(value)) privacyLeaks.push('financial value appeared in request: '+request.url());
    });
    await privacyPage.goto('http://127.0.0.1:4173/net-worth-calculator.html');
    await privacyPage.waitForLoadState('networkidle');
    const privateIds=['net-cash','net-investments','net-retirement','net-home','net-other-assets','net-mortgage','net-auto','net-student','net-credit','net-other-debt'];
    for(let i=0;i<privateIds.length;i++) await privacyPage.locator('#'+privateIds[i]).fill(privateValues[i]);
    await privacyPage.locator('#networth-calc').click();
    const privateResult=await privacyPage.locator('#net-result').innerText();
    if(!privateResult || privateResult==='—') throw new Error('Net Worth privacy test did not calculate the supplied local values');
    // Currency selection is formatting-only: numeric net worth must remain unchanged.
    for(const currency of ['USD','EUR','GBP','CAD','AUD','INR']){
      await privacyPage.locator('#currency').selectOption(currency);
      const raw=(await privacyPage.locator('#net-result').innerText()).replace(/[^0-9.-]/g,'');
      near(Number(raw),74301009,'Net Worth '+currency+' display');
    }
    const storage=await privacyPage.evaluate(async()=>({
      local:localStorage.length,
      session:sessionStorage.length,
      calls:window.__privacyCalls,
      databases:typeof indexedDB.databases==='function'?(await indexedDB.databases()).length:0
    }));
    const databaseCount=storage.databases;
    if(storage.local!==0||storage.session!==0||databaseCount!==0) throw new Error('Net Worth values may be persisted: '+JSON.stringify({local:storage.local,session:storage.session,databases:databaseCount}));
    if(storage.calls.fetch||storage.calls.xhr||storage.calls.beacon) throw new Error('Net Worth triggered an application data-transfer API: '+JSON.stringify(storage.calls));
    await privacyPage.reload();
    for(let i=0;i<privateIds.length;i++){
      const value=await privacyPage.locator('#'+privateIds[i]).inputValue();
      if(value===privateValues[i]) throw new Error('Net Worth value persisted across reload for '+privateIds[i]);
    }
    if(privacyLeaks.length) throw new Error('Net Worth privacy/network leakage: '+privacyLeaks.join(' | '));
    console.log('PASS: Net Worth entered figures stay browser-local; no non-read request, fetch/XHR/beacon, storage persistence or financial-value URL/body leakage.');
    await privacyPage.close();

    // Mobile menu interaction and layout smoke test.
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://127.0.0.1:4173/index.html');
    const toggle=page.locator('.menu-toggle');
    if(await toggle.count()){
      await toggle.click();
      if(await toggle.getAttribute('aria-expanded')!=='true') throw new Error('Mobile navigation did not open');
      await toggle.click();
      if(await toggle.getAttribute('aria-expanded')!=='false') throw new Error('Mobile navigation did not close');
    }
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1);
    if(overflow) throw new Error('Homepage has horizontal overflow at 390px');


    // Responsive and keyboard-only review across common phone/tablet widths.
    const responsiveWidths=[320,360,375,390,412,430,620,700,768,1024];
    for(const file of ['index.html',...pages]){
      await page.goto('http://127.0.0.1:4173/'+file);
      for(const width of responsiveWidths){
        await page.setViewportSize({width,height:844});
        const metrics=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
        if(metrics.scroll>metrics.client+1) throw new Error(file+' horizontal overflow at '+width+'px: '+JSON.stringify(metrics));
      }
      if(file!=='index.html'){
        const unlabeled=await page.locator('input,select,textarea').evaluateAll(elements=>elements.filter(el=>!(el.labels&&el.labels.length)&&!el.getAttribute('aria-label')&&!el.getAttribute('aria-labelledby')).map(el=>el.id||el.outerHTML.slice(0,100)));
        if(unlabeled.length) throw new Error(file+' has unlabeled form controls: '+unlabeled.join(', '));
        await page.setViewportSize({width:390,height:844});
        await page.keyboard.press('Tab');
        let reached=false;
        for(let i=0;i<40;i++){
          const active=await page.evaluate(()=>({id:document.activeElement?.id||'',tag:document.activeElement?.tagName||'',outline:getComputedStyle(document.activeElement).outlineStyle}));
          if(active.id.endsWith('-calc')){
            reached=true;
            if(active.outline==='none') throw new Error(file+' calculator action lacks a visible keyboard focus indicator');
            await page.keyboard.press('Enter');
            const result=(await page.locator('.result-grid').innerText()).trim();
            if(!result||/—|Check inputs/.test(result)) throw new Error(file+' calculator did not run by keyboard');
            break;
          }
          await page.keyboard.press('Tab');
        }
        if(!reached) throw new Error(file+' calculator action is not reachable by keyboard Tab');
      }
    }
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://127.0.0.1:4173/index.html');
    const menuRect=await page.locator('.menu-toggle').boundingBox();
    if(menuRect&&(menuRect.width<44||menuRect.height<44)) throw new Error('Mobile menu touch target is smaller than 44x44px: '+JSON.stringify(menuRect));
    console.log('PASS: 10 responsive widths across homepage and all 12 calculators; labeled controls and keyboard-only calculation/focus checks.');


    // Crawl every public HTML page and verify all local links, fragments and sitemap entries.
    const allHtmlFiles=fs.readdirSync(root).filter(name=>name.endsWith('.html')).sort();
    const siteOrigin='https://barsulkhan.github.io';
    const basePath='/USAJIO/';
    const sitemapSource=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
    const sitemapUrls=[...sitemapSource.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
    const sitemapFiles=new Set(sitemapUrls.map(value=>{
      const url=new URL(value);
      const relative=decodeURIComponent(url.pathname.startsWith(basePath)?url.pathname.slice(basePath.length):url.pathname.replace(/^\//,''));
      return relative||'index.html';
    }));
    const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8');
    if(!robots.includes('https://barsulkhan.github.io/USAJIO/sitemap.xml')) throw new Error('robots.txt does not advertise the canonical sitemap');
    if(sitemapFiles.size!==allHtmlFiles.length) throw new Error('Sitemap/page count mismatch: '+sitemapFiles.size+' sitemap entries vs '+allHtmlFiles.length+' HTML pages');
    const pageIssues=[];
    const pageTitles=[];
    for(const file of allHtmlFiles){
      const response=await page.goto('http://127.0.0.1:4173/'+file);
      if(!response||response.status()>=400) pageIssues.push(file+' returned '+(response?response.status():'no response'));
      const meta=await page.evaluate(()=>({
        title:document.title.trim(),
        description:document.querySelector('meta[name="description"]')?.content?.trim()||'',
        canonical:document.querySelector('link[rel="canonical"]')?.href||'',
        h1:document.querySelectorAll('h1').length,
        lang:document.documentElement.lang,
        links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))
      }));
      if(!meta.title) pageIssues.push(file+' has no document title');
      pageTitles.push(meta.title);
      if(!meta.description) pageIssues.push(file+' has no meta description');
      const expectedCanonical='https://barsulkhan.github.io/USAJIO/'+(file==='index.html'?'':file);
      if(meta.canonical!==expectedCanonical) pageIssues.push(file+' has incorrect canonical URL: '+meta.canonical);
      if(meta.h1<1) pageIssues.push(file+' has no H1 heading');
      if(meta.lang!=='en') pageIssues.push(file+' has missing or unexpected html lang');
      if(!sitemapFiles.has(file)) pageIssues.push(file+' is missing from sitemap.xml');
      const source=fs.readFileSync(path.join(root,file),'utf8');
      const lowerSource=source.toLowerCase();
      if(['lorem ipsum','example.com','[your email]','[your name]','[your url]'].some(token=>lowerSource.includes(token))||/TODO|FIXME/i.test(source)) pageIssues.push(file+' contains placeholder text');
      if(['privacy.html','terms.html','disclaimer.html'].includes(file)&&!source.includes('Last reviewed:')) pageIssues.push(file+' has no policy review date');
      const guideFiles=['budgeting-guide.html','emergency-fund-guide.html','debt-payoff-guide.html','credit-score-guide.html','mortgage-basics-guide.html','auto-financing-guide.html','retirement-planning-guide.html','student-loan-guide.html','cash-flow-budget-guide.html'];
      if(guideFiles.includes(file)){
        for(const attribute of ['property="og:type"','property="og:site_name"','property="og:title"','property="og:description"','property="og:url"','name="twitter:card"']){
          if(!source.includes(attribute)) pageIssues.push(file+' is missing social metadata '+attribute);
        }
        if(!source.includes('Last reviewed: November 22, 2026')) pageIssues.push(file+' is missing the current guide review date');
        if(!source.includes('Official sources and further reading')) pageIssues.push(file+' is missing its official-source section');
        const officialLinks=[...source.matchAll(/href="https:\/\/(?:www\.)?(?:consumerfinance\.gov|consumer\.gov|consumer\.ftc\.gov|irs\.gov|investor\.gov|studentaid\.gov|www\.annualcreditreport\.com)\//g)];
        if(officialLinks.length<1) pageIssues.push(file+' has no recognized official-source link');
      }
      for(const href of meta.links){
        if(!href||/^(mailto:|tel:|javascript:|data:)/i.test(href)) continue;
        let url;
        try{url=new URL(href,'https://barsulkhan.github.io/USAJIO/'+file);}catch{pageIssues.push(file+' has invalid href '+href);continue;}
        if(url.origin!==siteOrigin||!url.pathname.startsWith(basePath)) continue;
        const relative=decodeURIComponent(url.pathname.slice(basePath.length))||'index.html';
        const target=path.join(root,relative);
        if(!fs.existsSync(target)){pageIssues.push(file+' -> missing '+relative);continue;}
        if(url.hash){
          const targetSource=fs.readFileSync(target,'utf8');
          const id=decodeURIComponent(url.hash.slice(1));
          if(!targetSource.includes('id="'+id+'"')&&!targetSource.includes("id='"+id+"'")&&!targetSource.includes('name="'+id+'"')) pageIssues.push(file+' -> missing fragment '+relative+'#'+id);
        }
      }
    }
    if(new Set(pageTitles).size!==pageTitles.length) pageIssues.push('HTML page titles are not unique');
    if(pageIssues.length) throw new Error('Site navigation/policy/SEO audit failed: '+pageIssues.join(' | '));
    const homepageSource=fs.readFileSync(path.join(root,'index.html'),'utf8');
    for(const href of ['about.html','contact.html','privacy.html','terms.html','disclaimer.html','editorial.html']){
      if(!homepageSource.includes('href="'+href+'"')) throw new Error('Homepage footer is missing '+href);
    }
    if(!homepageSource.includes('12 useful calculators')) throw new Error('Homepage calculator count is not 12');
    if(!homepageSource.includes('id="resources"')) throw new Error('Resources navigation target is missing');
    if(!homepageSource.includes('cash-flow-budget-guide.html')) throw new Error('Homepage is missing the cash-flow guide link');
    console.log('PASS: '+allHtmlFiles.length+' HTML pages served; unique titles, descriptions, canonicals, H1, language, sitemap/robots, footer policy links and all local paths/fragments verified.');

    // Verify every local HTML link resolves against the repository files.
    const htmlFiles=fs.readdirSync(root).filter(x=>x.endsWith('.html'));
    const missing=[];
    for(const f of htmlFiles){
      const source=fs.readFileSync(path.join(root,f),'utf8');
      for(const match of source.matchAll(/href=["']([^"'#]+\.html)(?:#[^"']*)?["']/g)){
        const href=match[1].split('?')[0];
        if(/^https?:\/\//i.test(href)) continue;
        const target=href.replace(/^\.\//,'').split('#')[0];
        if(target && !fs.existsSync(path.join(root,target))) missing.push(f+' -> '+target);
      }
    }
    if(missing.length) throw new Error('Broken local links: '+missing.join(', '));
    if(errors.length) throw new Error('Browser errors: '+errors.join(' | '));
    console.log('ACCESSIBILITY AUDIT: '+JSON.stringify(accessibilityFindings,null,2));
    const blocking=accessibilityFindings.filter(x=>x.impact==='critical'||x.impact==='serious');
    if(blocking.length) throw new Error('Accessibility violations (serious/critical): '+JSON.stringify(blocking));
    console.log('PASS: homepage, 12 calculator default interactions, live result announcements, mobile menu, 390px overflow, local HTML links and axe WCAG 2.1 A/AA audit.');
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(e=>{console.error(e.stack||e);process.exit(1);});
