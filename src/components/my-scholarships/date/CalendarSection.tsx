import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { useState } from 'react';

interface CalendarSectionProps {
  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;
}

const Day = (props: PickersDayProps<Dayjs>) => {
  const [lastDayList] = useState<number[]>([7, 15]);

  const { day, ...others } = props;

  const isSelected = lastDayList.includes(props.day.date());

  return (
    <PickersDay {...others} day={day}>
      {isSelected ? 's' : props.day.date()}
    </PickersDay>
  );
};

const CalendarSection = ({
  selectedDate,
  setSelectedDate,
}: CalendarSectionProps) => {
  const handleDateChange = (value: any) => {
    setSelectedDate(value.toISOString());
  };

  return (
    <section className="w-full lg:w-auto">
      <div className="rounded-2xl bg-white lg:fixed">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DateCalendar
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            slots={{ day: Day }}
          />
        </LocalizationProvider>
      </div>
      <div className="hidden w-[20rem] lg:block" />
    </section>
  );
};

export default CalendarSection;
