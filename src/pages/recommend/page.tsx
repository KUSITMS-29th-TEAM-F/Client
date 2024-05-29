'use client';

import { useEffect, useState } from 'react';
import {
  fetchAllScholarship,
  fetchRecommendScholarship,
} from '@/api/scholarship';
import { ScholarshipListContentProps } from '@/components/ui/ScholarshipListContent';
import GrayBackground from '@/components/ui/global-style/GrayBackground';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Capsule from '@/components/ui/Capsule';
import FavoriteButtonWrapper from '@/components/ui/FavoriteButtonWrapper';

const ScholarshipListPage = () => {
  const [scholarshipList, setScholarshipList] = useState<
    ScholarshipListContentProps['scholarshipList']
  >([]);

  const title = '맞춤 장학금';
  const icon = '/icons/menu/recommend-scholarships-icon.svg';
  const filterList = ['전체', '바로 지원 가능'];

  const [filterActiveIndex, setFilterActiveIndex] = useState<number>(0);

  const handleFilterClick = (index: number) => {
    setFilterActiveIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const filterStatus = ['전체', '바로지원가능'];
      const res = await fetchRecommendScholarship(
        filterStatus[filterActiveIndex],
      );
      setScholarshipList(res.data.announcementResponseList);
    };
    fetchData();
  }, [filterActiveIndex]);

  return (
    <div>
      <GrayBackground />
      <header>
        <div className="fixed h-[6.625rem] w-full bg-gray-00 px-4">
          <div className="mx-auto max-w-screen-lg">
            <div className="flex items-center justify-between border-b border-gray-05 pb-4 pt-3">
              <div className="flex items-center justify-start gap-3">
                <div>
                  <Image src={icon} alt={title} width={24} height={24} />
                </div>
                <h1 className="title-md-300 text-gray-80">{title}</h1>
                <span className="title-md-100 text-gray-30">
                  {scholarshipList.length}
                </span>
              </div>
              {/* <SortDropdown /> */}
            </div>
            <div className="pb-4 pt-2">
              <ul className="flex items-center gap-2">
                {filterList.map((filter, index) => (
                  <li
                    key={index}
                    className={clsx(
                      'text-md-200 cursor-pointer rounded-full px-3 py-1.5',
                      {
                        'border border-gray-80 bg-gray-80 text-gray-10':
                          filterActiveIndex === index,
                        'border border-gray-15 bg-gray-00 text-gray-60':
                          filterActiveIndex !== index,
                      },
                    )}
                    onClick={() => handleFilterClick(index)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="h-[7rem]" />
      </header>
      <main className="p-4">
        <ul className="mx-auto grid max-w-screen-lg grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scholarshipList.map((scholarship) => (
            <li key={scholarship.scholarshipId}>
              <Link
                href={`/scholarships/${scholarship.scholarshipId}`}
                className="block rounded-2xl bg-white p-4"
              >
                <div className="flex flex-col gap-3">
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
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src={scholarship.scholarShipImage}
                        alt={scholarship.scholarshipName}
                        width={64}
                        height={64}
                      />
                    </div>
                    <div>
                      <h2 className="text-md-300 text-gray-70">
                        {scholarship.scholarshipName}
                      </h2>
                      <div className="text-md-200 text-gray-40">
                        {scholarship.scholarshipFoundation}
                      </div>
                      <div className="caption-200 text-gray-30">
                        {scholarship.applicationPeriod}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ScholarshipListPage;
