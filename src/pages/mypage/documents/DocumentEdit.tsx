import { useParams } from 'react-router-dom';

import DocumentInputContent from '../../../components/mypage/document/DocumentInputContent';

const DocumentEdit = () => {
  const params = useParams<{ id: string }>();

  const documentId = Number(params.id);

  return <DocumentInputContent mode="EDIT" documentId={documentId} />;
};

export default DocumentEdit;
