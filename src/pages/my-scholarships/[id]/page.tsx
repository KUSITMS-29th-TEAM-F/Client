import Image from 'next/image';

import DotsMenuWrapper from '@/components/cover-letter/DotsMenuWrapper';
import HeaderHide from '@/components/my-scholarships/HeaderHide';
import BackButtonHeader from '@/components/ui/BackButtonHeader';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import WhiteBackground from '@/components/ui/global-style/WhiteBackground';
import BookmarkFilledIcon from '@/components/ui/icon/BookmarkFilledIcon';
import ChevronRightIcon from '@/components/ui/icon/ChevronRightIcon';
import FileDescriptionIcon from '@/components/ui/icon/FileDescriptionIcon';
import MessageDotsIcon from '@/components/ui/icon/MessageDotsIcon';
import PencilIcon from '@/components/ui/icon/PencilIcon';
import Link from 'next/link';
import { fetchMyScholarship } from '@/api/my-scholarship';
import StatusCheck from '@/components/my-scholarships/StatusCheck';

const MyScholarshipPage = async ({ params }: { params: { id: number } }) => {
  const res = await fetchMyScholarship(params.id);
  const myScholarship: {
    applyId: number;
    announcementId: number;
    applyStatus: string;
    announcementImageUrl: string;
    scholarShipName: string;
    scholarShipFoundation: string;
    applicationPeriod: string;
    myCoverLetterList: {
      coverLetterId: number;
      title: string;
    }[];
  } = res.data;

  const coverLetterList: {
    coverLetterId: number;
    title: string;
    createdAt: string;
  }[] = [
    {
      coverLetterId: 1,
      title: '월곡주얼리 최종',
      createdAt: '2024.05.17',
    },
    {
      coverLetterId: 2,
      title: '월곡주얼리 초안',
      createdAt: '2024.05.03',
    },
    {
      coverLetterId: 3,
      title: '월곡주얼리 1차',
      createdAt: '2024.04.20',
    },
    {
      coverLetterId: 4,
      title: '세아해암',
      createdAt: '2024.03.28',
    },
    { coverLetterId: 5, title: '클래식 창의지원', createdAt: '2024.03.26' },
  ];

  return (
    <main className="px-0 pb-16 md:px-4">
      <HeaderHide />
      <WhiteBackground />
      <BackButtonHeader
        backButton={{
          label: '내 장학금',
          backUrl: '-1',
        }}
        fixed
        className="px-4 md:px-0"
      />
      <div className="mx-auto max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <div className="relative aspect-square w-full">
            <Image
              src={myScholarship.announcementImageUrl}
              alt={myScholarship.scholarShipName}
              fill
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between px-4 py-4 pb-0 md:px-0">
                <StatusCheck
                  applyId={params.id}
                  initialStatus={myScholarship.applyStatus}
                />
                <div>
                  <span className="text-[1.5rem] text-primary">
                    <BookmarkFilledIcon />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-4 py-4 md:px-0">
                <div className="text-lg-200 text-gray-40">
                  {myScholarship.scholarShipFoundation}
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="title-sm-300 text-gray-80">
                    {myScholarship.scholarShipName}
                  </h1>
                  <div className="text-md-200 text-gray-40">
                    {myScholarship.applicationPeriod}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link
                href={`/scholarships/${myScholarship.announcementId}`}
                className="flex w-full items-center justify-center gap-1 border border-gray-05 py-4 text-gray-40"
              >
                <span className="text-md-200">공고로 이동하기</span>
                <span>
                  <ChevronRightIcon />
                </span>
              </Link>
              <div className="px-4 py-6 md:px-0">
                <Button variant="light-primary">
                  <div className="flex items-center gap-1">
                    <span className="text-[1.25rem]">
                      <MessageDotsIcon />
                    </span>
                    <span>후기 작성하기</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {coverLetterList.length !== 0 && (
          <>
            <div className="block md:hidden">
              <Divider />
            </div>
            <div className="flex items-center justify-between p-4">
              <h2 className="title-sm-300 text-gray-80">작성한 자기소개서</h2>
              <Link
                href="/cover-letters/new"
                className="flex items-center gap-1 text-primary"
              >
                <span className="text-[1.125rem]">
                  <PencilIcon />
                </span>
                <span className="text-md-200">작성하기</span>
              </Link>
            </div>
            <ul>
              {coverLetterList.map((coverLetter) => (
                <li
                  key={coverLetter.coverLetterId}
                  className="border-b border-gray-05 last:border-b-0"
                >
                  <Link
                    href={`/cover-letters/${coverLetter.coverLetterId}`}
                    className="flex flex-col gap-2 px-6 py-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[1.25rem] text-gray-30">
                          <FileDescriptionIcon />
                        </span>
                        <h2 className="text-lg-200 text-gray-80">
                          {coverLetter.title}
                        </h2>
                      </div>
                      <DotsMenuWrapper
                        coverLetterId={coverLetter.coverLetterId}
                      />
                    </div>
                    <div className="text-md-200 flex items-center gap-2 text-gray-30">
                      <span>{coverLetter.createdAt}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
};

export default MyScholarshipPage;
