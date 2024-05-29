import Link from 'next/link';

import FloatingActionButton from '@/components/ui/FloatingActionButton';
import DotsMenuWrapper from '@/components/cover-letter/DotsMenuWrapper';
import FileDescriptionIcon from '@/components/ui/icon/FileDescriptionIcon';
import FilePencilIcon from '@/components/ui/icon/FilePencilIcon';
import PencilIcon from '@/components/ui/icon/PencilIcon';
import Image from 'next/image';

const CoverLettersPage = () => {
  const coverLetterList: {
    id: number;
    title: string;
    organization: string;
    date: string;
  }[] = [
    {
      id: 1,
      title: '월곡주얼리 최종',
      organization: '월곡주얼리장학생 | 월곡주얼리산업진흥재단',
      date: '2024.05.17',
    },
    {
      id: 2,
      title: '얼곡주얼리 초안',
      organization: '월곡주얼리장학생 | 월곡주얼리산업진흥재단',
      date: '2024.05.03',
    },
    {
      id: 3,
      title: '월곡주얼리 1차',
      organization: '월곡주얼리장학생 | 월곡주얼리산업진흥재단',
      date: '2024.04.20',
    },
    {
      id: 4,
      title: '세아해암',
      organization: '세아해암 클래식 창의지원 장학생 | 세아해암학술장학재단',
      date: '2024.03.28',
    },
    {
      id: 5,
      title: '클래식 창의지원',
      organization: '세아해암 클래식 창의지원 장학생 | 세아해암학술장학재단',
      date: '2024.03.26',
    },
    {
      id: 6,
      title: '우덕재안 최최종',
      organization: '우덕재단 우(友) | 우덕재단',
      date: '2024.03.26',
    },
  ];

  return (
    <div className="px-6 pb-28">
      <div className="mx-auto max-w-screen-lg">
        <header className="flex items-center gap-3 py-3 text-gray-80">
          <div>
            <Image
              src="/icons/menu/cover-letters-icon.svg"
              alt="자기소개서"
              width={18}
              height={18}
            />
          </div>
          <h1 className="title-md-300">자기소개서</h1>
        </header>
        <main>
          <ul>
            {coverLetterList.map((coverLetter) => (
              <li key={coverLetter.id}>
                <Link
                  href={`/cover-letters/${coverLetter.id}`}
                  className="flex flex-col gap-2 border-t border-gray-05 px-2 py-5 last:border-b"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-[1.25rem] text-gray-30">
                      <FileDescriptionIcon />
                    </span>
                    <h2 className="text-lg-200 flex-1 text-gray-80">
                      {coverLetter.title}
                    </h2>
                    <DotsMenuWrapper coverLetterId={coverLetter.id} />
                  </div>
                  <div className="text-md-200 text-gray-40">
                    {coverLetter.organization}
                  </div>
                  <div className="text-md-200 text-gray-30">
                    {coverLetter.date}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <FloatingActionButton
            href="/cover-letters/new"
            icon={<PencilIcon />}
            label="새로 쓰기"
          />
        </main>
      </div>
    </div>
  );
};

export default CoverLettersPage;
