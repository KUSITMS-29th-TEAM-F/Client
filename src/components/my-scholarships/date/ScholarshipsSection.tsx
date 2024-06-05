import { useEffect, useState } from 'react';

import axios from '../../../api/axios';
import { useQuery } from '@tanstack/react-query';
import ScholarshipItem from '../scholarship/ScholarshipItem';

export interface ScholarshipType {
  applyId: number;
  endDocumentDate: string;
  announcementImageUrl: string;
  scholarShipName: string;
  scholarShipFoundation: string;
  applicationPeriod: string;
}

interface ScholarshipsSectionProps {
  selectedDate: string;
}

const ScholarshipsSection = ({ selectedDate }: ScholarshipsSectionProps) => {
  const [scholarshipList, setScholarshipList] = useState<ScholarshipType[]>([]);

  const getScholarshipList = useQuery({
    queryKey: [],
    queryFn: async () => {
      const date = new Date(selectedDate);
      const res = await axios.get(
        `/announcements/calandar/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      );
      setScholarshipList(res.data.data.announcementCalandarDayList);
      return res.data;
    },
  });

  const formatSectionDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  useEffect(() => {
    getScholarshipList.refetch();
  }, [selectedDate]);

  return (
    <section className="flex w-full flex-1 flex-col gap-6">
      <div>
        <h2 className="text-lg-200 ml-2 text-gray-80">
          {formatSectionDateString(selectedDate)}
        </h2>
        {scholarshipList.length === 0 ? (
          <div className="text-lg-200 px-4 py-10 text-center text-gray-40">
            저장한 공고가 없어요
          </div>
        ) : (
          <ul className="mt-2 flex flex-col gap-4">
            {scholarshipList.map((scholarship) => (
              <ScholarshipItem
                key={scholarship.applyId}
                scholarship={scholarship}
              />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ScholarshipsSection;
