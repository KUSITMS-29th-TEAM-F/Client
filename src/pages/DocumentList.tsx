import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import axios from '../api/axios';
import BackButtonHeader from '../components/ui/BackButtonHeader';
import CheckupListIcon from '../components/ui/icon/CheckupListIcon';
import DocumentItem from '../components/mypage/document/DocumentItem';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import FilePlusIcon from '../components/ui/icon/FilePlusIcon';

const DocumentList = () => {
  const [documentList, setDocumentList] = useState<
    {
      documentId: number;
      documentName: string;
      issuedDate: string;
      issuer: string | null;
      memo: string | null;
    }[]
  >([]);

  useQuery({
    queryKey: ['members', 'documents'],
    queryFn: async () => {
      const res = await axios.get('/members/documents');
      setDocumentList(res.data.data.documentResponseList);
      return res.data;
    },
  });

  return (
    <div className="pb-28">
      <div>
        <header className="fixed z-10 flex w-full flex-col bg-gray-00 pb-3">
          <BackButtonHeader
            backButton={{
              label: '마이페이지',
              backUrl: '/me',
            }}
            padding={false}
          />
          <div className="px-4">
            <div className="mx-auto flex w-full max-w-screen-lg items-center gap-1">
              <span className="text-[1.5rem]">
                <CheckupListIcon />
              </span>
              <h1 className="title-md-300 text-gray-80">서류 관리</h1>
            </div>
          </div>
        </header>
        <div className="h-[84px]" />
      </div>
      <main>
        <ul className="mx-auto max-w-screen-lg">
          {documentList.map((document) => (
            <DocumentItem key={document.documentId} document={document} />
          ))}
        </ul>
      </main>
      <FloatingActionButton
        href="/me/documents/new"
        icon={<FilePlusIcon />}
        label="서류 등록하기"
      />
    </div>
  );
};

export default DocumentList;
