import expect = require('expect');

import { isRealString } from './validation';

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let test = isRealString(1234);
    expect(test).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    let test = isRealString('      ');
    expect(test).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    let test = isRealString('  ACME ');
    expect(test).toBe(true);
  });
})