import {formatCurrency} from '../money.js'

console.log('test suite: formatCurrency');

console.log('converts paise into ruppees');
if(formatCurrency(29900) === '299.00'){
  console.log('passed');
}
else {
  console.log('failed');
}
console.log('works with 0');
if(formatCurrency(0) === '0.00'){
  console.log('passed');
}
else {
  console.log('failed');
}
console.log('rounds up to the nearest ruppees');
if(formatCurrency(49800.5) === '498.01'){
  console.log('passed');
}
else{
  console.log('failed');
}