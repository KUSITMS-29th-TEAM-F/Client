import DocumentInputContent from '@/components/mypage/document/DocumentInputContent';

const DocumentEditPage = ({ params }: { params: { id: number } }) => {
  return <DocumentInputContent mode="EDIT" documentId={params.id} />;
};

export default DocumentEditPage;
