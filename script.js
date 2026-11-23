(()=>{
  "use strict";
  const $ = id => document.getElementById(id);
  const put = (id, value) => { if ($(id)) $(id).textContent = value; };
  let currency = $("currency")?.value || "USD";
  const fmt = value => new Intl.NumberFormat("en-US", {style:"currency", currency, maximumFractionDigits:2}).format(value);
  const read = (id, min=0, max=1e12) => {
    const el = $(id);
    if (!el) return null;
    const raw = el.value.trim();
    const value = raw === "" ? NaN : Number(raw);
    const ok = Number.isFinite(value) && value >= min && value <= max;
    el.setAttribute("aria-invalid", String(!ok));
    return ok ? value : null;
  };
  const bind = (id, fn) => { if ($(id)) $(id).addEventListener("click", fn); };
  const invalid = ids => ids.forEach(id => put(id, "Check inputs"));
  if ($("year")) $("year").textContent = new Date().getFullYear();
  if ($("currency")) $("currency").addEventListener("change", event => {
    currency = event.target.value;
    ["ci-calc","loan-calc","compare-calc","budget-calc","save-calc","ef-calc","debt-calc","mortgage-calc","auto-calc","card-calc","retirement-calc","student-calc","networth-calc","multi-debt-calc","dti-calc","ra-calc"].forEach(id => { if ($(id)) $(id).click(); });
  });

  bind("ci-calc", () => {
    const p=read("ci-principal"), m=read("ci-monthly"), r=read("ci-rate",0,100), y=read("ci-years",1,80);
    const f=Number($("ci-frequency")?.value);
    if ([p,m,r,y].some(v=>v===null) || ![1,4,12].includes(f)) { invalid(["ci-result","ci-paid","ci-interest"]); return; }
    const monthlyRate=Math.pow(1+(r/100)/f,f/12)-1, totalMonths=y*12;
    let balance=p;
    for(let month=0;month<totalMonths;month++){
      balance*=1+monthlyRate;
      balance+=m;
      if(!Number.isFinite(balance)){ invalid(["ci-result","ci-paid","ci-interest"]); return; }
    }
    const paid=p+m*totalMonths, interest=balance-paid;
    if(!Number.isFinite(paid)||!Number.isFinite(interest)){invalid(["ci-result","ci-paid","ci-interest"]);return;}
    put("ci-result",fmt(balance)); put("ci-paid",fmt(paid)); put("ci-interest",fmt(interest));
  });

  const calculateLoanSchedule = (principal, annual, years, extra) => {
    const rate=annual/1200, months=Math.max(1,Math.round(years*12));
    const base=rate ? principal*rate/(1-Math.pow(1+rate,-months)) : principal/months;
    if(!Number.isFinite(base)||base<=0) return null;
    const cents=value=>Math.round((value+Number.EPSILON)*100)/100;
    const basePayment=Math.ceil((base-1e-10)*100)/100, extraPayment=cents(extra);
    let balance=cents(principal), interestTotal=0, paidTotal=0, extraTotal=0, count=0;
    const rows=[];
    while(balance>0 && count<600){
      const opening=balance;
      const interest=cents(opening*rate);
      const due=cents(opening+interest);
      const scheduled=Math.min(basePayment,due);
      const scheduledPrincipal=cents(Math.max(0,scheduled-interest));
      const afterScheduled=cents(Math.max(0,opening-scheduledPrincipal));
      const extraApplied=Math.min(extraPayment,afterScheduled);
      const principalPaid=cents(scheduledPrincipal+extraApplied);
      balance=cents(Math.max(0,opening-principalPaid));
      const payment=cents(interest+principalPaid);
      interestTotal=cents(interestTotal+interest);
      paidTotal=cents(paidTotal+payment);
      extraTotal=cents(extraTotal+extraApplied);
      count++;
      rows.push({count,opening,scheduled,extra:extraApplied,interest,principal:principalPaid,ending:balance,cumulative:interestTotal});
    }
    if(balance>0) return null;
    return {basePayment:cents(basePayment),extraPayment,monthlyPayment:cents(basePayment+extraPayment),interestTotal,paidTotal,extraTotal,count,finalBalance:balance,rows};
  };

  let latestLoanReport = null;
  const loanReportControls = ["loan-amount","loan-rate","loan-years","loan-extra","currency"];
  const setLoanReportActions = enabled => {
    ["loan-download-csv","loan-print-report"].forEach(id => { if ($(id)) $(id).disabled = !enabled; });
  };
  const loanCsvCell = value => '"' + String(value).replace(/"/g,'""') + '"';
  const loanCsvNumber = value => Number(value).toFixed(2);
  const downloadLoanCsv = report => {
    const rows = [
      ["Report","USAJIO Loan Amortization Schedule"],
      ["Currency",report.currency],
      ["Principal",loanCsvNumber(report.principal)],
      ["Annual interest rate (%)",loanCsvNumber(report.annual)],
      ["Term (years)",loanCsvNumber(report.years)],
      ["Extra monthly principal",loanCsvNumber(report.extra)],
      ["Scheduled monthly payment",loanCsvNumber(report.result.basePayment)],
      ["Monthly outflow incl. extra",loanCsvNumber(report.result.monthlyPayment)],
      ["Total interest",loanCsvNumber(report.result.interestTotal)],
      ["Total repayment",loanCsvNumber(report.result.paidTotal)],
      ["Number of payments",String(report.result.count)],
      ["Final balance",loanCsvNumber(report.result.finalBalance)],
      ["Assumptions","Fixed rate; monthly payments; cent-rounded monthly interest; extra payments reduce principal."],
      ["Exclusions","Taxes, fees, insurance, lender-specific interest methods and prepayment penalties are excluded."],
      [],
      ["Payment","Starting balance","Scheduled payment","Extra principal","Interest","Principal paid","Ending balance","Cumulative interest"],
      ...report.result.rows.map(row => [row.count,row.opening,row.scheduled,row.extra,row.interest,row.principal,row.ending,row.cumulative].map((value,index)=>index===0?String(value):loanCsvNumber(value)))
    ];
    const csv="\uFEFF"+rows.map(row=>row.map(loanCsvCell).join(",")).join("\r\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;link.download="usajio-loan-amortization.csv";
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  loanReportControls.forEach(id => {
    const element=$(id);
    if(element) element.addEventListener("input",()=>{latestLoanReport=null;setLoanReportActions(false);});
  });
  bind("loan-download-csv",()=>{if(latestLoanReport) downloadLoanCsv(latestLoanReport);});
  bind("loan-print-report",()=>{if(latestLoanReport){document.body.classList.remove("compare-print");document.body.classList.add("loan-print");window.print();}});

  bind("loan-calc", () => {
    const p=read("loan-amount",0,1e12), annual=read("loan-rate",0,100), years=read("loan-years",1,50), extra=read("loan-extra",0,1e12);
    if([p,annual,years,extra].some(v=>v===null)||p<=0){latestLoanReport=null;setLoanReportActions(false);invalid(["loan-monthly","loan-interest","loan-total"]);put("loan-schedule","");return;}
    const result=calculateLoanSchedule(p,annual,years,extra);
    if(!result){latestLoanReport=null;setLoanReportActions(false);invalid(["loan-monthly","loan-interest","loan-total"]);put("loan-schedule","");return;}
    latestLoanReport={principal:p,annual,years,extra,currency:$("currency")?.value||"USD",result};
    setLoanReportActions(true);
    const printValues={
      "loan-print-currency":latestLoanReport.currency,
      "loan-print-principal":fmt(p),
      "loan-print-rate":annual.toFixed(2)+"%",
      "loan-print-term":years+" years",
      "loan-print-extra":fmt(extra),
      "loan-print-payment":fmt(result.basePayment),
      "loan-print-interest":fmt(result.interestTotal),
      "loan-print-total":fmt(result.paidTotal),
      "loan-print-count":String(result.count)
    };
    Object.entries(printValues).forEach(([id,value])=>{if($(id)) $(id).textContent=value;});
    put("loan-monthly",fmt(result.monthlyPayment));
    put("loan-interest",fmt(result.interestTotal));
    put("loan-total",fmt(result.paidTotal));
    put("loan-payment-count",result.count+" payments");
    put("loan-extra-total","Extra principal: "+fmt(result.extraTotal));
    const body=$("loan-schedule");
    if(body) body.innerHTML=result.rows.map(row=>"<tr><th scope=\"row\">"+row.count+"</th><td>"+fmt(row.opening)+"</td><td>"+fmt(row.scheduled)+"</td><td>"+fmt(row.extra)+"</td><td>"+fmt(row.interest)+"</td><td>"+fmt(row.principal)+"</td><td>"+fmt(row.ending)+"</td><td>"+fmt(row.cumulative)+"</td></tr>").join("");
  });

  let latestCompareReport=null;
  const compareReportControls=["loan-amount","loan-rate","loan-years","loan-extra","currency","compare-rate-b","compare-years-b","compare-extra-input-b","compare-rate-c","compare-years-c","compare-extra-input-c"];
  const setCompareReportActions=enabled=>["compare-download-csv","compare-print-report"].forEach(id=>{if($(id))$(id).disabled=!enabled;});
  const downloadCompareCsv=report=>{
    const rows=[["Report","USAJIO Loan Scenario Comparison"],["Currency",report.currency],["Shared principal",loanCsvNumber(report.principal)],["Assumptions","Same principal and currency; fixed annual rate divided monthly; monthly payments; cent-rounded interest; extra monthly amounts reduce principal."],["Exclusions","APR, lender fees, points, credits, taxes, insurance and prepayment penalties are excluded. Not a lender-offer comparison."],[],["Scenario","Annual interest rate (%)","Term (years)","Extra monthly principal","Scheduled monthly payment","Monthly outflow incl. extra","Total interest","Total repayment","Payments to payoff","Extra principal paid","Final balance"],...report.scenarios.map(s=>[s.label,loanCsvNumber(s.rate),loanCsvNumber(s.years),loanCsvNumber(s.extra),loanCsvNumber(s.result.basePayment),loanCsvNumber(s.result.monthlyPayment),loanCsvNumber(s.result.interestTotal),loanCsvNumber(s.result.paidTotal),String(s.result.count),loanCsvNumber(s.result.extraTotal),loanCsvNumber(s.result.finalBalance)]),[],["Difference vs Scenario A","Scenario B","Scenario C"],["Monthly outflow",loanCsvNumber(report.scenarios[1].result.monthlyPayment-report.scenarios[0].result.monthlyPayment),loanCsvNumber(report.scenarios[2].result.monthlyPayment-report.scenarios[0].result.monthlyPayment)],["Total interest",loanCsvNumber(report.scenarios[1].result.interestTotal-report.scenarios[0].result.interestTotal),loanCsvNumber(report.scenarios[2].result.interestTotal-report.scenarios[0].result.interestTotal)],["Total repayment",loanCsvNumber(report.scenarios[1].result.paidTotal-report.scenarios[0].result.paidTotal),loanCsvNumber(report.scenarios[2].result.paidTotal-report.scenarios[0].result.paidTotal)],["Payments to payoff",String(report.scenarios[1].result.count-report.scenarios[0].result.count),String(report.scenarios[2].result.count-report.scenarios[0].result.count)]];
    const csv="\uFEFF"+rows.map(row=>row.map(loanCsvCell).join(",")).join("\r\n");const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download="usajio-loan-scenario-comparison.csv";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  compareReportControls.forEach(id=>{const el=$(id);if(el)el.addEventListener("input",()=>{latestCompareReport=null;setCompareReportActions(false);});});
  bind("compare-download-csv",()=>{if(latestCompareReport)downloadCompareCsv(latestCompareReport);});
  bind("compare-print-report",()=>{if(latestCompareReport){document.body.classList.remove("loan-print");document.body.classList.add("compare-print");window.print();}});
  window.addEventListener("afterprint",()=>document.body.classList.remove("compare-print","loan-print"));

  bind("compare-calc", () => {
    const principal=read("loan-amount",0,1e12);
    const inputs=[
      {label:"Scenario A",rate:read("loan-rate",0,100),years:read("loan-years",1,50),extra:read("loan-extra",0,1e12)},
      {label:"Scenario B",rate:read("compare-rate-b",0,100),years:read("compare-years-b",1,50),extra:read("compare-extra-input-b",0,1e12)},
      {label:"Scenario C",rate:read("compare-rate-c",0,100),years:read("compare-years-c",1,50),extra:read("compare-extra-input-c",0,1e12)}
    ];
    const outputIds=["compare-scheduled-a","compare-scheduled-b","compare-scheduled-c","compare-monthly-a","compare-monthly-b","compare-monthly-c","compare-interest-a","compare-interest-b","compare-interest-c","compare-total-a","compare-total-b","compare-total-c","compare-count-a","compare-count-b","compare-count-c","compare-extra-paid-a","compare-extra-paid-b","compare-extra-paid-c","compare-delta-monthly-b","compare-delta-monthly-c","compare-delta-interest-b","compare-delta-interest-c","compare-delta-total-b","compare-delta-total-c","compare-delta-count-b","compare-delta-count-c"];
    if(principal===null||principal<=0||inputs.some(x=>[x.rate,x.years,x.extra].some(v=>v===null))){
      invalid(outputIds);put("compare-status","Check the shared loan amount and all scenario inputs.");return;
    }
    const results=inputs.map(x=>calculateLoanSchedule(principal,x.rate,x.years,x.extra));
    if(results.some(x=>!x)){invalid(outputIds);put("compare-status","One or more scenarios could not be calculated. Check the inputs.");return;}
    latestCompareReport={principal,currency:$("currency")?.value||"USD",scenarios:inputs.map((item,index)=>({...item,result:results[index]}))};
    setCompareReportActions(true);put("compare-print-currency",latestCompareReport.currency);put("compare-print-principal",fmt(principal));
    results.forEach((r,index)=>{
      const key=["a","b","c"][index];
      put("compare-scheduled-"+key,fmt(r.basePayment));
      put("compare-monthly-"+key,fmt(r.monthlyPayment));
      put("compare-interest-"+key,fmt(r.interestTotal));
      put("compare-total-"+key,fmt(r.paidTotal));
      put("compare-count-"+key,r.count+" payments");
      put("compare-extra-paid-"+key,fmt(r.extraTotal));
    });
    const deltaMoney=(value)=>{const amount=Math.round((value+Number.EPSILON)*100)/100;return amount===0?"No difference":(amount>0?"+":"−")+fmt(Math.abs(amount));};
    ["b","c"].forEach((key,index)=>{
      const r=results[index+1], baseline=results[0];
      put("compare-delta-monthly-"+key,deltaMoney(r.monthlyPayment-baseline.monthlyPayment));
      put("compare-delta-interest-"+key,deltaMoney(r.interestTotal-baseline.interestTotal));
      put("compare-delta-total-"+key,deltaMoney(r.paidTotal-baseline.paidTotal));
      const countDiff=r.count-baseline.count;
      put("compare-delta-count-"+key,countDiff===0?"No difference":(countDiff>0?"+":"−")+Math.abs(countDiff)+" payments");
    });
    const lowestMonthly=results.reduce((best,item,index)=>item.monthlyPayment<results[best].monthlyPayment?index:best,0);
    const lowestInterest=results.reduce((best,item,index)=>item.interestTotal<results[best].interestTotal?index:best,0);
    put("compare-lowest-monthly",inputs[lowestMonthly].label);
    put("compare-lowest-interest",inputs[lowestInterest].label);
    put("compare-status","All scenarios use the same loan amount and currency. Fixed rate and monthly payments; fees, taxes, insurance and prepayment penalties are excluded.");
  });

  bind("budget-calc", () => {
    const income=read("budget-income",0,1e12);
    const ids=["budget-housing","budget-food","budget-transport","budget-bills","budget-other"];
    const groups=["needs","wants","savings"];
    const expenses=ids.map(id=>read(id,0,1e12));
    const savingsDebt=read("budget-savings-debt",0,1e12);
    const clearAllocation=()=>{
      ["needs","wants","savings"].forEach(group=>{
        put("budget-actual-"+group,"—");
        put("budget-target-"+group+"-amount","—");
        put("budget-share-"+group,"—");
        put("budget-variance-"+group,"—");
      });
    };
    if(income===null||expenses.some(v=>v===null)||savingsDebt===null){
      invalid(["budget-expenses","budget-remaining","budget-share"]);
      clearAllocation();
      put("budget-allocation-status","Check income, expense and savings/debt inputs.");
      return;
    }
    const total=expenses.reduce((a,b)=>a+b,0), remaining=income-total-savingsDebt;
    put("budget-expenses",fmt(total)); put("budget-remaining",fmt(remaining));
    put("budget-share",income?((remaining/income)*100).toFixed(1)+"%":"—");
    const targetIds=["budget-target-needs","budget-target-wants","budget-target-savings"];
    const targets=targetIds.map(id=>read(id,0,100));
    if(targets.some(v=>v===null)){
      clearAllocation();
      put("budget-allocation-status","Check the three target percentages. Each must be between 0 and 100.");
      return;
    }
    const targetTotal=targets.reduce((a,b)=>a+b,0);
    if(Math.abs(targetTotal-100)>0.01){
      targetIds.forEach(id=>$(id)?.setAttribute("aria-invalid","true"));
      clearAllocation();
      put("budget-allocation-status","Your target percentages must add up to 100%.");
      return;
    }
    const groupIds=["budget-group-housing","budget-group-food","budget-group-transport","budget-group-bills","budget-group-other"];
    const unassigned=ids.map((id,index)=>({id,amount:expenses[index],group:$(groupIds[index])?.value||""}))
      .filter(item=>item.amount>0&&!groups.includes(item.group));
    if(unassigned.length){
      clearAllocation();
      put("budget-allocation-status","Choose a group for: "+unassigned.map(item=>item.id.replace("budget-","").replaceAll("-"," ")).join(", ")+". The basic budget total above is still available.");
      return;
    }
    const allocation={needs:0,wants:0,savings:savingsDebt};
    expenses.forEach((amount,index)=>{
      const group=$(groupIds[index])?.value;
      if(groups.includes(group)) allocation[group]+=amount;
    });
    const keys=["needs","wants","savings"];
    keys.forEach((group,index)=>{
      const actual=allocation[group], target=income*targets[index]/100, difference=actual-target;
      put("budget-actual-"+group,fmt(actual));
      put("budget-target-"+group+"-amount",fmt(target));
      put("budget-share-"+group,income?((actual/income)*100).toFixed(1)+"%":"—");
      put("budget-variance-"+group,(difference>0?"+":difference<0?"−":"")+fmt(Math.abs(difference)));
    });
    put("budget-allocation-status",income>0
      ?"Allocation comparison complete. A positive difference is above target; a negative difference is below target."
      :"Enter take-home income above zero to compare actual percentages with targets.");
  });

  bind("save-calc", () => {
    const target=read("save-target",0,1e12), current=read("save-current",0,1e12), months=read("save-months",1,1200);
    if([target,current,months].some(v=>v===null)){put("save-monthly","Check inputs");return;}
    put("save-monthly",fmt(Math.max(0,target-current)/months));
  });

  bind("ef-calc", () => {
    const cost=read("ef-cost",0,1e12), months=read("ef-months",1,24), current=read("ef-current",0,1e12), contribution=read("ef-contribution",0,1e12);
    if([cost,months,current,contribution].some(v=>v===null)){invalid(["ef-goal","ef-gap","ef-time"]);put("ef-scenario-note","Check all emergency fund inputs.");return;}
    const goal=Math.round(cost*months*100)/100, gap=Math.max(0,Math.round((goal-current)*100)/100);
    put("ef-goal",fmt(goal));put("ef-gap",fmt(gap));put("ef-time",gap===0?"Goal reached":contribution>0?String(Math.ceil(gap/contribution-1e-10))+" months":"Add a monthly amount");
    put("ef-scenario-note",gap===0?"Your current savings meet or exceed this target.":contribution>0?"At "+fmt(contribution)+" per month, this is a simple no-interest estimate; actual progress may vary.":"Enter a positive monthly contribution to estimate a timeline.");
  });

  bind("dti-calc", () => {
    const income=read("dti-income",0,1e12), ids=["dti-housing","dti-auto","dti-student","dti-card","dti-other"], payments=ids.map(id=>read(id,0,1e12));
    if(income===null||income<=0||payments.some(v=>v===null)){invalid(["dti-total","dti-ratio"]);put("dti-status","Enter positive gross monthly income and non-negative monthly debt payments.");return;}
    const total=Math.round(payments.reduce((sum,value)=>sum+value,0)*100)/100, ratio=total/income*100;
    put("dti-total",fmt(total));put("dti-ratio",ratio.toFixed(1)+"%");
    put("dti-status",ratio<=36?"Lower debt-to-income range (36% or less). General educational reference, not an approval rule.":ratio<=43?"Above 36% and up to 43%. Review your budget and lender-specific requirements.":"Above 43%. Consider reviewing monthly obligations; lenders use different criteria and other factors.");
  });

  bind("multi-debt-calc", () => {
    const status = $("multi-debt-status");
    const results = $("multi-debt-results");
    const scheduleBody = $("multi-debt-schedule-body");
    if (results) { results.hidden = true; results.style.display = "none"; }
    if (scheduleBody) scheduleBody.replaceChildren();
    const debts = [];
    for (let i=1;i<=4;i++) {
      const nameEl=$("multi-debt-name-"+i), balanceEl=$("multi-debt-balance-"+i), rateEl=$("multi-debt-rate-"+i), minEl=$("multi-debt-min-"+i);
      const raw=[nameEl?.value.trim()||"",balanceEl?.value.trim()||"",rateEl?.value.trim()||"",minEl?.value.trim()||""];
      if(raw.every(v=>v==="")) continue;
      if(raw.some(v=>v==="")) { if(status) status.textContent="Complete the name, balance, APR and minimum payment for each debt row you use."; return; }
      const balance=Number(raw[1]), apr=Number(raw[2]), minimum=Number(raw[3]);
      if(!raw[0]||!Number.isFinite(balance)||balance<=0||!Number.isFinite(apr)||apr<0||apr>100||!Number.isFinite(minimum)||minimum<=0) {
        if(status) status.textContent="Check each debt: enter a name, positive balance, APR from 0–100%, and a positive minimum payment.";
        return;
      }
      const firstInterest=Math.round((balance*apr/1200+Number.EPSILON)*100)/100;
      if(minimum<=firstInterest) { if(status) status.textContent=raw[0]+": minimum payment must be greater than the first month's estimated interest ("+fmt(firstInterest)+")."; return; }
      debts.push({name:raw[0],balance:Math.round(balance*100)/100,apr,minimum:Math.round(minimum*100)/100,originalIndex:i});
    }
    const extraRaw=$("multi-debt-extra")?.value.trim()||"";
    const extra=Number(extraRaw);
    if(!debts.length||extraRaw===""||!Number.isFinite(extra)||extra<0||extra>1e12) {
      if(status) status.textContent="Enter at least one complete debt and a non-negative extra monthly amount.";
      return;
    }
    const cents=v=>Math.round((v+Number.EPSILON)*100)/100;
    const monthlyBudget=cents(debts.reduce((sum,d)=>sum+d.minimum,0)+extra);
    const simulate=(method)=>{
      const state=debts.map(d=>({...d,remaining:d.balance,interestTotal:0,paidMonth:0}));
      const order=[...state].sort((a,b)=>method==="snowball"
        ? a.balance-b.balance || b.apr-a.apr || a.originalIndex-b.originalIndex
        : b.apr-a.apr || a.balance-b.balance || a.originalIndex-b.originalIndex);
      const priority=order.map(d=>d.originalIndex);
      let totalInterest=0,month=0;
      const schedule=[];
      while(state.some(d=>d.remaining>0)&&month<1200){
        month++;
        let interestThisMonth=0;
        state.forEach(d=>{
          if(d.remaining>0){
            const charge=cents(d.remaining*d.apr/1200);
            d.remaining=cents(d.remaining+charge);
            d.interestTotal=cents(d.interestTotal+charge);
            totalInterest=cents(totalInterest+charge);
            interestThisMonth=cents(interestThisMonth+charge);
          }
        });
        let available=monthlyBudget;
        state.forEach(d=>{
          if(d.remaining<=0)return;
          const payment=Math.min(d.minimum,d.remaining,available);
          d.remaining=cents(Math.max(0,d.remaining-payment));available=cents(available-payment);
          if(d.remaining===0&&!d.paidMonth)d.paidMonth=month;
        });
        for(const id of priority){
          if(available<=0)break;
          const d=state.find(item=>item.originalIndex===id);
          if(!d||d.remaining<=0)continue;
          const payment=Math.min(d.remaining,available);
          d.remaining=cents(Math.max(0,d.remaining-payment));available=cents(available-payment);
          if(d.remaining===0&&!d.paidMonth)d.paidMonth=month;
        }
        schedule.push({
          month,
          remaining:cents(state.reduce((sum,d)=>sum+d.remaining,0)),
          interest:interestThisMonth,
          paid:state.filter(d=>d.paidMonth===month).map(d=>d.name)
        });
      }
      if(state.some(d=>d.remaining>0))return null;
      const payoffOrder=[...state].sort((a,b)=>a.paidMonth-b.paidMonth||priority.indexOf(a.originalIndex)-priority.indexOf(b.originalIndex)).map(d=>d.name);
      return {months:month,interest:cents(totalInterest),order:payoffOrder,schedule};
    };
    const snowball=simulate("snowball"), avalanche=simulate("avalanche");
    if(!snowball||!avalanche){if(status)status.textContent="This plan cannot be paid off within 100 years at the entered monthly budget. Increase the payment or review the minimums.";return;}
    put("snowball-months",String(snowball.months));put("snowball-interest",fmt(snowball.interest));put("snowball-order",snowball.order.join(" → "));
    put("avalanche-months",String(avalanche.months));put("avalanche-interest",fmt(avalanche.interest));put("avalanche-order",avalanche.order.join(" → "));
    const diff=cents(snowball.interest-avalanche.interest);
    put("multi-debt-difference",diff>0?"Avalanche estimates "+fmt(diff)+" less interest than Snowball.":diff<0?"Snowball estimates "+fmt(Math.abs(diff))+" less interest in this scenario.":"Both strategies estimate the same total interest.");
    if(scheduleBody){
      const totalMonths=Math.max(snowball.schedule.length,avalanche.schedule.length);
      for(let index=0;index<totalMonths;index++){
        const snow=snowball.schedule[index],avalancheRow=avalanche.schedule[index];
        const cells=[
          String(index+1),
          snow?fmt(snow.remaining):"Debt-free",
          avalancheRow?fmt(avalancheRow.remaining):"Debt-free",
          snow?fmt(snow.interest):"—",
          avalancheRow?fmt(avalancheRow.interest):"—",
          snow&&snow.paid.length?snow.paid.join(", "):"—",
          avalancheRow&&avalancheRow.paid.length?avalancheRow.paid.join(", "):"—"
        ];
        const row=document.createElement("tr");
        cells.forEach((value,cellIndex)=>{
          const cell=document.createElement("td");
          cell.textContent=value;
          if(cellIndex===0)cell.setAttribute("scope","row");
          row.append(cell);
        });
        scheduleBody.append(row);
      }
    }
    if(results){results.hidden=false;results.style.display="grid";}
    if(status)status.textContent="Comparison complete. Both methods use the same monthly budget of "+fmt(monthlyBudget)+".";
  });

  ["multi-debt-name-1","multi-debt-balance-1","multi-debt-rate-1","multi-debt-min-1","multi-debt-name-2","multi-debt-balance-2","multi-debt-rate-2","multi-debt-min-2","multi-debt-name-3","multi-debt-balance-3","multi-debt-rate-3","multi-debt-min-3","multi-debt-name-4","multi-debt-balance-4","multi-debt-rate-4","multi-debt-min-4","multi-debt-extra"].forEach(id=>{
    $(id)?.addEventListener("input",()=>{
      if($("multi-debt-results")){$("multi-debt-results").hidden=true;$("multi-debt-results").style.display="none";}
      if($("multi-debt-schedule-body"))$("multi-debt-schedule-body").replaceChildren();
      if($("multi-debt-status"))$("multi-debt-status").textContent="Inputs changed. Run the comparison again to refresh results.";
    });
  });

  bind("debt-calc", () => {
    let balance=read("debt-balance",0,1e12), annual=read("debt-rate",0,100), payment=read("debt-payment",0,1e12);
    if([balance,annual,payment].some(v=>v===null)){invalid(["debt-months","debt-interest"]);return;}
    if(balance===0){put("debt-months","0");put("debt-interest",fmt(0));return;}
    if(payment<=0){put("debt-months","Enter a payment");put("debt-interest","—");return;}
    const rate=annual/1200;
    if(rate>0 && payment<=balance*rate){put("debt-months","Payment too low");put("debt-interest","—");return;}
    let interest=0, months=0;
    while(balance>0.005 && months<1200){
      const charge=balance*rate; interest+=charge;
      balance=Math.max(0,balance+charge-payment); months++;
    }
    put("debt-months",months>=1200?"Over 100 years":String(months));
    put("debt-interest",months>=1200?"—":fmt(interest));
  });


  bind("mortgage-calc", () => {
    const price=read("mortgage-price",1,1e12), down=read("mortgage-down",0,100), annual=read("mortgage-rate",0,100), years=read("mortgage-years",1,50), tax=read("mortgage-tax",0,1e12), insurance=read("mortgage-insurance",0,1e12), hoa=read("mortgage-hoa",0,1e12);
    if([price,down,annual,years,tax,insurance,hoa].some(v=>v===null)||down>100){invalid(["mortgage-pi","mortgage-monthly","mortgage-interest"]);return;}
    const principal=price*(1-down/100), rate=annual/1200, months=years*12;
    const pi=rate?principal*rate/(1-Math.pow(1+rate,-months)):principal/months;
    const monthly=pi+tax/12+insurance/12+hoa, interest=pi*months-principal;
    if(![pi,monthly,interest].every(Number.isFinite)){invalid(["mortgage-pi","mortgage-monthly","mortgage-interest"]);return;}
    put("mortgage-pi",fmt(pi));put("mortgage-monthly",fmt(monthly));put("mortgage-interest",fmt(Math.max(0,interest)));
  });

  bind("auto-calc", () => {
    const amount=read("auto-amount",1,1e12), annual=read("auto-rate",0,100), months=read("auto-months",1,600), extra=read("auto-extra",0,1e12);
    if([amount,annual,months,extra].some(v=>v===null)){invalid(["auto-payment","auto-interest","auto-total","auto-duration"]);return;}
    const rate=annual/1200, base=rate?amount*rate/(1-Math.pow(1+rate,-months)):amount/months;
    let balance=amount, interest=0, total=0, count=0;
    while(balance>0.005&&count<600){const charge=balance*rate;const paid=Math.min(balance+charge,base+extra);interest+=charge;total+=paid;balance=Math.max(0,balance+charge-paid);count++;}
    if(balance>0.005){invalid(["auto-payment","auto-interest","auto-total","auto-duration"]);return;}
    put("auto-payment",fmt(base));put("auto-interest",fmt(interest));put("auto-total",fmt(total));put("auto-duration",String(count)+" months");
  });

  bind("card-calc", () => {
    const balance0=read("card-balance",0,1e12), annual=read("card-rate",0,100), payment=read("card-payment",0,1e12);
    if([balance0,annual,payment].some(v=>v===null)){invalid(["card-months","card-interest","card-total"]);return;}
    if(balance0===0){put("card-months","0");put("card-interest",fmt(0));put("card-total",fmt(0));return;}
    if(payment<=0){put("card-months","Enter a payment");put("card-interest","—");put("card-total","—");return;}
    const rate=annual/1200;
    if(rate>0&&payment<=balance0*rate){put("card-months","Payment too low");put("card-interest","—");put("card-total","—");return;}
    let balance=balance0,interest=0,total=0,months=0;
    while(balance>0.005&&months<1200){const charge=balance*rate;const paid=Math.min(balance+charge,payment);interest+=charge;total+=paid;balance=Math.max(0,balance+charge-paid);months++;}
    put("card-months",months>=1200?"Over 100 years":String(months)+" months");
    put("card-interest",months>=1200?"—":fmt(interest));put("card-total",months>=1200?"—":fmt(total));
  });


  bind("retirement-calc", () => {
    const current=read("retirement-current",0,1e12), monthly=read("retirement-monthly",0,1e10), years=read("retirement-years",1,70), annual=read("retirement-return",0,30), match=read("retirement-match",0,100);
    const clearScenarios=()=>{
      ["low","base","high"].forEach(key=>{
        ["rate-out","nominal","real","contrib","growth"].forEach(field=>put("retirement-"+key+"-"+field,"—"));
      });
    };
    if([current,monthly,years,annual,match].some(v=>v===null)){
      invalid(["retirement-balance","retirement-contrib","retirement-total"]);
      clearScenarios();
      put("retirement-scenario-status","Check the current savings, contribution, years, return and match inputs.");
      return;
    }
    const months=years*12, rate=Math.pow(1+annual/100,1/12)-1, contribution=monthly*(1+match/100);
    const growth=rate===0?months:(Math.pow(1+rate,months)-1)/rate;
    const balance=current*Math.pow(1+rate,months)+contribution*growth;
    const contrib=current+contribution*months;
    if(!Number.isFinite(balance)||!Number.isFinite(contrib)){
      invalid(["retirement-balance","retirement-contrib","retirement-total"]);
      clearScenarios();
      put("retirement-scenario-status","The entered values are outside the supported calculation range.");
      return;
    }
    put("retirement-balance",fmt(balance));put("retirement-contrib",fmt(contrib));put("retirement-total",fmt(balance-contrib));

    const inflation=read("retirement-inflation",0,30), low=read("retirement-low-return",0,30), high=read("retirement-high-return",0,30);
    if([inflation,low,high].some(v=>v===null)){
      clearScenarios();
      put("retirement-scenario-status","Check inflation and conservative/optimistic return assumptions (0–30%). The base projection above is still available.");
      return;
    }
    if(low>annual||annual>high){
      $("retirement-low-return")?.setAttribute("aria-invalid",String(low>annual));
      $("retirement-high-return")?.setAttribute("aria-invalid",String(high<annual));
      clearScenarios();
      put("retirement-scenario-status","Order the assumptions so Conservative return ≤ Base return ≤ Optimistic return.");
      return;
    }
    const project=returnPct=>{
      const monthlyRate=Math.pow(1+returnPct/100,1/12)-1;
      const factor=monthlyRate===0?months:(Math.pow(1+monthlyRate,months)-1)/monthlyRate;
      const nominal=current*Math.pow(1+monthlyRate,months)+contribution*factor;
      const totalContributions=current+contribution*months;
      return {nominal,real:nominal/Math.pow(1+inflation/100,years),contributions:totalContributions,growth:nominal-totalContributions};
    };
    const scenarios=[{key:"low",rate:low},{key:"base",rate:annual},{key:"high",rate:high}];
    for(const scenario of scenarios){
      const result=project(scenario.rate);
      if(![result.nominal,result.real,result.contributions,result.growth].every(Number.isFinite)){
        clearScenarios();
        put("retirement-scenario-status","The scenario assumptions produced a value outside the supported range.");
        return;
      }
      put("retirement-"+scenario.key+"-rate-out",scenario.rate.toFixed(1)+"%");
      put("retirement-"+scenario.key+"-nominal",fmt(result.nominal));
      put("retirement-"+scenario.key+"-real",fmt(result.real));
      put("retirement-"+scenario.key+"-contrib",fmt(result.contributions));
      put("retirement-"+scenario.key+"-growth",fmt(result.growth));
    }
    put("retirement-scenario-status","Today's-dollar values use "+inflation.toFixed(1)+"% annual inflation. Return scenarios are user-entered assumptions, not forecasts.");
  });
  bind("student-calc", () => {
    const principal=read("student-balance",0,1e12), annual=read("student-rate",0,100), payment=read("student-payment",0,1e12);
    if([principal,annual,payment].some(v=>v===null)){invalid(["student-months","student-interest","student-total"]);return;}
    if(principal===0){put("student-months","0");put("student-interest",fmt(0));put("student-total",fmt(0));return;}
    if(payment<=0){put("student-months","Enter a payment");put("student-interest","—");put("student-total","—");return;}
    const rate=annual/1200;
    if(rate>0&&payment<=principal*rate){put("student-months","Payment too low");put("student-interest","—");put("student-total","—");return;}
    let balance=principal,interest=0,total=0,months=0;
    while(balance>0.005&&months<1200){const charge=balance*rate,paid=Math.min(balance+charge,payment);interest+=charge;total+=paid;balance=Math.max(0,balance+charge-paid);months++;}
    put("student-months",months>=1200?"Over 100 years":String(months)+" months");put("student-interest",months>=1200?"—":fmt(interest));put("student-total",months>=1200?"—":fmt(total));
  });

  bind("networth-calc", () => {
    const ids=["net-cash","net-investments","net-retirement","net-home","net-other-assets","net-mortgage","net-auto","net-student","net-credit","net-other-debt"];
    const values=ids.map(id=>read(id,0,1e12));
    if(values.some(v=>v===null)){invalid(["net-assets","net-liabilities","net-result"]);return;}
    const assets=values.slice(0,5).reduce((sum,value)=>sum+value,0);
    const liabilities=values.slice(5).reduce((sum,value)=>sum+value,0);
    const netWorth=assets-liabilities;
    if(![assets,liabilities,netWorth].every(Number.isFinite)){invalid(["net-assets","net-liabilities","net-result"]);return;}
    put("net-assets",fmt(assets));put("net-liabilities",fmt(liabilities));put("net-result",fmt(netWorth));
  });

  ["ci-calc","loan-calc","compare-calc","budget-calc","save-calc","ef-calc","debt-calc","mortgage-calc","auto-calc","card-calc","retirement-calc","student-calc","networth-calc"].forEach(id=>{if($(id))$(id).click();});
})();
  bind("ra-calc", () => {
    const gross=read("ra-gross",1,1e12), net=read("ra-net",1,1e12), debt=read("ra-debt",0,1e12), essentials=read("ra-essentials",0,1e12), savings=read("ra-savings",0,1e12), utilities=read("ra-utilities",0,1e12), guideline=Number($("ra-guideline")?.value);
    if([gross,net,debt,essentials,savings,utilities].some(v=>v===null)||![25,30,35].includes(guideline)){invalid(["ra-rent","ra-cash","ra-guide","ra-left"]);put("ra-status","Enter positive gross and take-home income and non-negative monthly costs.");return;}
    const cash=Math.max(0,net-debt-essentials-savings), guide=gross*guideline/100, rent=Math.max(0,Math.min(guide,cash-utilities)), left=net-debt-essentials-savings-utilities-rent;
    put("ra-rent",fmt(rent));put("ra-cash",fmt(cash));put("ra-guide",fmt(guide));put("ra-left",fmt(left));
    put("ra-status",cash<utilities?"Your listed commitments use up the available cash before utilities. Review expenses or savings goals before setting a rent budget.":rent===0?"Your current cash-flow estimate does not leave room for rent after utilities. Review your inputs before making a housing decision.":rent<guide?"Your cash-flow limit is lower than the selected gross-income guideline, so the suggested rent uses the more conservative cash-flow limit.":"The selected gross-income guideline is the lower limit. Check local housing costs and leave room for irregular expenses.");
  });
