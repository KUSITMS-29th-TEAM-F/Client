import Image from 'next/image';

import Capsule from '@/components/ui/Capsule';
import Button from '@/components/ui/Button';
import MessageDotsIcon from '@/components/ui/icon/MessageDotsIcon';
import ScholarshipTabSection from '@/components/scholarship/detail/section/ScholarshipTabSection';
import BackButtonHeader from '@/components/ui/BackButtonHeader';
import { fetchScholarship } from '@/api/scholarship';
import ScholarshipBottomAction from '@/components/scholarship/detail/section/ScholarshipBottomAction';
import Link from 'next/link';

const ScholarshipDetailPage = async ({
  params,
}: {
  params: { id: number };
}) => {
  const res = await fetchScholarship(params.id);

  const scholarship: {
    scholarshipId: number;
    scholarShipImage: string;
    scholarshipName: string;
    scholarshipFoundation: string;
    remainingDay: number;
    applyPossible: string;
    supportAmount: string;
    applicationPeriod: string;
    hashTag: string;
    applyCondition: string[];
    detailContents: string;
    likes: number;
    memberIsLiked: boolean;
    applyLink: string;
  } = res.data;

  console.log(scholarship);

  return (
    <div className="px-0 pb-24 md:px-0">
      <BackButtonHeader
        as="header"
        backButton={{ backUrl: '-1' }}
        fixed
        className="px-2 md:px-4 lg:px-0"
      />
      <main className="md:px-4">
        <div className="mx-auto flex max-w-screen-lg flex-col md:flex-row md:gap-6 lg:gap-8">
          <section className="flex-1">
            <div className="relative aspect-square w-full md:aspect-auto md:h-full">
              <Image
                src={scholarship.scholarShipImage}
                alt={scholarship.scholarshipName}
                fill
                objectFit="cover"
              />
              {scholarship.remainingDay >= 0 && (
                <Capsule
                  variant="primary"
                  size="lg"
                  className="absolute bottom-4 left-4"
                >
                  D-{scholarship.remainingDay}
                </Capsule>
              )}
            </div>
          </section>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <section className="flex flex-col gap-4 px-4 py-4 md:px-0">
                <div className="title-sm-200 text-gray-40">
                  {scholarship.scholarshipFoundation}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="title-sm-200 text-gray-80">
                    {scholarship.scholarshipName}
                  </h1>
                  <div className="title-md-300 text-gray-90">
                    {scholarship.supportAmount}만원
                  </div>
                  <div className="text-md-200 text-gray-40">
                    {scholarship.applicationPeriod}
                  </div>
                </div>
                <div className="text-lg-200 flex gap-2 text-primary">
                  {scholarship.hashTag}
                </div>
              </section>
              <section className="border-t border-gray-10 px-4 py-4 md:px-0">
                <h2 className="text-lg-200">지원조건</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {scholarship.applyCondition.map((condition, index) => (
                    <Capsule
                      key={index}
                      size="sm"
                      variant={
                        index % 3 === 0
                          ? 'stroke-default'
                          : index % 3 === 1
                            ? 'stroke-success'
                            : index % 3 === 2
                              ? 'stroke-danger'
                              : 'stroke-default'
                      }
                    >
                      {condition}
                    </Capsule>
                  ))}
                </div>
              </section>
            </div>
            <section className="flex flex-col gap-4 px-4 py-6 md:px-0 md:pb-0">
              <Link
                href={scholarship.applyLink}
                target="_blank"
                className="title-sm-300 flex w-full items-center justify-center rounded-2xl bg-primary py-5 text-gray-00"
              >
                지원하기
              </Link>
              <Link href="/foundations">
                <Button variant="light-primary">
                  <span className="text-lg-300 flex gap-1 text-gray-80">
                    <span className="text-[1.25rem]">
                      <MessageDotsIcon />
                    </span>
                    <span>재단 후기 모아보기</span>
                    <span className="text-primary">15</span>
                  </span>
                </Button>
              </Link>
            </section>
          </div>
        </div>
        <ScholarshipTabSection
          scholarshipId={params.id}
          detailContents={scholarship.detailContents}
          foundation={scholarship.scholarshipFoundation}
        />
        <ScholarshipBottomAction
          memberIsLiked={scholarship.memberIsLiked}
          likes={scholarship.likes}
          scholarshipId={scholarship.scholarshipId}
        />
      </main>
    </div>
  );
};

export default ScholarshipDetailPage;
