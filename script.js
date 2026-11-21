(()=> {
  const $ = id => document.getElementById(id);
  const currency = () => $("currency").value;
  const fmt = value => new Intl.NumberFormat("en-US", {
    style: "currency", currency: currency(), maximumFractionDigits: 2
  }).format(Number.isFinite(value) ? value : 0);
  const put = (id, value) => { if ($(id)) $(id).textContent = value; };
  const groups = {
    ci: ["ci-principal","ci-monthly","ci-rate","ci-years"],
    loan: ["loan-amount","loan-rate","loan-years","loan-extra"],
    budget: ["budget-income","budget-housing","budget-food","budget-transport","budget-bills","budget-other"],
    save: ["save-target","save-current","save-months"],
    ef: ["ef-cost","ef-months","ef-current"],
    debt: ["debt-balance","debt-rate","debt-payment"]
  };
  const errors = {};
  Object.entries(groups).forEach(([key, ids]) => {
    const button = $(({ci:"ci-calc",loan:"loan-calc",budget:"budget-calc",save:"save-calc",ef:"ef-calc",debt:"debt-calc"})[key]);
    const message = document.createElement("p");
    message.className = "calc-error";
    message.id = key + "-error";
    message.setAttribute("role","alert");
    message.setAttribute("aria-live","polite");
    message.hidden = true;
    button.insertAdjacentElement("afterend", message);
    errors[key] = message;
    ids.forEach(id => $(id).addEventListener("input", () => {
      $(id).removeAttribute("aria-invalid");
      message.hidden = true;
      message.textContent = "";
    }));
  });
  function run(key, rules, calculate) {
    const ids = groups[key];
    errors[key].hidden = true;
    errors[key].textContent = "";
    const values = {};
    for (const [id, rule] of Object.entries(rules)) {
      const field = $(id);
      const raw = field.value.trim();
      const value = raw === "" ? NaN : Number(raw);
      const valid = Number.isFinite(value) &&
        value >= rule.min && value <= rule.max &&
        (!rule.integer || Number.isInteger(value));
      if (!valid) {
        field.setAttribute("aria-invalid","true");
        errors[key].textContent = rule.message ||
          `Enter a valid ${rule.label} (${rule.min} to ${rule.max}).`;
        errors[key].hidden = false;
        field.focus();
        return;
      }
      field.removeAttribute("aria-invalid");
      values[id] = value;
    }
    calculate(values);
  }
  $("year").textContent = new Date().getFullYear();
  $("currency").addEventListener("change", () => {
    Object.values(groups).forEach((ids, index) => {
      const keys = ["ci","loan","budget","save","ef","debt"];
      const buttonIds = ["ci-calc","loan-calc","budget-calc","save-calc","ef-calc","debt-calc"];
      $(buttonIds[index]).click();
    });
  });
  $("ci-calc").onclick = () => run("ci", {
    "ci-principal":{min:0,max:1e9,label:"starting amount"},
    "ci-monthly":{min:0,max:1e7,label:"monthly contribution"},
    "ci-rate":{min:0,max:100,label:"annual interest rate"},
    "ci-years":{min:1,max:80,integer:true,label:"number of years"}
  }, v => {
    const p=v["ci-principal"], monthly=v["ci-monthly"], annual=v["ci-rate"]/100;
    const years=v["ci-years"], frequency=Number($("ci-frequency").value);
    if (![1,4,12].includes(frequency)) {
      errors.ci.textContent="Choose a valid compounding frequency.";
      errors.ci.hidden=false;
      return;
    }
    const periods=years*frequency, periodRate=annual/frequency;
    const contribution=monthly*12/frequency;
    let balance=p;
    for(let i=0;i<periods;i++) balance=balance*(1+periodRate)+contribution;
    const paid=p+monthly*12*years;
    put("ci-result",fmt(balance));
    put("ci-paid",fmt(paid));
    put("ci-interest",fmt(balance-paid));
  });
  $("loan-calc").onclick = () => run("loan", {
    "loan-amount":{min:0,max:1e9,label:"loan amount"},
    "loan-rate":{min:0,max:100,label:"annual interest rate"},
    "loan-years":{min:1,max:50,integer:true,label:"loan term"},
    "loan-extra":{min:0,max:1e8,label:"extra monthly payment"}
  }, v => {
    const p=v["loan-amount"], rate=v["loan-rate"]/1200;
    const months=v["loan-years"]*12, extra=v["loan-extra"];
    if (p===0) {
      put("loan-monthly",fmt(0)); put("loan-interest",fmt(0)); put("loan-total",fmt(0));
      return;
    }
    const base=rate ? p*rate/(1-Math.pow(1+rate,-months)) : p/months;
    let balance=p, interest=0, total=0, count=0;
    while(balance>0.005 && count<months) {
      const charge=balance*rate;
      interest+=charge;
      const payment=Math.min(balance+charge,base+extra);
      balance=Math.max(0,balance+charge-payment);
      total+=payment;
      count++;
    }
    put("loan-monthly",fmt(base+extra));
    put("loan-interest",fmt(interest));
    put("loan-total",fmt(total));
  });
  $("budget-calc").onclick = () => run("budget", Object.fromEntries(groups.budget.map(id=>[id,{min:0,max:1e9,label:id.replace("budget-","").replace("-"," ")}])), v => {
    const income=v["budget-income"];
    const expenses=groups.budget.slice(1).reduce((sum,id)=>sum+v[id],0);
    const remaining=income-expenses;
    put("budget-expenses",fmt(expenses));
    put("budget-remaining",fmt(remaining));
    put("budget-share",income ? (remaining/income*100).toFixed(1)+"%" : "—");
  });
  $("save-calc").onclick = () => run("save", {
    "save-target":{min:0,max:1e9,label:"target amount"},
    "save-current":{min:0,max:1e9,label:"current savings"},
    "save-months":{min:1,max:600,integer:true,label:"number of months"}
  }, v => {
    const gap=Math.max(0,v["save-target"]-v["save-current"]);
    put("save-monthly",fmt(gap/v["save-months"]));
  });
  $("ef-calc").onclick = () => run("ef", {
    "ef-cost":{min:0,max:1e9,label:"essential monthly costs"},
    "ef-months":{min:1,max:24,integer:true,label:"months of cover"},
    "ef-current":{min:0,max:1e9,label:"current emergency savings"}
  }, v => {
    const goal=v["ef-cost"]*v["ef-months"];
    put("ef-goal",fmt(goal));
    put("ef-gap",fmt(Math.max(0,goal-v["ef-current"])));
  });
  $("debt-calc").onclick = () => run("debt", {
    "debt-balance":{min:0,max:1e9,label:"debt balance"},
    "debt-rate":{min:0,max:100,label:"annual interest rate"},
    "debt-payment":{min:1,max:1e8,label:"monthly payment"}
  }, v => {
    let balance=v["debt-balance"], rate=v["debt-rate"]/1200;
    const payment=v["debt-payment"];
    if(balance===0) {
      put("debt-months","0 months"); put("debt-interest",fmt(0));
      return;
    }
    if(rate>0 && payment<=balance*rate) {
      errors.debt.textContent="Payment must be greater than the first month's interest.";
      errors.debt.hidden=false;
      put("debt-months","—"); put("debt-interest","—");
      return;
    }
    let interest=0, months=0;
    while(balance>0.005 && months<1200) {
      const charge=balance*rate;
      interest+=charge;
      balance=Math.max(0,balance+charge-payment);
      months++;
    }
    put("debt-months",months>=1200?"Over 100 years":months+" months");
    put("debt-interest",fmt(interest));
  });
  ["ci-calc","loan-calc","budget-calc","save-calc","ef-calc","debt-calc"].forEach(id=>$(id).click());
})();