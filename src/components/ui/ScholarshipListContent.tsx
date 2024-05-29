import Link from 'next/link';
import Filter from '../scholarship/list/Filter';
import GrayBackground from './global-style/GrayBackground';
import Capsule from './Capsule';
import FavoriteButtonWrapper from './FavoriteButtonWrapper';
import Image from 'next/image';
import clsx from 'clsx';

export interface ScholarshipListContentProps {
  title: string;
  iconSrc: string;
  filterList: string[];
  scholarshipList: {
    scholarshipId: number;
    scholarshipName: string;
    scholarshipFoundation: string;
    scholarShipImage: string;
    applicationPeriod: string;
    remainingDays: number;
    applyPossible: '판단불가' | '지원불가' | '지원대상';
    isFavorite: boolean;
  }[];
}

const ScholarshipListContent = ({
  title,
  iconSrc,
  filterList,
  scholarshipList,
}: ScholarshipListContentProps) => {
  return (
    <div>
      <GrayBackground />
      <header>
        <div className="fixed h-[6.625rem] w-full bg-gray-00 px-4">
          <div className="mx-auto max-w-screen-lg">
            <div className="flex items-center justify-between border-b border-gray-05 pb-4 pt-3">
              <div className="flex items-center justify-start gap-3">
                <div>
                  <Image src={iconSrc} alt={title} width={24} height={24} />
                </div>
                <h1 className="title-md-300 text-gray-80">{title}</h1>
                <span className="title-md-100 text-gray-30">
                  {scholarshipList.length}
                </span>
              </div>
              {/* <SortDropdown /> */}
            </div>
            <div className="pb-4 pt-2">
              <Filter filterList={filterList} />
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
                    <FavoriteButtonWrapper
                      isFavorite={scholarship.isFavorite}
                    />
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

export default ScholarshipListContent;
