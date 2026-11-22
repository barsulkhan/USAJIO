(()=>{
"use strict";
const $=id=>document.getElementById(id);
const fmt=(n,c)=>new Intl.NumberFormat("en-US",{style:"currency",currency:c,maximumFractionDigits:2}).format(n);
const cents=n=>Math.round((n+Number.EPSILON)*100)/100;
const results=$("ccmp-results"), scheduleWrap=$("ccmp-schedule-wrap"), status=$("ccmp-status");
const reset=()=>{results.hidden=true;scheduleWrap.hidden=true;$("ccmp-schedule").replaceChildren();};
const calculate=()=>{
 reset();status.textContent="";
 const balance=Number($("ccmp-balance").value),apr=Number($("ccmp-apr").value),percent=Number($("ccmp-percent").value),floor=Number($("ccmp-floor").value),currency=$("ccmp-currency").value;
 const valid=(Number.isFinite(balance)&&balance>=0&&balance<=1e11&&Number.isFinite(apr)&&apr>=0&&apr<=100&&Number.isFinite(percent)&&percent>0&&percent<=100&&Number.isFinite(floor)&&floor>=0&&floor<=1e11);
 [$("ccmp-balance"),$("ccmp-apr"),$("ccmp-percent"),$("ccmp-floor")].forEach(el=>el.setAttribute("aria-invalid",String(!Number.isFinite(Number(el.value))||el.value.trim()==="")));
 if(!valid){status.textContent="Enter a balance and floor of 0 or more, an APR from 0% to 100%, and a minimum rate above 0% and up to 100%.";return;}
 if(balance===0){$("ccmp-months").textContent="0 months";$("ccmp-first").textContent=fmt(0,currency);$("ccmp-interest").textContent=fmt(0,currency);$("ccmp-total").textContent=fmt(0,currency);results.hidden=false;status.textContent="No balance is currently owed.";return;}
 let remaining=cents(balance),interestTotal=0,paidTotal=0,months=0,first=0;const rows=[];
 while(remaining>0.005&&months<1200){
  const opening=remaining,interest=cents(opening*(apr/1200)),due=cents(opening+interest);
  const payment=cents(Math.min(due,Math.max(cents(due*percent/100),floor)));
  if(months===0)first=payment;
  if(payment<=interest+0.004&&remaining>0){status.textContent="This minimum-payment rule does not reduce the balance. Increase the percentage or floor to model a payment that covers interest.";return;}
  remaining=cents(Math.max(0,due-payment));interestTotal=cents(interestTotal+interest);paidTotal=cents(paidTotal+payment);months++;
  if(rows.length<12)rows.push({month:months,opening,interest,payment,remaining});
 }
 if(remaining>0.005){status.textContent="This plan takes longer than 1,200 months (100 years) under the selected assumptions. No precise payoff time is shown.";return;}
 $("ccmp-months").textContent=months+" months";
 $("ccmp-first").textContent=fmt(first,currency);
 $("ccmp-interest").textContent=fmt(interestTotal,currency);
 $("ccmp-total").textContent=fmt(paidTotal,currency);
 const body=$("ccmp-schedule");
 rows.forEach(row=>{const tr=document.createElement("tr");[row.month,fmt(row.opening,currency),fmt(row.interest,currency),fmt(row.payment,currency),fmt(row.remaining,currency)].forEach(value=>{const td=document.createElement("td");td.textContent=String(value);tr.append(td);});body.append(tr);});
 results.hidden=false;scheduleWrap.hidden=false;status.textContent="Estimate complete. Your entered minimum-payment percentage and floor are applied each month.";
};
$("ccmp-calc").addEventListener("click",calculate);
["ccmp-balance","ccmp-apr","ccmp-percent","ccmp-floor","ccmp-currency"].forEach(id=>$(id).addEventListener("input",()=>{reset();status.textContent="Inputs changed. Calculate again to refresh the estimate."; }));
$("year").textContent=new Date().getFullYear();
calculate();
})();