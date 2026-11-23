const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const pages = [
  'compound-interest.html','loan-calculator.html','monthly-budget.html',
  'savings-goal.html','emergency-fund.html','debt-payoff.html',
  'mortgage-calculator.html','auto-loan-calculator.html','credit-card-payoff.html',
  'retirement-calculator.html','student-loan-payoff.html','net-worth-calculator.html','credit-card-minimum-payment.html','rent-vs-buy.html','cash-flow-planner.html','debt-to-income.html'
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
    const directHomeCards=await page.locator('#calculators .tool-grid > .tool-card').count();
    if(directHomeCards!==16) throw new Error('Homepage must show 16 separate calculator cards; found '+directHomeCards);

    for(const file of pages){
      const response=await page.goto('http://127.0.0.1:4173/'+file);
      if(!response || !response.ok()) throw new Error(file+' failed to load');
      await page.waitForLoadState('networkidle');
      await auditA11y(file);
      const title=await page.title();
      if(!title.includes('USAJIO')) throw new Error(file+' missing branded title');
      const calc=page.locator('button[id$="-calc"]');
      if(await calc.count()<1) throw new Error(file+' missing a calculator action');
      await calc.first().click();
      const results=page.locator('.result-grid');
      if(await results.count()!==1) throw new Error(file+' missing result region');
      const text=(await results.innerText()).trim();
      if(!text || /—/.test(text) || /Check inputs/.test(text)) throw new Error(file+' default calculation did not produce results: '+text);
      if(await results.getAttribute('aria-live')!=='polite') throw new Error(file+' result region is not announced politely');
    }


    // Debt-to-Income: known ratio and zero-income rejection.
    await page.goto('http://127.0.0.1:4173/debt-to-income.html');
    await page.locator('#dti-calc').click();
    if(await page.locator('#dti-ratio').innerText()!=='38.3%') throw new Error('Debt-to-income default ratio should be 38.3%');
    await page.locator('#dti-income').fill('0'); await page.locator('#dti-calc').click();
    if(!(await page.locator('#dti-status').innerText()).includes('positive gross monthly income')) throw new Error('Debt-to-income must reject zero gross income');

    // Emergency fund: goal gap and monthly savings timeline.
    await page.goto('http://127.0.0.1:4173/emergency-fund.html');
    await page.locator('#ef-calc').click();
    if(await page.locator('#ef-time').innerText()!=='66 months') throw new Error('Emergency fund timeline should round up to 66 months');
    await page.locator('#ef-current').fill('12000'); await page.locator('#ef-calc').click();
    if(await page.locator('#ef-time').innerText()!=='Goal reached') throw new Error('Emergency fund should detect an already funded target');

    // Rent-vs-buy: default comparison, zero-rate mortgage and invalid stay length.
    await page.goto('http://127.0.0.1:4173/rent-vs-buy.html');
    await page.locator('#rvb-calc').click();
    if(await page.locator('#rvb-schedule tr').count()<1) throw new Error('Rent-vs-buy annual schedule should render');
    await page.locator('#rvb-apr').fill('0');
    await page.locator('#rvb-calc').click();
    if(await page.locator('#rvb-results').isHidden()) throw new Error('Zero-rate mortgage comparison should produce results');
    await page.locator('#rvb-stay').fill('0');
    await page.locator('#rvb-calc').click();
    if(!(await page.locator('#rvb-status').innerText()).includes('Check the inputs')) throw new Error('Invalid zero-year stay should be rejected');

    // Credit-card minimum-payment planner: zero APR and non-amortizing rule.
    await page.goto('http://127.0.0.1:4173/credit-card-minimum-payment.html');
    await page.locator('#ccmp-balance').fill('1200');
    await page.locator('#ccmp-apr').fill('0');
    await page.locator('#ccmp-percent').fill('10');
    await page.locator('#ccmp-floor').fill('25');
    await page.locator('#ccmp-calc').click();
    if(Number((await page.locator('#ccmp-interest').innerText()).replace(/[^0-9.-]/g,''))!==0) throw new Error('Zero-APR minimum-payment interest should be zero');
    const minimumScheduleRows=await page.locator('#ccmp-schedule tr').count();
    if(minimumScheduleRows<1||minimumScheduleRows>12) throw new Error('Minimum-payment planner should show up to 12 monthly schedule rows; found '+minimumScheduleRows);
    await page.locator('#ccmp-apr').fill('24');
    await page.locator('#ccmp-percent').fill('1');
    await page.locator('#ccmp-floor').fill('0');
    await page.locator('#ccmp-calc').click();
    if(!(await page.locator('#ccmp-status').innerText()).includes('does not reduce the balance')) throw new Error('Non-amortizing minimum-payment rule must be flagged');

    // Weekly cash-flow planner: recurring events, daily shortfalls, month-end clamp and stale-result invalidation.
    await page.goto('http://127.0.0.1:4173/cash-flow-planner.html');
    const cashNear=(actual,expected,label,tolerance=0.02)=>{if(Math.abs(actual-expected)>tolerance)throw new Error(label+': expected '+expected+', got '+actual);};
    const removeAllCashFlowEntries=async()=>{const buttons=page.locator('#cf-entries button');while(await buttons.count())await buttons.first().click();};
    const addCashFlowEntry=async(kind,name,amount,date,frequency)=>{
      await page.locator(kind==='income'?'#cf-add-income':'#cf-add-expense').click();
      const row=page.locator('.cf-entry').last();
      await row.locator('input[aria-label="Entry description"]').fill(name);
      await row.locator('select[aria-label="Entry type"]').selectOption(kind);
      await row.locator('input[aria-label="Entry amount"]').fill(String(amount));
      await row.locator('input[aria-label="Next expected date"]').fill(date);
      await row.locator('select[aria-label="Repeat frequency"]').selectOption(frequency);
    };
    const cashFlowStart=await page.locator('#cf-start-date').inputValue();
    await removeAllCashFlowEntries();
    await page.locator('#cf-start-balance').fill('1000');
    await addCashFlowEntry('income','Weekly pay',500,cashFlowStart,'weekly');
    await addCashFlowEntry('expense','One-time bill',300,cashFlowStart,'once');
    await page.locator('#cf-calc').click();
    cashNear(Number((await page.locator('#cf-ending').innerText()).replace(/[^0-9.-]/g,'')),2700,'Weekly cash-flow ending balance');
    if(await page.locator('#cf-schedule tr').count()!==4) throw new Error('Four-week cash-flow forecast should render four rows');
    if(Number((await page.locator('#cf-schedule tr').first().locator('td').nth(1).innerText()).replace(/[^0-9.-]/g,''))!==500) throw new Error('Weekly income total is incorrect');
    if(Number((await page.locator('#cf-schedule tr').first().locator('td').nth(2).innerText()).replace(/[^0-9.-]/g,''))!==300) throw new Error('One-time expense total is incorrect');
    await removeAllCashFlowEntries();
    await page.locator('#cf-start-balance').fill('100');
    await page.locator('#cf-buffer').fill('50');
    const shortfallIncomeDate=await page.evaluate(value=>{const d=new Date(value+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+2);return d.toISOString().slice(0,10);},cashFlowStart);
    await addCashFlowEntry('expense','Early bill',150,cashFlowStart,'once');
    await addCashFlowEntry('income','Later paycheck',200,shortfallIncomeDate,'once');
    await page.locator('#cf-calc').click();
    cashNear(Number((await page.locator('#cf-ending').innerText()).replace(/[^0-9.-]/g,'')),150,'Cash-flow same-week recovery balance');
    cashNear(Number((await page.locator('#cf-lowest').innerText()).replace(/[^0-9.-]/g,'')),-50,'Cash-flow lowest daily balance');
    if(await page.locator('#cf-shortfall-count').innerText()!=='1') throw new Error('Cash-flow planner must detect an intrawweek shortfall even if week-end balance recovers');
    if(!(await page.locator('#cf-status').innerText()).includes('Potential shortfall')) throw new Error('Cash-flow shortfall warning is missing');
    if(await page.locator('#cf-buffer-days').innerText()!=='2') throw new Error('Cash-flow safety buffer should detect two below-buffer days');
    if(!(await page.locator('#cf-status').innerText()).includes('safety buffer')) throw new Error('Cash-flow safety-buffer warning is missing');
    await page.locator('#cf-add-expense').click();
    if(!(await page.locator('#cf-results').isHidden())) throw new Error('Adding a cash-flow entry must invalidate stale results');
    await removeAllCashFlowEntries();
    await page.locator('#cf-start-date').fill('2026-01-31');
    await page.locator('#cf-start-balance').fill('100');
    await page.locator('#cf-weeks').selectOption('8');
    await addCashFlowEntry('expense','Monthly rent',10,'2026-01-31','monthly');
    await page.locator('#cf-calc').click();
    let monthlyOut=0;
    for(const row of await page.locator('#cf-schedule tr').all()){
      monthlyOut+=Number((await row.locator('td').nth(2).innerText()).replace(/[^0-9.-]/g,''));
    }
    cashNear(monthlyOut,20,'Month-end recurrence clamp (Jan 31 to Feb 28)');
    await removeAllCashFlowEntries();
    await page.locator('#cf-start-date').fill('2026-01-25');
    await page.locator('#cf-start-balance').fill('100');
    await page.locator('#cf-weeks').selectOption('13');
    await addCashFlowEntry('expense','Month-end bill',10,'2026-01-31','monthly');
    await page.locator('#cf-calc').click();
    const monthNineOut=Number((await page.locator('#cf-schedule tr').nth(8).locator('td').nth(2).innerText()).replace(/[^0-9.-]/g,''));
    const monthTenOut=Number((await page.locator('#cf-schedule tr').nth(9).locator('td').nth(2).innerText()).replace(/[^0-9.-]/g,''));
    cashNear(monthNineOut,0,'Monthly recurrence should not drift from the original month-end day');
    cashNear(monthTenOut,10,'Jan 31 recurrence should land on Mar 31 after February clamping');
    await page.locator('.cf-entry input[aria-label="Entry amount"]').fill('0');
    await page.locator('#cf-calc').click();
    if(!(await page.locator('#cf-status').innerText()).includes('greater than zero')) throw new Error('Zero cash-flow entry amount must be rejected');
    await page.setViewportSize({width:320,height:800});
    await page.goto('http://127.0.0.1:4173/cash-flow-planner.html');
    if(await page.evaluate(()=>document.documentElement.scrollWidth)>320) throw new Error('Cash-flow planner overflows a 320px viewport');
    await page.setViewportSize({width:1365,height:900});

    // Reproducible financial-math and input-boundary matrix for all 13 tools.
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
    near(await money('loan-interest'),1880.67,'Loan total interest');
    near(await money('loan-total'),11880.67,'Loan total repayment');
    await set({'loan-amount':1200,'loan-rate':0,'loan-years':1,'loan-extra':0}); await page.locator('#loan-calc').click();
    near(await money('loan-monthly'),100,'Zero-rate loan payment'); near(await money('loan-interest'),0,'Zero-rate loan interest'); near(await money('loan-total'),1200,'Zero-rate loan total');
    // Loan amortization schedule: ledger reconciles, extra principal accelerates payoff, zero rate works.
    await calculate('loan-calculator.html','loan-calc',{'loan-amount':10000,'loan-rate':7,'loan-years':5,'loan-extra':0});
    const scheduleRows=page.locator('#loan-schedule tr');
    if(await scheduleRows.count()!==60) throw new Error('Rounded scheduled payment should clear the loan in 60 months; found '+await scheduleRows.count());
    near(await money('loan-monthly'),198.02,'Loan rounded scheduled payment',0.001);
    near(await money('loan-interest'),1880.67,'Loan schedule interest reconciliation');
    near(await money('loan-total'),11880.67,'Loan schedule total reconciliation');

    // Downloaded CSV must include assumptions, every cent-rounded schedule row and a safe static schema.
    const csvDownloadPromise=page.waitForEvent('download');
    await page.locator('#loan-download-csv').click();
    const csvDownload=await csvDownloadPromise;
    if(csvDownload.suggestedFilename()!=='usajio-loan-amortization.csv') throw new Error('Unexpected loan CSV filename');
    const csvPath=await csvDownload.path();
    const csv=fs.readFileSync(csvPath,'utf8');
    if(csv.charCodeAt(0)!==0xFEFF) throw new Error('Loan CSV must include UTF-8 BOM');
    if(!csv.includes('"Currency","USD"')||!csv.includes('"Annual interest rate (%)","7.00"')||!csv.includes('"Total interest","1880.67"')) throw new Error('Loan CSV is missing currency, assumptions or reconciled totals');
    const csvLines=csv.slice(1).split(String.fromCharCode(13,10));
    if(csvLines.length!==76) throw new Error('Loan CSV should contain metadata, header and all 60 schedule rows; found '+csvLines.length);
    if(!csvLines[15].includes('"Payment","Starting balance","Scheduled payment"')) throw new Error('Loan CSV schedule header is incorrect');
    if(!csvLines[75].includes('"60"')||!csvLines[75].endsWith('"0.00","1880.67"')) throw new Error('Loan CSV final capped payment row is missing or incorrect');
    if(csvLines.some(line=>/^["']?[=+@]/.test(line.trimStart()))) throw new Error('Loan CSV contains a formula-like row prefix');

    // Print action calls native browser print; print CSS keeps the report and hides site controls.
    await page.evaluate(()=>{window.__printCalled=false;window.print=()=>{window.__printCalled=true;};});
    await page.locator('#loan-print-report').click();
    if(!(await page.evaluate(()=>window.__printCalled))) throw new Error('Print / Save as PDF action did not invoke native print');
    await page.emulateMedia({media:'print'});
    if(await page.locator('.site-header').evaluate(el=>getComputedStyle(el).display)!=='none') throw new Error('Print stylesheet should hide site navigation');
    if(await page.locator('#loan-print-heading').evaluate(el=>getComputedStyle(el).display)==='none') throw new Error('Print stylesheet should show report assumptions');
    await page.emulateMedia({media:'screen'});
    await page.locator('#loan-extra').fill('25');
    if(!(await page.locator('#loan-download-csv').isDisabled())||!(await page.locator('#loan-print-report').isDisabled())) throw new Error('Editing loan assumptions must invalidate stale report actions');
    await set({'loan-amount':10000,'loan-rate':7,'loan-years':5,'loan-extra':0});
    await page.locator('#loan-calc').click();

    const finalBalance=await scheduleRows.last().locator('td').nth(5).innerText();
    near(Number(finalBalance.replace(/[^0-9.-]/g,'')),0,'Loan schedule final balance');
    await set({'loan-amount':10000,'loan-rate':7,'loan-years':5,'loan-extra':100}); await page.locator('#loan-calc').click();
    if(await page.locator('#loan-schedule tr').count()>=60) throw new Error('Extra payment should shorten loan payoff');
    if((await money('loan-interest'))>=1880.67) throw new Error('Extra payment should reduce total interest');
    await set({'loan-amount':1200,'loan-rate':0,'loan-years':1,'loan-extra':0}); await page.locator('#loan-calc').click();
    if(await page.locator('#loan-schedule tr').count()!==12) throw new Error('Zero-rate schedule should contain 12 rows');
    near(await money('loan-interest'),0,'Zero-rate schedule interest');
    await set({'loan-amount':100,'loan-rate':0,'loan-years':1,'loan-extra':1000}); await page.locator('#loan-calc').click();
    if(await page.locator('#loan-schedule tr').count()!==1) throw new Error('Oversized extra payment should clear loan in one capped payment');
    near(Number((await page.locator('#loan-schedule tr').last().locator('td').nth(5).innerText()).replace(/[^0-9.-]/g,'')),0,'Capped final loan balance');
    await page.locator('#loan-amount').fill('0'); await page.locator('#loan-calc').click(); await expectInvalid('loan-monthly','Zero principal loan');

    // 2b. Compare three loan scenarios using the same principal and shared amortization engine.
    await calculate('loan-calculator.html','loan-calc',{'loan-amount':10000,'loan-rate':7,'loan-years':5,'loan-extra':0});
    await page.locator('#scenario-comparison > summary').click();
    await page.locator('#compare-calc').click();
    near(await money('compare-scheduled-a'),198.02,'Scenario A scheduled payment');
    near(await money('compare-interest-a'),1880.67,'Scenario A interest');
    near(await money('compare-total-a'),11880.67,'Scenario A total repayment');
    near(await money('compare-scheduled-b'),195.67,'Scenario B scheduled payment');
    near(await money('compare-interest-b'),1739.63,'Scenario B interest');
    near(await money('compare-total-b'),11739.63,'Scenario B total repayment');
    await page.locator('#compare-extra-input-c').fill('100');
    await page.locator('#compare-calc').click();
    near(await money('compare-monthly-c'),339.47,'Scenario C monthly outflow');
    near(await money('compare-interest-c'),1004.51,'Scenario C interest with extra payment');
    near(await money('compare-total-c'),11004.51,'Scenario C total repayment');
    if(await textOf('compare-count-c')!=='33 payments') throw new Error('Scenario C payoff count mismatch');
    near(await money('compare-extra-paid-c'),3200,'Scenario C extra principal');
    if(await textOf('compare-lowest-monthly')!=='Scenario B') throw new Error('Lowest monthly outflow scenario mismatch');
    if(await textOf('compare-lowest-interest')!=='Scenario C') throw new Error('Lowest total interest scenario mismatch');
    if(!/^−/.test(await textOf('compare-delta-interest-b'))) throw new Error('Scenario B interest delta should be negative');
    if(await textOf('compare-delta-count-b')!=='No difference') throw new Error('Scenario B payment-count delta mismatch');

    if(await page.locator('#compare-download-csv').isDisabled()||await page.locator('#compare-print-report').isDisabled()) throw new Error('Valid scenario results should enable report actions');
    const compareDownloadPromise=page.waitForEvent('download');await page.locator('#compare-download-csv').click();const compareDownload=await compareDownloadPromise;
    if(compareDownload.suggestedFilename()!=='usajio-loan-scenario-comparison.csv') throw new Error('Unexpected comparison CSV filename');
    const compareCsv=fs.readFileSync(await compareDownload.path(),'utf8');if(compareCsv.charCodeAt(0)!==0xFEFF) throw new Error('Comparison CSV must include UTF-8 BOM');
    if(!compareCsv.includes('"Shared principal","10000.00"')||!compareCsv.includes('"Scenario A"')||!compareCsv.includes('"Scenario B"')||!compareCsv.includes('"Scenario C"')||!compareCsv.includes('"Total interest"')||!compareCsv.includes('"1880.67"')) throw new Error('Comparison CSV missing scenario metadata or results');
    const compareLines=compareCsv.slice(1).split(String.fromCharCode(13,10));if(compareLines.length!==16) throw new Error('Comparison CSV row count mismatch: '+compareLines.length);
    if(!compareLines[6].includes('"Scenario","Annual interest rate (%)"')||!compareLines[11].includes('"Difference vs Scenario A"')) throw new Error('Comparison CSV headers missing');
    await page.evaluate(()=>{window.__comparePrintCalled=false;window.print=()=>{window.__comparePrintCalled=true;};});await page.locator('#compare-print-report').click();
    if(!(await page.evaluate(()=>window.__comparePrintCalled))) throw new Error('Comparison print did not invoke native print');
    if(!(await page.locator('body').evaluate(el=>el.classList.contains('compare-print')))) throw new Error('Comparison print mode not applied');
    await page.emulateMedia({media:'print'});if(await page.locator('.scenario-comparison').evaluate(el=>getComputedStyle(el).display)==='none') throw new Error('Comparison report hidden in print mode');
    if(await page.locator('.amortization').evaluate(el=>getComputedStyle(el).display)!=='none') throw new Error('Loan schedule should be hidden in comparison print mode');
    await page.emulateMedia({media:'screen'});await page.evaluate(()=>document.body.classList.remove('compare-print'));
    await page.locator('#compare-rate-b').fill('6.4');if(!(await page.locator('#compare-download-csv').isDisabled())||!(await page.locator('#compare-print-report').isDisabled())) throw new Error('Editing comparison input must invalidate stale report actions');await page.locator('#compare-calc').click();

    // Zero-rate scenario and identical-scenario reconciliation.
    await page.locator('#compare-rate-b').fill('0');
    await page.locator('#compare-years-b').fill('5');
    await page.locator('#compare-extra-input-c').fill('0');
    await page.locator('#compare-rate-c').fill('7');
    await page.locator('#compare-years-c').fill('5');
    await page.locator('#loan-rate').fill('7');
    await page.locator('#loan-years').fill('5');
    await page.locator('#compare-calc').click();
    near(await money('compare-interest-b'),0,'Scenario B zero-rate interest');
    near(await money('compare-total-b'),10000,'Scenario B zero-rate total');
    await page.locator('#compare-rate-b').fill('7');
    await page.locator('#compare-extra-input-b').fill('0');
    await page.locator('#compare-calc').click();
    if(await textOf('compare-delta-interest-b')!=='No difference') throw new Error('Identical scenarios should have no interest difference');
    await page.locator('#compare-rate-b').fill('-1');
    await page.locator('#compare-calc').click();
    if(!/Check the shared loan amount/.test(await textOf('compare-status'))) throw new Error('Invalid scenario input should be rejected');

    // Expanded comparison table must stay inside a 320px mobile viewport.
    await page.setViewportSize({width:320,height:800});
    await page.goto('http://127.0.0.1:4173/loan-calculator.html');
    await page.locator('#scenario-comparison > summary').click();
    const scenarioWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    if(scenarioWidth>320) throw new Error('Expanded scenario comparison overflows 320px viewport: '+scenarioWidth);
    await page.setViewportSize({width:1365,height:900});

    // 3. Monthly budget: preserve the basic totals and verify advanced target allocation.
    await calculate('monthly-budget.html','budget-calc',{'budget-income':3500,'budget-housing':900,'budget-food':500,'budget-transport':300,'budget-bills':250,'budget-other':400,'budget-savings-debt':200});
    await page.locator('#budget-advanced > summary').click();
    near(await money('budget-expenses'),2350,'Budget expenses'); near(await money('budget-remaining'),950,'Budget remainder after savings/debt');
    if(await textOf('budget-share')!=='27.1%') throw new Error('Budget remainder percentage mismatch');
    await page.locator('#budget-group-housing').selectOption('needs');
    await page.locator('#budget-group-food').selectOption('needs');
    await page.locator('#budget-group-transport').selectOption('needs');
    await page.locator('#budget-group-bills').selectOption('needs');
    await page.locator('#budget-group-other').selectOption('wants');
    await page.locator('#budget-calc').click();
    near(await money('budget-actual-needs'),1950,'Budget actual needs');
    near(await money('budget-target-needs-amount'),1750,'Budget needs target');
    near(await money('budget-actual-wants'),400,'Budget actual wants');
    near(await money('budget-target-wants-amount'),1050,'Budget wants target');
    near(await money('budget-actual-savings'),200,'Budget savings/debt actual');
    near(await money('budget-target-savings-amount'),700,'Budget savings/debt target');
    if(await textOf('budget-share-needs')!=='55.7%') throw new Error('Budget needs actual share mismatch');
    if(!(await textOf('budget-variance-needs')).startsWith('+')) throw new Error('Budget needs variance should be positive/above target');
    if(!/below target/.test(await textOf('budget-allocation-status'))) throw new Error('Budget allocation completion message missing');

    // Unassigned non-zero categories must not silently enter an allocation bucket.
    await page.goto('http://127.0.0.1:4173/monthly-budget.html');
    await page.locator('#budget-advanced > summary').click();
    await page.locator('#budget-calc').click();
    if(!/Choose a group/.test(await textOf('budget-allocation-status'))) throw new Error('Unassigned category should block allocation comparison');
    if(await textOf('budget-actual-needs')!=='—') throw new Error('Unassigned categories must not produce a misleading bucket total');

    // Custom targets must total 100%.
    await page.locator('#budget-group-housing').selectOption('needs');
    await page.locator('#budget-group-food').selectOption('needs');
    await page.locator('#budget-group-transport').selectOption('needs');
    await page.locator('#budget-group-bills').selectOption('needs');
    await page.locator('#budget-group-other').selectOption('wants');
    await page.locator('#budget-target-needs').fill('60');
    await page.locator('#budget-target-wants').fill('20');
    await page.locator('#budget-target-savings').fill('20');
    await page.locator('#budget-calc').click();
    near(await money('budget-target-needs-amount'),2100,'Custom needs target');
    near(await money('budget-target-wants-amount'),700,'Custom wants target');
    await page.locator('#budget-target-needs').fill('60');
    await page.locator('#budget-target-wants').fill('30');
    await page.locator('#budget-target-savings').fill('20');
    await page.locator('#budget-calc').click();
    if(!/add up to 100%/.test(await textOf('budget-allocation-status'))) throw new Error('Invalid target percentages should be rejected');
    await page.locator('#budget-target-needs').fill('50');
    await page.locator('#budget-target-wants').fill('30');
    await page.locator('#budget-target-savings').fill('20');

    // Zero income must not cause division by zero or NaN.
    await set({'budget-income':0,'budget-housing':0,'budget-food':0,'budget-transport':0,'budget-bills':0,'budget-other':0,'budget-savings-debt':0});
    await page.locator('#budget-calc').click();
    if(!/Enter take-home income/.test(await textOf('budget-allocation-status'))) throw new Error('Zero-income allocation guidance missing');
    if(await textOf('budget-share-needs')!=='—') throw new Error('Zero-income share must not show a percentage');

    await set({'budget-income':2000,'budget-housing':900,'budget-food':500,'budget-transport':300,'budget-bills':250,'budget-other':300,'budget-savings-debt':0}); await page.locator('#budget-calc').click();
    near(await money('budget-remaining'),-250,'Budget deficit');
    await page.locator('#budget-income').fill('-1'); await page.locator('#budget-calc').click(); await expectInvalid('budget-remaining','Negative budget income');

    // Expanded advanced allocation must remain within a 320px mobile viewport.
    await page.setViewportSize({width:320,height:800});
    await page.goto('http://127.0.0.1:4173/monthly-budget.html');
    await page.locator('#budget-advanced > summary').click();
    const expandedBudgetWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    if(expandedBudgetWidth>320) throw new Error('Expanded advanced budget panel overflows 320px viewport: '+expandedBudgetWidth);
    await page.setViewportSize({width:1365,height:900});

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

    // Optional multi-debt comparison: expand its disclosure before interacting with the fields.
    await calculate('debt-payoff.html','debt-calc',{'debt-balance':5000,'debt-rate':12,'debt-payment':250});
    await page.locator('#multi-debt-details > summary').click();
    await set({'multi-debt-name-1':'Small low-rate','multi-debt-balance-1':1500,'multi-debt-rate-1':8,'multi-debt-min-1':40,
      'multi-debt-name-2':'Large high-rate','multi-debt-balance-2':3000,'multi-debt-rate-2':24,'multi-debt-min-2':90,
      'multi-debt-extra':50});
    await page.locator('#multi-debt-calc').click();
    if(await page.locator('#multi-debt-results').isHidden()) throw new Error('Multi-debt comparison did not render');
    const snowOrder=await textOf('snowball-order'), avalancheOrder=await textOf('avalanche-order');
    if(!snowOrder.startsWith('Small low-rate')||!avalancheOrder.startsWith('Large high-rate')) throw new Error('Snowball and avalanche priority order incorrect: '+snowOrder+' / '+avalancheOrder);
    if(!(await textOf('snowball-months')).match(/^\d+$/)||!(await textOf('avalanche-months')).match(/^\d+$/)) throw new Error('Multi-debt payoff months missing');
    if((await textOf('snowball-interest'))==='—'||(await textOf('avalanche-interest'))==='—') throw new Error('Multi-debt interest results missing');
    await page.locator('#multi-debt-extra').fill('75');
    if(!(await page.locator('#multi-debt-results').isHidden())) throw new Error('Editing multi-debt inputs must invalidate old results');
    await page.locator('#multi-debt-calc').click();
    await page.locator('#multi-debt-min-2').fill('50');
    await page.locator('#multi-debt-calc').click();
    if(!(await textOf('multi-debt-status')).includes('minimum payment must be greater')) throw new Error('Minimum payment below first-month interest must be rejected');

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
    await page.locator('#retirement-scenarios > summary').click();
    await page.locator('#retirement-calc').click();
    near(await money('retirement-low-nominal'),131063.7502,'Retirement conservative nominal balance');
    near(await money('retirement-low-real'),72566.8207,'Retirement conservative today-dollar balance');
    near(await money('retirement-base-nominal'),148274.3226,'Retirement base nominal balance');
    near(await money('retirement-base-real'),82095.8974,'Retirement base today-dollar balance');
    near(await money('retirement-high-nominal'),217309.2922,'Retirement optimistic nominal balance');
    near(await money('retirement-high-real'),120318.8863,'Retirement optimistic today-dollar balance');
    near(await money('retirement-base-contrib'),82000,'Retirement scenario contributions');

    // Zero inflation: today's dollars must equal nominal future dollars.
    await page.locator('#retirement-inflation').fill('0');
    await page.locator('#retirement-calc').click();
    near(await money('retirement-base-real'),await money('retirement-base-nominal'),'Zero-inflation retirement value');

    // Zero nominal return and zero inflation preserve contributions exactly.
    await set({'retirement-current':0,'retirement-monthly':100,'retirement-years':10,'retirement-return':0,'retirement-match':0,'retirement-low-return':0,'retirement-high-return':0});
    await page.locator('#retirement-calc').click();
    near(await money('retirement-base-nominal'),12000,'Zero-return scenario nominal balance');
    near(await money('retirement-base-real'),12000,'Zero-return scenario real value');

    // Negative real return: positive nominal growth can still lose purchasing power.
    await set({'retirement-current':10000,'retirement-monthly':200,'retirement-years':20,'retirement-return':4,'retirement-match':50,'retirement-low-return':3,'retirement-high-return':6,'retirement-inflation':5});
    await page.locator('#retirement-calc').click();
    if((await money('retirement-base-real'))>=(await money('retirement-base-nominal'))) throw new Error('Higher inflation should reduce the real value below nominal value');
    if(!/5.0% annual inflation/.test(await textOf('retirement-scenario-status'))) throw new Error('Retirement inflation assumption not disclosed');

    // Scenario ordering must be conservative <= base <= optimistic.
    await set({'retirement-current':10000,'retirement-monthly':200,'retirement-years':20,'retirement-return':6,'retirement-match':50,'retirement-low-return':8,'retirement-high-return':4});
    await page.locator('#retirement-calc').click();
    if(!/Conservative return/.test(await textOf('retirement-scenario-status'))) throw new Error('Invalid retirement scenario order should be rejected');
    near(await money('retirement-balance'),168102.9445,'Base retirement result remains available after scenario-order error');

    // Invalid inflation must be rejected without breaking the base projection.
    await set({'retirement-current':10000,'retirement-monthly':200,'retirement-years':20,'retirement-return':6,'retirement-match':50,'retirement-low-return':4,'retirement-high-return':8,'retirement-inflation':-1});
    await page.locator('#retirement-calc').click();
    if(!/Check inflation/.test(await textOf('retirement-scenario-status'))) throw new Error('Invalid inflation should be rejected');

    // Expanded scenario table must remain within a 320px mobile viewport.
    await page.setViewportSize({width:320,height:800});
    await page.goto('http://127.0.0.1:4173/retirement-calculator.html');
    await page.locator('#retirement-scenarios > summary').click();
    const retirementWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    if(retirementWidth>320) throw new Error('Expanded retirement scenarios overflow 320px viewport: '+retirementWidth);
    await page.setViewportSize({width:1365,height:900});

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
    // New calculators must preserve the same browser-local privacy behavior.
    await privacyPage.goto('http://127.0.0.1:4173/debt-to-income.html');
    await privacyPage.locator('#dti-income').fill('87654321');
    await privacyPage.locator('#dti-housing').fill('76543210');
    await privacyPage.locator('#dti-calc').click();
    await privacyPage.reload();
    if(await privacyPage.locator('#dti-income').inputValue()==='87654321') throw new Error('Debt-to-Income values persisted across reload');
    await privacyPage.goto('http://127.0.0.1:4173/emergency-fund.html');
    await privacyPage.locator('#ef-cost').fill('65432109');
    await privacyPage.locator('#ef-calc').click();
    await privacyPage.reload();
    if(await privacyPage.locator('#ef-cost').inputValue()==='65432109') throw new Error('Emergency Fund values persisted across reload');
    if(privacyLeaks.length) throw new Error('Finance calculator privacy/network leakage: '+privacyLeaks.join(' | '));
    console.log('PASS: Net Worth, Emergency Fund and Debt-to-Income figures remain browser-local; no non-read request, fetch/XHR/beacon, storage persistence or financial-value URL/body leakage.');
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
    console.log('PASS: 10 responsive widths across homepage and all calculators; labeled controls and keyboard-only calculation/focus checks.');


    // Crawl every public HTML page and verify all local links, fragments and sitemap entries.
    const allHtmlFiles=fs.readdirSync(root).filter(name=>name.endsWith('.html')).sort();
    // Google Search Console ownership files are verification endpoints, not indexable site pages.
    const sitemapEligibleHtmlFiles=allHtmlFiles.filter(name=>!/^google[0-9a-f]+\.html$/i.test(name));
    const googleVerificationFile='google4a4795e5c7c03eae.html';
    if(fs.readFileSync(path.join(root,googleVerificationFile),'utf8').trim()!=='google-site-verification: google4a4795e5c7c03eae.html') throw new Error('Google Search Console verification file content does not match the supplied token.');
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
    if(sitemapFiles.size!==sitemapEligibleHtmlFiles.length) throw new Error('Sitemap/page count mismatch: '+sitemapFiles.size+' sitemap entries vs '+sitemapEligibleHtmlFiles.length+' indexable HTML pages');
    const pageIssues=[];
    const pageTitles=[];
    for(const file of sitemapEligibleHtmlFiles){
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
    if(!homepageSource.includes('16 useful calculators')) throw new Error('Homepage calculator count is not 16');
    if(!homepageSource.includes('id="resources"')) throw new Error('Resources navigation target is missing');
    if(!homepageSource.includes('cash-flow-budget-guide.html')) throw new Error('Homepage is missing the cash-flow guide link');
    if(!homepageSource.includes('debt-to-income.html')) throw new Error('Homepage is missing the Debt-to-Income calculator link');
    console.log('PASS: '+sitemapEligibleHtmlFiles.length+' indexable HTML pages and Google verification endpoint served; unique titles, descriptions, canonicals, H1, language, sitemap/robots, footer policy links and all local paths/fragments verified.');

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
    console.log('PASS: homepage, all calculator default interactions, live result announcements, mobile menu, 390px overflow, local HTML links and axe WCAG 2.1 A/AA audit.');
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(e=>{console.error(e.stack||e);process.exit(1);});
