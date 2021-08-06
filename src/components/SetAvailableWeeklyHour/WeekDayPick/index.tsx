import { useEffect, useState } from 'react';

import { parseWeekDayName } from '../../../utils/parseWeekDayName';

import styles from './WeekDayPick.module.scss';

type WeekDay =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface WeekDayData {
  isAvailable: boolean;
}

export interface WeekDayParent {
  weekDay: WeekDay;
  isAvailable: boolean;
}

export interface WeekDayPickProps {
  weekDay: WeekDay;
  weekData: WeekDayData;
  setWeekData: (weekDay: WeekDay, data: WeekDayData) => void;
}

export function WeekDayPick({
  weekDay,
  weekData,
  setWeekData,
}: WeekDayPickProps): JSX.Element {
  const [isAvailable, setIsAvailable] = useState<boolean>(
    weekData?.isAvailable ?? false
  );

  // Sends component state to Parent on change their values.
  useEffect(() => {
    setWeekData(weekDay, { isAvailable });
  }, [isAvailable, setWeekData, weekDay]);

  function handleIsAvailableCheckbox(checked: boolean): void {
    setIsAvailable(checked);
  }

  const weekDayName = parseWeekDayName(weekDay);

  return (
    <li className={styles.content}>
      <p>{weekDayName}</p>
      {isAvailable ? (
        <div className={styles.hourPicker}>
          <p>9:00</p>
          <span>-</span>
          <p>17:00</p>
        </div>
      ) : (
        <span data-not-available>Não disponível</span>
      )}
      <input
        type="checkbox"
        name="isAvailable"
        id="isAvailable"
        checked={isAvailable}
        onChange={event =>
          handleIsAvailableCheckbox(event.currentTarget.checked)
        }
      />
    </li>
  );
}

// FEATURES JUNKYARD:

// import { parseDateTimeToStringDateInput } from '../../../utils/parseDateTimeToStringDateInput';

// export interface WeekDayData {
//   weekDay: WeekDay;
//   isAvailable: boolean;
// startDate: Date;
// startDateParsed: string;
// endDate: Date;
// endDateParsed: string;
// }

// export interface WeekDayParent {
//   isAvailable: boolean;
// startDate?: Date;
// endDate?: Date;
// }

// const fallbackDate = new Date(0, 0, 0, 11, 0, 0);
// const fallbackEndDate = new Date(0, 0, 0, 20, 0, 0);

// const [weekDayData, setWeekDayData] = useState<WeekDayData>({
//   ...weekData,
// weekDay,
// startDateParsed: parseDateTimeToStringDateInput(
//   weekData?.startDate ?? fallbackDate
// ),
// endDateParsed: parseDateTimeToStringDateInput(
//   weekData?.endDate ?? fallbackEndDate
// ),
// } as WeekDayData);

// function handleSetStartDate(date: Date): void {
//   setWeekDayData({
//     ...weekDayData,
//     startDate: date,
//     startDateParsed: parseDateTimeToStringDateInput(date),
//   });
// }

// function handleSetEndDate(date: Date): void {
//   setWeekDayData({
//     ...weekDayData,
//     endDate: date,
//     endDateParsed: parseDateTimeToStringDateInput(date),
//   });
// }
