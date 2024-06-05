import { useSearchParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import DayItem from './DayItem';

interface CalendarSectionProps {
  selectedDate: string;
}

const CalendarSection = ({ selectedDate }: CalendarSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDateChange = (value: any) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('date', value.format('YYYY-MM-DD'));
    setSearchParams(newSearchParams);
  };

  return (
    <section className="w-full lg:w-auto">
      <div className="rounded-2xl bg-white lg:fixed">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DateCalendar
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
            slots={{ day: DayItem }}
          />
        </LocalizationProvider>
      </div>
      <div className="hidden w-[20rem] lg:block" />
    </section>
  );
};

export default CalendarSection;
