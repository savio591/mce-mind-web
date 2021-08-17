import { useEffect, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

export interface CalendarProps {
  availableDays?: string[];
  selectedDate: string;
  onSelectDate?: (date: string | undefined) => string | void;
  refDate: string;
}

export function Calendar({
  availableDays,
  selectedDate,
  refDate,
  onSelectDate,
}: CalendarProps): JSX.Element {
  const [selectedDatePick, setSelectedDatePick] = useState('');

  useEffect(() => {
    setSelectedDatePick(selectedDate);
  }, [selectedDate]);

  if (!selectedDate || !refDate) {
    return <h1>Falha ao renderizar calendário</h1>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleDateChange(day: Date, modifiers: DayModifiers): void {
    // if (modifiers.available) {
    setSelectedDatePick(day.toISOString());
    if (onSelectDate) {
      onSelectDate(day.toISOString());
    }
    // }
  }

  return (
    <DayPicker
      weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
      fromMonth={new Date(refDate)}
      modifiers={{
        available:
          availableDays && availableDays.length > 0
            ? availableDays?.map(day => new Date(day))
            : [new Date(refDate)],
      }}
      selectedDays={new Date(selectedDatePick)}
      onDayClick={handleDateChange}
      months={[
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ]}
    />
  );
}
