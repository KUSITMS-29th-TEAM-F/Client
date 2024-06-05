import clsx from 'clsx';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import axios from '../../../api/axios';

const DayItem = (props: PickersDayProps<Dayjs>) => {
  const { day, outsideCurrentMonth, ...others } = props;

  const [isOutdated, setIsOutdated] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useQuery({
    queryKey: [
      'announcements',
      'calandar',
      day.year(),
      day.month() + 1,
      day.date(),
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/announcements/calandar/${day.year()}/${day.month() + 1}/${day.date()}`,
      );
      const dayList = res.data.data.announcementCalandarDayList;
      if (day.isBefore(dayjs(new Date()))) {
        setIsOutdated(dayList.length > 0 && !outsideCurrentMonth);
      } else {
        setIsActive(dayList.length > 0 && !outsideCurrentMonth);
      }
      return res.data;
    },
  });

  return (
    <div className="relative">
      <PickersDay
        {...others}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
      >
        {day.date()}
      </PickersDay>
      {(isOutdated || isActive) && (
        <div
          className={clsx(
            'absolute bottom-1 right-1/2 h-[0.375rem] w-[0.375rem] translate-x-1/2 rounded-full',
            {
              'bg-primary-50': isActive,
              'bg-gray-30': isOutdated,
            },
          )}
        />
      )}
    </div>
  );
};

export default DayItem;
