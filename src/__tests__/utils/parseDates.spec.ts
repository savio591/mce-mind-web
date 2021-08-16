import {
  parseDateToDateHeadingDateInfo,
  parseISOStringToHeadingDateInfo,
} from '../../utils/parseDates';

describe('Date heading parser', () => {
  const refDate = new Date(2021, 7, 13);
  const yesterday = new Date(2021, 7, 12);
  const today = new Date(2021, 7, 13);
  const tomorrow = new Date(2021, 7, 14);
  const distant = new Date(2021, 7, 30);

  it('Should be able to display the heading with today date', () => {
    const heading = parseDateToDateHeadingDateInfo(today, refDate);
    expect(heading).toBe('Hoje | Sexta-feira | 13/08/2021');
  });

  it('Should be able to display the heading with tomorrow date', () => {
    const heading = parseDateToDateHeadingDateInfo(tomorrow, refDate);
    expect(heading).toContain('Sábado | 14/08/2021');
  });

  it('Should be able to display the heading with yesterday date', () => {
    const heading = parseDateToDateHeadingDateInfo(yesterday, refDate);
    expect(heading).toContain('Ontem | Quinta-feira | 12/08/2021');
  });

  it('Should be able to display the heading with distant date', () => {
    const heading = parseDateToDateHeadingDateInfo(distant, refDate);
    expect(heading).toContain('Segunda-feira | 30/08/2021');
  });
});

describe('ISO Date String to heading parser', () => {
  const refDate = '2021-08-10T03:00:00.000Z';
  const yesterday = '2021-08-09T03:00:00.000Z';
  const today = '2021-08-10T03:00:00.000Z';
  const tomorrow = '2021-08-11T03:00:00.000Z';
  const distant = '2021-08-15T03:00:00.000Z';

  it('Should be able to display the heading with today date', () => {
    const heading = parseISOStringToHeadingDateInfo(today, refDate);
    expect(heading).toBe('Hoje | Terça-feira | 10/08/2021');
  });

  it('Should be able to display the heading with tomorrow date', () => {
    const heading = parseISOStringToHeadingDateInfo(tomorrow, refDate);
    expect(heading).toBe('Amanhã | Quarta-feira | 11/08/2021');
  });

  it('Should be able to display the heading with yesterday date', () => {
    const heading = parseISOStringToHeadingDateInfo(yesterday, refDate);
    expect(heading).toContain('Ontem | Segunda-feira | 09/08/2021');
  });

  it('Should be able to display the heading with distant date', () => {
    const heading = parseISOStringToHeadingDateInfo(distant, refDate);
    expect(heading).toContain('Domingo | 15/08/2021');
  });

  it('Should be able to return undefined if date is undefined', () => {
    const heading = parseISOStringToHeadingDateInfo(undefined, undefined);
    expect(heading).toBe(undefined);
  });

  it('Should be able to return undefined if date is invalid', () => {
    const heading = parseISOStringToHeadingDateInfo(
      '2021-10-20-1000',
      '2021-10-20-1210'
    );
    expect(heading).toBe(undefined);
  });
});
