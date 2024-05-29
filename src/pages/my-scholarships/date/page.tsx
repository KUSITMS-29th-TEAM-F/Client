import { fetchScholarshipsDate } from '@/api/my-scholarship';
import Image from 'next/image';
import Link from 'next/link';

const MyScholarshipsDatePage = async () => {
  const date = new Date();

  const scholarshipList: {
    applyId: number;
    endDocumentDate: string;
    announcementImageUrl: string;
    scholarShipName: string;
    scholarShipFoundation: string;
    applicationPeriod: string;
  }[] = [];

  for (let month = 1; month <= 12; month++) {
    const res = await fetchScholarshipsDate(date.getFullYear(), month);

    scholarshipList.push(...res.data.announcementCalandarDayList);
  }

  const formatSectionDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const formatListDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const dateList = Array.from(
    new Set(
      scholarshipList.map((scholarship) =>
        formatListDateString(scholarship.endDocumentDate),
      ),
    ),
  ).sort();

  return (
    <main className="p-4 pb-16">
      <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
        {dateList.map((date) => (
          <div key={date}>
            <h2 className="text-lg-200 ml-2 text-gray-80">
              {formatSectionDateString(date)}
            </h2>
            <ul key={date} className="mt-2 flex flex-col gap-4">
              {scholarshipList.map(
                (scholarship) =>
                  date ===
                    formatListDateString(scholarship.endDocumentDate) && (
                    <li key={scholarship.applyId}>
                      <Link
                        className="flex items-center gap-4 rounded-2xl border border-gray-10 bg-gray-00 p-4 pb-3"
                        href={`/my-scholarships/${scholarship.applyId}`}
                      >
                        <div className="overflow-hidden rounded-lg">
                          <Image
                            src={scholarship.announcementImageUrl}
                            alt={scholarship.scholarShipName}
                            width={64}
                            height={64}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-md-300 text-gray-70">
                            {scholarship.scholarShipName}
                          </h3>
                          <div className="text-md-200 text-gray-40">
                            {scholarship.scholarShipFoundation}
                          </div>
                          <div className="caption-200 text-gray-30">
                            {scholarship.applicationPeriod}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyScholarshipsDatePage;
