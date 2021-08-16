import { format, formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Timeday = string;

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseDateToDateHeadingDateInfo(
  date: Date,
  refDate: Date
): string {
  // timeDay(Significação do dia relativo à hoje) => 'Hoje' | 'Amanhã'
  function timeDay(): string {
    const timeday: Timeday = capitalizeFirstLetter(
      formatRelative(date, refDate, { locale: ptBR }).split(' ').shift() ??
        'none'
    ) as Timeday;

    switch (timeday) {
      case 'Hoje': {
        return `${timeday} | `;
      }
      case 'Amanhã': {
        return `${timeday} | `;
      }
      case 'Ontem': {
        return `${timeday} | `;
      }
      default: {
        return '';
      }
    }
  }
  // 'Hoje | '

  function weekDay(): string {
    return capitalizeFirstLetter(
      format(date, 'eeee | dd/MM/yyyy', {
        locale: ptBR,
      }) /* 'Segunda-feira | 28/08/2012' */
    );
  }

  return `${timeDay()}${weekDay()}`;
  // Hoje | Segunda-feira | 28/08/2012
}

export function parseISOStringToHeadingDateInfo(
  date: string | undefined,
  refDate: string | undefined
): string | undefined {
  if (
    date === undefined ||
    date.length !== 24 ||
    refDate === undefined ||
    refDate.length !== 24
  ) {
    return undefined;
  }

  // timeDay(Significação do dia relativo à hoje) => 'Hoje' | 'Amanhã'
  function timeDay(): string {
    const timeday: Timeday = capitalizeFirstLetter(
      formatRelative(new Date(date ?? ''), new Date(refDate ?? ''), {
        locale: ptBR,
      })
        .split(' ')
        .shift() ?? 'none'
    ) as Timeday;

    switch (timeday) {
      case 'Hoje': {
        return `${timeday} | `;
      }
      case 'Amanhã': {
        return `${timeday} | `;
      }
      case 'Ontem': {
        return `${timeday} | `;
      }
      default: {
        return '';
      }
    }
  }
  // 'Hoje | '

  function weekDay(): string {
    return capitalizeFirstLetter(
      format(new Date(date ?? ''), 'eeee | dd/MM/yyyy', {
        locale: ptBR,
      }) /* 'Segunda-feira | 28/08/2012' */
    );
  }

  return `${timeDay()}${weekDay()}`;
  // Hoje | Segunda-feira | 28/08/2012
}
