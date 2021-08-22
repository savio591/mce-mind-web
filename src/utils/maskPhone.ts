export function maskPhone(input: string, lastInput?: string): string {
  const inputReplace = (): string => {
    // r = Data to be replaced
    let r = input.replace(/\D/g, '');
    r = r.replace(/^0/, '');
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else {
      r = r.replace(/^(\d*)/, '($1');
    }
    return r;
  };

  const maskedInput = inputReplace();

  if (maskedInput !== lastInput) {
    return maskedInput;
  }
  // else
  return input;
}
