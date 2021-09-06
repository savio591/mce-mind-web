type WeekDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export const parseWeekDayName: (weekDay: WeekDay) => string = weekDay => {
  switch (weekDay) {
    case 'sunday':
      return 'DOMINGO';
    case 'monday':
      return 'SEGUNDA';
    case 'tuesday':
      return 'TERÇA';
    case 'wednesday':
      return 'QUARTA';
    case 'thursday':
      return 'QUINTA';
    case 'friday':
      return 'SEXTA';
    case 'saturday':
      return 'SÁBADO';
    default:
      return '?';
  }
};
