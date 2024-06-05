import { useState } from 'react';
import { Link } from 'react-router-dom';

import FileDescriptionIcon from '../../components/ui/icon/FileDescriptionIcon';
import DotsMenuWrapper from '../../components/cover-letter/DotsMenuWrapper';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import PencilIcon from '../../components/ui/icon/PencilIcon';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

const CoverLetterList = () => {
  const [coverLetterList, setCoverLetterList] = useState<
    {
      coverLetterId: number;
      scholarshipFoundation: string;
      scholarshipName: string;
      title: string;
      updatedAt: string;
    }[]
  >([]);

  useQuery({
    queryKey: ['members', 'cover-letters'],
    queryFn: async () => {
      const res = await axios.get('/members/cover-letters');
      setCoverLetterList(res.data.data.coverLetterList);
      return res.data;
    },
  });

  return (
    <div className="px-6 pb-28">
      <div className="mx-auto max-w-screen-lg">
        <header className="flex items-center gap-3 py-3 text-gray-80">
          <div>
            <img
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
              <li key={coverLetter.coverLetterId}>
                <Link
                  to={`/cover-letters/${coverLetter.coverLetterId}`}
                  className="flex flex-col gap-2 border-t border-gray-05 px-2 py-5 last:border-b"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-[1.25rem] text-gray-30">
                      <FileDescriptionIcon />
                    </span>
                    <h2 className="text-lg-200 flex-1 text-gray-80">
                      {coverLetter.title}
                    </h2>
                    <DotsMenuWrapper
                      coverLetterId={coverLetter.coverLetterId}
                    />
                  </div>
                  <div className="text-md-200 text-gray-40">
                    {coverLetter.scholarshipFoundation}
                  </div>
                  <div className="text-md-200 text-gray-30">
                    {coverLetter.updatedAt}
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

export default CoverLetterList;
