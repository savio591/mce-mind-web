import { maskPhone } from '../../utils/maskPhone';

describe('Phone Masking', () => {
  const completeNumber = '96991123620';
  const incompleteNumber = '969';
  const incompleteAfterHyphenNumber = '96991123';

  it('Utility should be able to mask a complete Brazilian number on string', () => {
    expect(maskPhone(completeNumber)).toBe('(96) 99112-3620');
  });

  it('Utility should be able to mask a incomplete Brazilian number on string', () => {
    expect(maskPhone(incompleteNumber)).toBe('(96) 9');
  });

  it('Utility should be able to mask a incomplete Brazilian(but after hyphen) number on string', () => {
    expect(maskPhone(incompleteAfterHyphenNumber)).toBe('(96) 9911-23');
  });
});
