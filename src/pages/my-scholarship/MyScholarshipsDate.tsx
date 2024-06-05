import { useState } from 'react';

import CalendarSection from '../../components/my-scholarships/date/CalendarSection';
import ScholarshipsSection from '../../components/my-scholarships/date/ScholarshipsSection';
import GrayBackground from '../../components/ui/global-style/GrayBackground';

const MyScholarshipsDate = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString(),
  );

  return (
    <main className="px-4 pb-16 pt-6">
      <GrayBackground />
      <div className="mx-auto flex max-w-screen-lg flex-col items-start gap-6 lg:flex-row">
        <CalendarSection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <ScholarshipsSection selectedDate={selectedDate} />
      </div>
    </main>
  );
};

export default MyScholarshipsDate;
