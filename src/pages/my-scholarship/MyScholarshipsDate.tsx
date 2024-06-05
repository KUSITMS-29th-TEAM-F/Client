import { useSearchParams } from 'react-router-dom';

import CalendarSection from '../../components/my-scholarships/date/CalendarSection';
import ScholarshipsSection from '../../components/my-scholarships/date/ScholarshipsSection';
import GrayBackground from '../../components/ui/global-style/GrayBackground';
import FloatingActionButtonGroup from '../../components/my-scholarships/date/FloatingActionButtonGroup';
import AllScholarshipListSection from '../../components/my-scholarships/date/AllScholarshipListSection';
import dayjs from 'dayjs';

const MyScholarshipsDate = () => {
  const [searchParams] = useSearchParams();

  const viewMode =
    (searchParams.get('view') as 'calendar' | 'list') || 'calendar';
  const selectedDate =
    searchParams.get('date') || dayjs(new Date()).format('YYYY-MM-DD');

  return (
    <main className="px-4 pb-16 pt-6">
      <GrayBackground />
      <div className="mx-auto flex max-w-screen-lg flex-col items-start gap-6 lg:flex-row">
        {viewMode === 'calendar' ? (
          <>
            <CalendarSection selectedDate={selectedDate} />
            <ScholarshipsSection selectedDate={selectedDate} />
          </>
        ) : (
          viewMode === 'list' && <AllScholarshipListSection />
        )}
      </div>
      <FloatingActionButtonGroup viewMode={viewMode} />
    </main>
  );
};

export default MyScholarshipsDate;
