(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const money = (value, currency) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency, maximumFractionDigits: 2
  }).format(value);
  const payment = (principal, annualRate, months) => {
    const rate = annualRate / 1200;
    if (rate === 0) return principal / months;
    return principal * rate / (1 - Math.pow(1 + rate, -months));
  };
  const schedule = (principal, annualRate, months) => {
    const monthlyRate = annualRate / 1200;
    const scheduledPayment = Math.round(payment(principal, annualRate, months) * 100) / 100;
    let balance = Math.round(principal * 100) / 100;
    let totalInterest = 0;
    const years = [];
    for (let month = 1; month <= months && balance > 0; month++) {
      const interest = Math.round(balance * monthlyRate * 100) / 100;
      const principalPaid = Math.min(balance, Math.max(0, scheduledPayment - interest));
      const actualPayment = Math.min(balance + interest, scheduledPayment);
      balance = Math.max(0, Math.round((balance - principalPaid) * 100) / 100);
      totalInterest = Math.round((totalInterest + interest) * 100) / 100;
      const yearIndex = Math.ceil(month / 12) - 1;
      if (!years[yearIndex]) years[yearIndex] = {year:yearIndex+1, interest:0, balance:0};
      years[yearIndex].interest = Math.round((years[yearIndex].interest + interest) * 100) / 100;
      years[yearIndex].balance = balance;
      if (actualPayment <= 0) break;
    }
    return {payment:scheduledPayment,totalInterest,years};
  };
  const inputs = ['refi-balance','refi-current-rate','refi-current-term','refi-new-rate','refi-new-term','refi-costs'];
  const read = id => Number($(id).value);
  const showStatus = message => { $('refi-status').textContent = message; };
  $('refi-calc').addEventListener('click', () => {
    const [balance,currentRate,currentYears,newRate,newYears,closingCosts] = inputs.map(read);
    if (!inputs.every(id => $(id).value.trim() !== '' && Number.isFinite(read(id)))) {
      $('refi-results').hidden = true; showStatus('Enter a valid number in every field.'); return;
    }
    if (balance <= 0 || balance > 100000000 || currentRate < 0 || currentRate > 30 || newRate < 0 || newRate > 30 ||
        currentYears < 1 || currentYears > 40 || newYears < 1 || newYears > 40 || closingCosts < 0 || closingCosts > 10000000) {
      $('refi-results').hidden = true; showStatus('Check the balance, rates, terms and closing costs. Values must be within the displayed limits.'); return;
    }
    const currency = $('refi-currency').value;
    const oldLoan = schedule(balance,currentRate,Math.round(currentYears*12));
    const newLoan = schedule(balance,newRate,Math.round(newYears*12));
    const monthlySavings = Math.round((oldLoan.payment-newLoan.payment)*100)/100;
    const breakEven = monthlySavings > 0 ? closingCosts/monthlySavings : null;
    const netSavings = Math.round((oldLoan.totalInterest-newLoan.totalInterest-closingCosts)*100)/100;
    $('refi-old-payment').textContent = money(oldLoan.payment,currency);
    $('refi-new-payment').textContent = money(newLoan.payment,currency);
    $('refi-monthly-change').textContent = (monthlySavings >= 0 ? '+' : '−') + money(Math.abs(monthlySavings),currency);
    $('refi-breakeven').textContent = breakEven === null ? 'No payment break-even' : (breakEven/12).toFixed(1)+' years ('+Math.ceil(breakEven)+' months)';
    $('refi-net-savings').textContent = (netSavings >= 0 ? '+' : '−') + money(Math.abs(netSavings),currency);
    const notes = [];
    notes.push(monthlySavings > 0
      ? 'The new payment is estimated to be '+money(monthlySavings,currency)+' lower each month.'
      : monthlySavings < 0
        ? 'The new payment is estimated to be '+money(Math.abs(monthlySavings),currency)+' higher each month; a payment-based break-even is not reached.'
        : 'The estimated monthly payments are the same; upfront costs are not recovered through monthly payment reductions.');
    notes.push(netSavings >= 0
      ? 'Across each loan’s full modeled term, estimated interest savings after closing costs are '+money(netSavings,currency)+'.'
      : 'Across each loan’s full modeled term, the new scenario costs about '+money(Math.abs(netSavings),currency)+' more in interest after closing costs.');
    if (breakEven !== null) notes.push('If you expect to keep the home beyond the estimated break-even period, compare this result with your actual Loan Estimate and plans.');
    $('refi-verdict').textContent = notes.join(' ');
    const rows = [];
    const years = Math.max(oldLoan.years.length,newLoan.years.length);
    for (let i=0;i<years;i++) {
      const oldYear=oldLoan.years[i], newYear=newLoan.years[i];
      rows.push('<tr><th scope="row">'+(i+1)+'</th><td>'+money(oldYear ? (i===0?balance:oldLoan.years[i-1]?.balance||0) : 0,currency)+'</td><td>'+money(oldYear?.interest||0,currency)+'</td><td>'+money(newYear ? (i===0?balance:newLoan.years[i-1]?.balance||0) : 0,currency)+'</td><td>'+money(newYear?.interest||0,currency)+'</td></tr>');
    }
    $('refi-schedule').innerHTML = rows.join('');
    $('refi-results').hidden = false;
    showStatus('Comparison updated. These are estimates based on the assumptions entered.');
  });
  $('refi-calc').click();
})();