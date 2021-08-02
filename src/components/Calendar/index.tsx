import { useEffect, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';

import 'react-day-picker/lib/style.css';
import './Calendar.scss';

export interface CalendarProps {
  availableDays: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => Date;
}

export function Calendar({
  availableDays,
  selectedDate,
  onSelectDate,
}: CalendarProps): JSX.Element {
  const [selectedDatePick, setSelectedDatePick] = useState(new Date());

  useEffect(() => {
    setSelectedDatePick(new Date(selectedDate));
  }, [selectedDate]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleDateChange(day: Date, modifiers: DayModifiers): void {
    // if (modifiers.available) {
    if (onSelectDate) {
      onSelectDate(day);
      setSelectedDatePick(day);
    }
    // }
  }

  return (
    <DayPicker
      weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
      fromMonth={new Date()}
      modifiers={{ available: availableDays }}
      selectedDays={selectedDatePick}
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
