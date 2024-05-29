import { fetchMyApplyList } from '@/api/my-scholarship';
import Status, { StatusProps } from '@/components/ui/Status';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const MyScholarshipsListPage = async ({
  searchParams,
}: {
  searchParams: { status: string };
}) => {
  const badgeList: { label: string; href: string; active: boolean }[] = [
    {
      label: '전체',
      href: '/my-scholarships/list',
      active: searchParams.status === undefined,
    },
    {
      label: '합격',
      href: '/my-scholarships/list?status=pass',
      active: searchParams.status === 'pass',
    },
    {
      label: '불합격',
      href: '/my-scholarships/list?status=fail',
      active: searchParams.status === 'fail',
    },
  ];

  const res = await fetchMyApplyList(
    searchParams.status === undefined
      ? 'all'
      : (searchParams.status as 'pass' | 'fail'),
  );

  const scholarshipList: {
    applyId: number;
    scholarShipName: string;
    scholarShipFoundation: string;
    endDocumentDate: string;
    announcementImageUrl: string;
    applyStatus: '합격' | '불합격' | '미입력';
    applicationPeriod: string;
  }[] = res.data.applyList;

  const filterScholarshipList = scholarshipList.filter((scholarship) => {
    if (searchParams.status === 'pass') {
      return scholarship.applyStatus === '합격';
    } else if (searchParams.status === 'fail') {
      return scholarship.applyStatus === '불합격';
    } else {
      return true;
    }
  });

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <main className="p-4 pb-16">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex items-center gap-2">
          {badgeList.map((badge, index) => (
            <Link
              key={index}
              href={badge.href}
              className={clsx('text-md-200 rounded-full border px-3 py-1.5', {
                'border-gray-80 bg-gray-80 text-gray-10': badge.active,
                'border-gray-15 bg-gray-00 text-gray-60': !badge.active,
              })}
            >
              {badge.label}
            </Link>
          ))}
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filterScholarshipList.map((scholarship) => (
            <li key={scholarship.applyId}>
              <Link
                href={`/my-scholarships/${scholarship.applyId}`}
                className="flex items-start gap-4 rounded-2xl border border-gray-10 bg-gray-00 p-4 pb-3"
              >
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src={scholarship.announcementImageUrl}
                    alt={scholarship.scholarShipName}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="text-md-300 line-clamp-1 text-gray-70">
                    {scholarship.scholarShipName}
                  </h3>
                  <div className="text-md-200 text-gray-40">
                    {scholarship.scholarShipFoundation}
                  </div>
                  <div className="caption-200 text-gray-30">
                    {formatDateString(scholarship.endDocumentDate)}
                  </div>
                </div>
                <div>
                  <Status
                    variant={
                      (scholarship.applyStatus === '합격'
                        ? 'success'
                        : scholarship.applyStatus === '불합격'
                          ? 'danger'
                          : scholarship.applyStatus === '미입력' &&
                            'stroke-default') as StatusProps['variant']
                    }
                  >
                    {scholarship.applyStatus === '합격'
                      ? '합격'
                      : scholarship.applyStatus === '불합격'
                        ? '불합격'
                        : scholarship.applyStatus === '미입력' && '미입력'}
                  </Status>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default MyScholarshipsListPage;
