import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import GrayBackground from '../../components/ui/global-style/GrayBackground';
import Capsule from '../../components/ui/Capsule';
import HeartIcon from '../../components/ui/icon/HeartIcon';
import axios from '../../api/axios';

const SearchScholarships = () => {
  const [searchParams] = useSearchParams();

  const [scholarshipList, setScholarshipList] = useState<
    {
      announcementId: number;
      scholarShipImage: string;
      scholarShipName: string;
      scholarshipFoundation: string;
      applicationPeriod: string;
      applyPossible: string;
      remainingDays: number;
    }[]
  >([]);

  const searchKeyword = searchParams.get('q');

  useQuery({
    queryKey: ['searchScholarships', { searchKeyword }],
    queryFn: async () => {
      const res = await axios.get(`/home/announcements/search`, {
        params: {
          q: searchKeyword,
        },
      });
      console.log(res.data.data);
      setScholarshipList(res.data.data.announcementBySearchResponseList);
      return res.data;
    },
  });

  return (
    <div className="px-4 pb-16 pt-6">
      <GrayBackground />
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <h1 className="text-lg-200 text-gray-80">
          '<strong className="text-lg-300 text-gray-90">{searchKeyword}</strong>
          ' 검색 결과
        </h1>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scholarshipList.map((scholarship) => (
            <li key={scholarship.announcementId}>
              <Link
                to={`/scholarships/${scholarship.announcementId}`}
                className="flex flex-col gap-3 rounded-2xl border border-gray-10 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Capsule size="sm">
                      {scholarship.remainingDays >= 0
                        ? `D-${scholarship.remainingDays}`
                        : '모집마감'}
                    </Capsule>
                    <Capsule
                      variant={
                        scholarship.applyPossible === '지원불가'
                          ? 'stroke-danger'
                          : scholarship.applyPossible === '지원대상'
                            ? 'stroke-success'
                            : scholarship.applyPossible === '판단불가'
                              ? 'stroke-default'
                              : 'stroke-default'
                      }
                      size="sm"
                    >
                      {scholarship.applyPossible}
                    </Capsule>
                  </div>
                  <div>
                    <span className="text-[1.5rem] text-gray-20">
                      <HeartIcon />
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-[4rem] w-[4rem] overflow-hidden rounded-lg">
                    <img
                      src={scholarship.scholarShipImage}
                      alt="임시 이미지"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-md-300 text-gray-70">
                      {scholarship.scholarShipName}
                    </h2>
                    <div className="text-md-200 text-gray-40">
                      {scholarship.scholarshipFoundation}
                    </div>
                    <div className="caption-200 text-gray-30">
                      {scholarship.applicationPeriod}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchScholarships;
