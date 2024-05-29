import FloatingActionButton from '@/components/ui/FloatingActionButton';
import DotsMenuWrapper from '@/components/mypage/document/DotsMenuWrapper';
import BackButtonHeader from '@/components/ui/BackButtonHeader';
import CheckupListIcon from '@/components/ui/icon/CheckupListIcon';
import FileDescriptionIcon from '@/components/ui/icon/FileDescriptionIcon';
import FilePlusIcon from '@/components/ui/icon/FilePlusIcon';
import DocumentItem from '@/components/mypage/document/DocumentItem';
import { fetchDocuments } from '@/api/document';

const DocumentsPage = async () => {
  const res = await fetchDocuments();
  const documentList: {
    documentId: number;
    documentName: string;
    issuedDate: string;
    issuer: string | null;
    memo: string | null;
  }[] = res.data.documentResponseList;

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

export default DocumentsPage;
