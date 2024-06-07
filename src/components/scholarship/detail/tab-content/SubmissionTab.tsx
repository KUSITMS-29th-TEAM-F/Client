import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import DocumentList, { DocumentListProps } from '../document-list/DocumentList';
import ChevronRightIcon from '../../../ui/icon/ChevronRightIcon';
import PencilIcon from '../../../ui/icon/PencilIcon';
import axios from '../../../../api/axios';

interface SubmissionTabProps {
  scholarshipId: number;
}

const SubmissionTab = ({ scholarshipId }: SubmissionTabProps) => {
  const [documentList, setDocumentList] = useState<
    DocumentListProps['documentList']
  >([]);

  useQuery({
    queryKey: ['announcements', scholarshipId, 'required-documents'],
    queryFn: async () => {
      const res = await axios.get(
        `/announcements/${scholarshipId}/required-documents`,
      );
      setDocumentList(res.data.data);
      console.log(res.data.data);
      return res.data;
    },
  });

  const neccessaryDocumentList = documentList.filter(
    (document) => document.requiredOptions === 'NECESSARY',
  );
  const optionalDocumentList = documentList.filter(
    (document) => document.requiredOptions === 'OPTION',
  );

  return (
    <div className="p-4">
      {documentList.find(
        (document) => document.documentName === '자기소개서',
      ) && (
        <Link
          to="/cover-letters/new"
          className="flex w-full items-center justify-between rounded-2xl bg-primary p-4 pl-6 text-gray-00"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="title-sm-300">자기소개서 작성하러가기</span>
              <span className="text-[1.5rem]">
                <ChevronRightIcon />
              </span>
            </div>
            <span className="text-md-200 text-primary-10">
              혜택을 받기 위해선 자기소개서가 필요해요.
            </span>
          </div>
          <div className="text-[3.75rem] text-primary-20">
            <PencilIcon strokeWidth={1.5} />
          </div>
        </Link>
      )}
      <div className="mt-10 flex flex-col gap-10">
        {neccessaryDocumentList.length > 0 && (
          <DocumentList
            title="필수 서류"
            documentList={neccessaryDocumentList}
          />
        )}
        {optionalDocumentList.length > 0 && (
          <DocumentList title="추가 서류" documentList={optionalDocumentList} />
        )}
      </div>
    </div>
  );
};

export default SubmissionTab;
