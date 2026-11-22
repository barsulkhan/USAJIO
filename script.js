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
    ["ci-calc","loan-calc","budget-calc","save-calc","ef-calc","debt-calc","mortgage-calc","auto-calc","card-calc","retirement-calc","student-calc","networth-calc"].forEach(id => { if ($(id)) $(id).click(); });
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

  bind("loan-calc", () => {
    const p=read("loan-amount",0,1e12), annual=read("loan-rate",0,100), years=read("loan-years",1,50), extra=read("loan-extra",0,1e12);
    if([p,annual,years,extra].some(v=>v===null)||p<=0){invalid(["loan-monthly","loan-interest","loan-total"]);put("loan-schedule","");return;}
    const rate=annual/1200, months=Math.max(1,Math.round(years*12));
    const base=rate ? p*rate/(1-Math.pow(1+rate,-months)) : p/months;
    if(!Number.isFinite(base)||base<=0){invalid(["loan-monthly","loan-interest","loan-total"]);return;}
    const cents=value=>Math.round((value+Number.EPSILON)*100)/100;
    const basePayment=cents(base), extraPayment=cents(extra);
    let balance=cents(p), interestTotal=0, paidTotal=0, extraTotal=0, count=0;
    const rows=[];
    while(balance>0 && count<600){
      const opening=balance;
      const interest=cents(opening*rate);
      const due=cents(opening+interest);
      const scheduled=Math.min(basePayment,due);
      const scheduledPrincipal=cents(Math.max(0,scheduled-interest));
      const afterScheduled=cents(Math.max(0,opening-scheduledPrincipal));
      const extraApplied=Math.min(extraPayment,afterScheduled);
      const principal=cents(scheduledPrincipal+extraApplied);
      balance=cents(Math.max(0,opening+interest-principal));
      const payment=cents(interest+principal);
      interestTotal=cents(interestTotal+interest);
      paidTotal=cents(paidTotal+payment);
      extraTotal=cents(extraTotal+extraApplied);
      count++;
      rows.push({count,opening,scheduled,extra:extraApplied,interest,principal,ending:balance,cumulative:interestTotal});
    }
    if(balance>0){invalid(["loan-monthly","loan-interest","loan-total"]);return;}
    put("loan-monthly",fmt(cents(basePayment+extraPayment)));
    put("loan-interest",fmt(interestTotal));
    put("loan-total",fmt(paidTotal));
    put("loan-payment-count",count+" payments");
    put("loan-extra-total","Extra principal: "+fmt(extraTotal));
    const body=$("loan-schedule");
    if(body) body.innerHTML=rows.map(row=>"<tr><th scope=\"row\">"+row.count+"</th><td>"+fmt(row.opening)+"</td><td>"+fmt(row.scheduled)+"</td><td>"+fmt(row.extra)+"</td><td>"+fmt(row.interest)+"</td><td>"+fmt(row.principal)+"</td><td>"+fmt(row.ending)+"</td><td>"+fmt(row.cumulative)+"</td></tr>").join("");
  });

  bind("budget-calc", () => {
    const income=read("budget-income",0,1e12);
    const ids=["budget-housing","budget-food","budget-transport","budget-bills","budget-other"];
    const expenses=ids.map(id=>read(id,0,1e12));
    if(income===null||expenses.some(v=>v===null)){invalid(["budget-expenses","budget-remaining","budget-share"]);return;}
    const total=expenses.reduce((a,b)=>a+b,0), remaining=income-total;
    put("budget-expenses",fmt(total)); put("budget-remaining",fmt(remaining));
    put("budget-share",income?((remaining/income)*100).toFixed(1)+"%":"—");
  });

  bind("save-calc", () => {
    const target=read("save-target",0,1e12), current=read("save-current",0,1e12), months=read("save-months",1,1200);
    if([target,current,months].some(v=>v===null)){put("save-monthly","Check inputs");return;}
    put("save-monthly",fmt(Math.max(0,target-current)/months));
  });

  bind("ef-calc", () => {
    const cost=read("ef-cost",0,1e12), months=read("ef-months",1,24), current=read("ef-current",0,1e12);
    if([cost,months,current].some(v=>v===null)){invalid(["ef-goal","ef-gap"]);return;}
    const goal=cost*months;
    put("ef-goal",fmt(goal)); put("ef-gap",fmt(Math.max(0,goal-current)));
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
    if([current,monthly,years,annual,match].some(v=>v===null)){invalid(["retirement-balance","retirement-contrib","retirement-total"]);return;}
    const months=years*12, rate=Math.pow(1+annual/100,1/12)-1, contribution=monthly*(1+match/100);
    const growth=rate===0?months:(Math.pow(1+rate,months)-1)/rate;
    const balance=current*Math.pow(1+rate,months)+contribution*growth;
    const contrib=current+contribution*months;
    if(!Number.isFinite(balance)||!Number.isFinite(contrib)){invalid(["retirement-balance","retirement-contrib","retirement-total"]);return;}
    put("retirement-balance",fmt(balance));put("retirement-contrib",fmt(contrib));put("retirement-total",fmt(balance-contrib));
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

  ["ci-calc","loan-calc","budget-calc","save-calc","ef-calc","debt-calc","mortgage-calc","auto-calc","card-calc","retirement-calc","student-calc","networth-calc"].forEach(id=>{if($(id))$(id).click();});
})();