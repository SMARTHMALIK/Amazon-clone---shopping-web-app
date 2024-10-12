import { formatCurrency } from '../../scripts/utils/money.js';

describe('test suite : formatCurrency', ()=>{
  it('converts paise to ruppees', ()=>{
    expect(formatCurrency(29900)).toEqual('299.00');
  });
  it('works with zero', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it('rounds up to the nearest ruppees', ()=>{
    expect(formatCurrency(49800.5)).toEqual('498.01');
    expect(formatCurrency(20000.4)).toEqual('200.00');
  });
  it('works with negative numbers',()=>{
    expect(formatCurrency(-20000)).toEqual('-200.00');
  });
});