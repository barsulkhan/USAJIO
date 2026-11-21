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
    ["ci-calc","loan-calc","budget-calc","save-calc","ef-calc","debt-calc"].forEach(id => { if ($(id)) $(id).click(); });
  });

  bind("ci-calc", () => {
    const p=read("ci-principal"), m=read("ci-monthly"), r=read("ci-rate",0,100), y=read("ci-years",1,80);
    const f=Number($("ci-frequency")?.value);
    if ([p,m,r,y].some(v=>v===null) || ![1,4,12].includes(f)) { invalid(["ci-result","ci-paid","ci-interest"]); return; }
    const monthsPerPeriod=12/f, periodRate=(r/100)/f, totalMonths=y*12;
    let balance=p;
    for(let month=1;month<=totalMonths;month++){
      if(month%monthsPerPeriod===0) balance*=1+periodRate;
      balance+=m;
      if(!Number.isFinite(balance)){ invalid(["ci-result","ci-paid","ci-interest"]); return; }
    }
    const paid=p+m*totalMonths, interest=balance-paid;
    if(!Number.isFinite(paid)||!Number.isFinite(interest)){invalid(["ci-result","ci-paid","ci-interest"]);return;}
    put("ci-result",fmt(balance)); put("ci-paid",fmt(paid)); put("ci-interest",fmt(interest));
  });

  bind("loan-calc", () => {
    const p=read("loan-amount",0,1e12), annual=read("loan-rate",0,100), years=read("loan-years",1,50), extra=read("loan-extra",0,1e12);
    if([p,annual,years,extra].some(v=>v===null)||p<=0){invalid(["loan-monthly","loan-interest","loan-total"]);return;}
    const rate=annual/1200, months=Math.max(1,Math.round(years*12));
    const base=rate ? p*rate/(1-Math.pow(1+rate,-months)) : p/months;
    let balance=p, interest=0, total=0, count=0;
    while(balance>0.005 && count<600){
      const charge=balance*rate;
      const payment=Math.min(balance+charge,base+extra);
      interest+=charge; balance=Math.max(0,balance+charge-payment); total+=payment; count++;
    }
    if(balance>0.005){invalid(["loan-monthly","loan-interest","loan-total"]);return;}
    put("loan-monthly",fmt(base+extra)); put("loan-interest",fmt(interest)); put("loan-total",fmt(total));
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

  ["ci-calc","loan-calc","budget-calc","save-calc","ef-calc","debt-calc"].forEach(id=>{if($(id))$(id).click();});
})();