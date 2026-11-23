(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const entries = $('cf-entries');
  const form = $('cf-form');
  const status = $('cf-status');
  const results = $('cf-results');
  const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:$('cf-currency').value,maximumFractionDigits:2}).format(value);
  const isoToday = () => { const d=new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'); };
  $('cf-start-date').value = isoToday();
  const dateFromIso = value => { const [y,m,d]=value.split('-').map(Number); return new Date(Date.UTC(y,m-1,d)); };
  const isoFromDate = d => [d.getUTCFullYear(),String(d.getUTCMonth()+1).padStart(2,'0'),String(d.getUTCDate()).padStart(2,'0')].join('-');
  const addDays = (date,n) => { const d=new Date(date); d.setUTCDate(d.getUTCDate()+n); return d; };
  const addMonthClamped = (date,anchorDay) => { const y=date.getUTCFullYear(),m=date.getUTCMonth(); const first=new Date(Date.UTC(y,m+1,1)); const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate(); return new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth(),Math.min(anchorDay,last))); };
  const field = (label,type,value,options) => {
    const wrap=document.createElement('label'); wrap.append(document.createTextNode(label));
    let input;
    if(type==='select'){input=document.createElement('select'); options.forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;input.append(o);});}
    else {input=document.createElement('input');input.type=type;if(type==='number'){input.min='0';input.step='0.01';input.inputMode='decimal';}}
    input.value=value; wrap.append(input); return {wrap,input};
  };
  let nextId=0;
  const addEntry = (kind='expense', preset={}) => {
    const row=document.createElement('div'); row.className='cf-entry'; row.dataset.entryId=String(++nextId);
    const name=field('Description','text',preset.name||(kind==='income'?'Paycheck':'Rent or bill'));
    name.input.maxLength=60; name.input.required=true; name.input.setAttribute('aria-label','Entry description');
    const type=field('Type','select',kind,[['income','Income'],['expense','Expense']]);
    type.input.setAttribute('aria-label','Entry type');
    const amount=field('Amount','number',preset.amount||'100'); amount.input.required=true; amount.input.setAttribute('aria-label','Entry amount');
    const date=field('Next date','date',preset.date||$('cf-start-date').value); date.input.required=true; date.input.setAttribute('aria-label','Next expected date');
    const frequency=field('Repeats','select',preset.frequency||'monthly',[['once','One time'],['weekly','Weekly'],['biweekly','Every 2 weeks'],['monthly','Monthly']]); frequency.input.setAttribute('aria-label','Repeat frequency');
    const remove=document.createElement('button'); remove.type='button'; remove.textContent='Remove'; remove.setAttribute('aria-label','Remove '+(preset.name||kind)+' entry'); remove.addEventListener('click',()=>{row.remove();invalidate();});
    [name,type,amount,date,frequency].forEach(x=>row.append(x.wrap)); row.append(remove); entries.append(row);
  };
  $('cf-add-income').addEventListener('click',()=>{addEntry('income');invalidate();});
  $('cf-add-expense').addEventListener('click',()=>{addEntry('expense');invalidate();});
  addEntry('income',{name:'Paycheck',amount:'1800',frequency:'biweekly'});
  addEntry('expense',{name:'Rent',amount:'950',frequency:'monthly'});
  addEntry('expense',{name:'Groceries',amount:'120',frequency:'weekly'});
  const setStatus=(message,error=false)=>{status.textContent=message;status.classList.toggle('error',error);};
  const invalidate=()=>{if(!results.hidden){results.hidden=true;setStatus('Inputs changed. Project cash flow again to refresh the forecast.');}};
  const readEntries = start => {
    const rows=[...entries.querySelectorAll('.cf-entry')];
    if(!rows.length) throw new Error('Add at least one income or expense item.');
    return rows.map((row,i)=>{
      const inputs=[...row.querySelectorAll('input,select')];
      const [name,type,amount,date,frequency]=inputs;
      const value=Number(amount.value);
      if(!name.value.trim()) throw new Error('Entry '+(i+1)+': add a description.');
      if(!Number.isFinite(value)||value<=0) throw new Error('Entry '+(i+1)+': amount must be greater than zero.');
      if(!date.value) throw new Error('Entry '+(i+1)+': choose a date.');
      const when=dateFromIso(date.value);
      if(Number.isNaN(when.getTime())||when<start) throw new Error('Entry '+(i+1)+': date must be on or after the forecast start.');
      return {name:name.value.trim(),type:type.value,amount:Math.round(value*100)/100,date:when,frequency:frequency.value};
    });
  };
  const project = () => {
    const startValue=$('cf-start-date').value;
    if(!startValue) throw new Error('Choose a forecast start date.');
    const start=dateFromIso(startValue);
    const balanceInput=$('cf-start-balance').value.trim();
    if(!balanceInput) throw new Error('Enter a starting balance.');
    const startBalance=Number(balanceInput);
    const weeks=Number($('cf-weeks').value);
    if(!Number.isFinite(startBalance)||startBalance<0) throw new Error('Starting balance must be zero or greater.');
    if(![4,8,13].includes(weeks)) throw new Error('Choose a forecast length of 4, 8 or 13 weeks.');
    const items=readEntries(start);
    const days=weeks*7, end=addDays(start,days-1), byDay=new Map();
    for(const item of items){
      let date=new Date(item.date), guard=0;
      while(date<=end && guard++<400){
        const key=isoFromDate(date);
        if(!byDay.has(key)) byDay.set(key,[]);
        byDay.get(key).push(item);
        if(item.frequency==='once') break;
        if(item.frequency==='weekly') date=addDays(date,7);
        else if(item.frequency==='biweekly') date=addDays(date,14);
        else date=addMonthClamped(date,item.date.getUTCDate());
      }
    }
    let balance=Math.round(startBalance*100)/100, lowest=balance, shortfallWeeks=0;
    const rows=[];
    for(let week=0;week<weeks;week++){
      let inflow=0,outflow=0,weekLow=balance;
      for(let day=0;day<7;day++){
        const date=addDays(start,week*7+day), events=byDay.get(isoFromDate(date))||[];
        for(const item of events){if(item.type==='income') inflow+=item.amount;else outflow+=item.amount;}
        balance=Math.round((balance+events.reduce((sum,item)=>sum+(item.type==='income'?item.amount:-item.amount),0))*100)/100;
        lowest=Math.min(lowest,balance);weekLow=Math.min(weekLow,balance);
      }
      if(weekLow<0) shortfallWeeks++;
      rows.push({week:week+1,start:addDays(start,week*7),end:addDays(start,week*7+6),inflow:Math.round(inflow*100)/100,outflow:Math.round(outflow*100)/100,balance});
    }
    return {rows,balance,lowest,shortfallWeeks};
  };
  const formatDate=d=>new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',timeZone:'UTC'}).format(d);
  const render = data => {
    $('cf-ending').textContent=money(data.balance);
    $('cf-lowest').textContent=money(data.lowest);
    $('cf-shortfall-count').textContent=String(data.shortfallWeeks);
    const body=$('cf-schedule'); body.replaceChildren();
    data.rows.forEach(row=>{
      const tr=document.createElement('tr');
      const values=[ 'Week '+row.week+' · '+formatDate(row.start)+'–'+formatDate(row.end), money(row.inflow), money(row.outflow), money(row.balance) ];
      values.forEach((value,index)=>{const td=document.createElement('td');td.textContent=value;if(index===3)td.className=row.balance<0?'cf-negative':'cf-positive';tr.append(td);});
      body.append(tr);
    });
    results.hidden=false;
    const warning=data.shortfallWeeks? ' Potential shortfall: '+data.shortfallWeeks+' week(s) have a negative daily balance.':' No negative daily balance is projected.';
    setStatus('Forecast calculated for '+data.rows.length+' weeks.'+warning,data.shortfallWeeks>0);
  };
  form.addEventListener('submit',event=>{event.preventDefault();results.hidden=true;try{render(project());}catch(error){setStatus(error.message,true);}});
  $('cf-currency').addEventListener('change',()=>{if(!results.hidden){try{render(project());}catch(error){setStatus(error.message,true);}}});
  $('cf-start-date').addEventListener('change',()=>{entries.querySelectorAll('input[type="date"]').forEach(input=>{if(input.value<=$('cf-start-date').value)input.value=$('cf-start-date').value;});});
  entries.addEventListener('input',()=>{if(!results.hidden){results.hidden=true;setStatus('Inputs changed. Project cash flow again to refresh the forecast.');}});
  entries.addEventListener('change',()=>{if(!results.hidden){results.hidden=true;setStatus('Inputs changed. Project cash flow again to refresh the forecast.');}});
  $('cf-start-balance').addEventListener('input',()=>{if(!results.hidden){results.hidden=true;setStatus('Inputs changed. Project cash flow again to refresh the forecast.');}});
  $('cf-start-date').addEventListener('input',()=>{if(!results.hidden){results.hidden=true;setStatus('Inputs changed. Project cash flow again to refresh the forecast.');}});
  $('cf-weeks').addEventListener('change',()=>{if(!results.hidden){results.hidden=true;setStatus('Inputs changed. Project cash flow again to refresh the forecast.');}});
})();
