const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const pages = [
  'compound-interest.html','loan-calculator.html','monthly-budget.html',
  'savings-goal.html','emergency-fund.html','debt-payoff.html',
  'mortgage-calculator.html','auto-loan-calculator.html','credit-card-payoff.html',
  'retirement-calculator.html','student-loan-payoff.html'
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
    await page.addScriptTag({content:fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8')});
    const auditA11y=async(label)=>{
      const result=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
      for(const v of result.violations){
        accessibilityFindings.push({page:label,id:v.id,impact:v.impact,description:v.help,nodes:v.nodes.length});
      }
    };
    await auditA11y('index.html');
    if(!home.ok()) throw new Error('Homepage did not load');
    const homeCards=await page.locator('.tool-card a[href]').count();
    if(homeCards<11) throw new Error('Homepage calculator navigation links missing: '+homeCards);

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
    console.log('PASS: homepage, 11 calculator default interactions, live result announcements, mobile menu, 390px overflow, local HTML links and axe WCAG 2.1 A/AA audit.');
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(e=>{console.error(e.stack||e);process.exit(1);});
