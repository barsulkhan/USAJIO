(()=>{
"use strict";
const $=id=>document.getElementById(id);
const money=(n,c)=>new Intl.NumberFormat("en-US",{style:"currency",currency:c,maximumFractionDigits:0}).format(n);
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
const ids=["rvb-rent","rvb-price","rvb-down","rvb-apr","rvb-term","rvb-stay","rvb-closing","rvb-selling","rvb-tax","rvb-insurance","rvb-maint","rvb-hoa","rvb-pmi","rvb-rent-growth","rvb-appreciation","rvb-rent-insurance"];
const result=$("rvb-results"),status=$("rvb-status");
function calc(){
 result.hidden=true;status.textContent="";
 const v=Object.fromEntries(ids.map(id=>[id,Number($(id).value)])),currency=$("rvb-currency").value;
 const valid=ids.every(id=>$(id).value.trim()!==""&&Number.isFinite(v[id]))&&
 v["rvb-rent"]>=0&&v["rvb-rent"]<=1e7&&v["rvb-price"]>0&&v["rvb-price"]<=1e9&&
 v["rvb-down"]>=0&&v["rvb-down"]<=100&&v["rvb-apr"]>=0&&v["rvb-apr"]<=30&&
 v["rvb-term"]>=1&&v["rvb-term"]<=40&&Number.isInteger(v["rvb-term"])&&
 v["rvb-stay"]>=1&&v["rvb-stay"]<=40&&Number.isInteger(v["rvb-stay"])&&
 v["rvb-closing"]>=0&&v["rvb-closing"]<=20&&v["rvb-selling"]>=0&&v["rvb-selling"]<=20&&
 v["rvb-tax"]>=0&&v["rvb-tax"]<=10&&v["rvb-insurance"]>=0&&v["rvb-maint"]>=0&&v["rvb-maint"]<=10&&
 v["rvb-hoa"]>=0&&v["rvb-pmi"]>=0&&v["rvb-pmi"]<=10&&
 v["rvb-rent-growth"]>=-20&&v["rvb-rent-growth"]<=30&&v["rvb-appreciation"]>=-20&&v["rvb-appreciation"]<=30&&v["rvb-rent-insurance"]>=0;
 if(!valid){status.textContent="Check the inputs: enter valid non-negative costs, rates within the stated ranges, and whole years from 1 to 40.";return;}
 const price=v["rvb-price"],down=price*v["rvb-down"]/100,loan=price-down,months=v["rvb-term"]*12,stay=v["rvb-stay"]*12;
 const mr=v["rvb-apr"]/1200;
 const payment=loan===0?0:mr===0?loan/months:loan*mr/(1-Math.pow(1+mr,-months));
 let balance=loan,home=price,rent=v["rvb-rent"],buyer=down+price*v["rvb-closing"]/100,renter=0,breakeven=null,finalProceeds=0;
 const rows=[];
 for(let m=1;m<=stay;m++){
  const interest=balance*mr,principal=Math.min(balance,Math.max(0,payment-interest));
  balance=round(Math.max(0,balance-principal));
  home*=Math.pow(1+v["rvb-appreciation"]/100,1/12);
  if((m-1)%12===0&&m>1)rent*=1+v["rvb-rent-growth"]/100;
  const ownerMonthly=payment+home*(v["rvb-tax"]/1200)+v["rvb-insurance"]/12+home*(v["rvb-maint"]/1200)+v["rvb-hoa"]+loan*(v["rvb-pmi"]/1200);
  buyer+=ownerMonthly;
  renter+=rent+v["rvb-rent-insurance"];
  if(m%12===0||m===stay){
   const selling=home*v["rvb-selling"]/100,proceeds=home-selling-balance;
   const buyerNet=buyer-proceeds;
   rows.push({year:Math.ceil(m/12),rent:round(renter),buy:round(buyerNet),home:round(home),balance});
   if(breakeven===null&&buyerNet<=renter)breakeven=Math.ceil(m/12);
   if(m===stay)finalProceeds=proceeds;
  }
 }
 const rentTotal=rows[rows.length-1].rent,buyTotal=rows[rows.length-1].buy,diff=round(Math.abs(rentTotal-buyTotal));
 $("rvb-rent-total").textContent=money(rentTotal,currency);
 $("rvb-buy-total").textContent=money(buyTotal,currency);
 $("rvb-proceeds").textContent=money(finalProceeds,currency);
 $("rvb-difference").textContent=money(diff,currency);
 $("rvb-verdict").textContent=buyTotal<rentTotal?"Under these assumptions, buying has the lower estimated net cost by "+money(diff,currency)+".":rentTotal<buyTotal?"Under these assumptions, renting has the lower estimated cost by "+money(diff,currency)+".":"The two options have the same estimated cost under these assumptions.";
 $("rvb-breakeven").textContent=breakeven===null?"No buying break-even is reached within the modeled stay.": "Estimated buying break-even: year "+breakeven+" (first year modeled buying net cost is no higher than renting).";
 const body=$("rvb-schedule");body.replaceChildren();
 rows.forEach(r=>{const tr=document.createElement("tr");[r.year,money(r.rent,currency),money(r.buy,currency),money(r.home,currency),money(r.balance,currency)].forEach(x=>{const td=document.createElement("td");td.textContent=String(x);tr.append(td);});body.append(tr);});
 result.hidden=false;status.textContent="Comparison calculated using your assumptions. Change an input and calculate again to refresh.";
}
$("rvb-calc").addEventListener("click",calc);
ids.concat(["rvb-currency"]).forEach(id=>$(id).addEventListener("input",()=>{result.hidden=true;status.textContent="Inputs changed. Calculate again to refresh the comparison."; }));
$("year").textContent=new Date().getFullYear();
calc();
})();