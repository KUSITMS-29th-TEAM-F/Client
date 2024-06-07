import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ScholarshipType } from './ScholarshipsSection';
import axios from '../../../api/axios';
import ScholarshipItem from '../scholarship/ScholarshipItem';

const AllScholarshipListSection = () => {
  const [scholarshipList, setScholarshipList] = useState<ScholarshipType[]>([]);

  useQuery({
    queryKey: ['apply-list', 'all'],
    queryFn: async () => {
      const res = await axios.get('/apply-list/all');
      setScholarshipList(res.data.data.applyList);
      return res.data;
    },
  });

  const formatListDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatSectionDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const dateList = Array.from(
    new Set(
      scholarshipList.map((scholarship) =>
        formatListDateString(scholarship.endDocumentDate),
      ),
    ),
  )
    .sort()
    .reverse();

  return (
    <section className="flex w-full flex-1 flex-col gap-6">
      {dateList.map((date) => (
        <div key={date}>
          <h2 className="text-lg-200 ml-2 text-gray-80">
            {formatSectionDateString(date)}
          </h2>
          <ul className="mt-2 flex flex-col gap-4">
            {scholarshipList.map(
              (scholarship) =>
                date === formatListDateString(scholarship.endDocumentDate) && (
                  <ScholarshipItem
                    key={scholarship.applyId}
                    scholarship={scholarship}
                  />
                ),
            )}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default AllScholarshipListSection;
