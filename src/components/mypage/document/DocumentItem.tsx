'use client';

import { useState } from 'react';

import FileDescriptionIcon from '@/components/ui/icon/FileDescriptionIcon';
import DotsMenuWrapper from './DotsMenuWrapper';
import XIcon from '@/components/ui/icon/XIcon';

interface DocumentItemProps {
  document: {
    documentId: number;
    documentName: string;
    issuedDate: string;
    issuer: string | null;
    memo: string | null;
  };
}

const DocumentItem = ({ document }: DocumentItemProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetailModal = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailOpen(false);
  };

  return (
    <li
      key={document.documentId}
      className="border-b border-gray-05 last:border-b-0"
    >
      <div
        className="cursor-pointer px-6 py-5 lg:px-2"
        onClick={handleOpenDetailModal}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[1.25rem] text-gray-30">
              <FileDescriptionIcon />
            </span>
            <h2 className="text-lg-200 text-gray-80">
              {document.documentName}
            </h2>
          </div>
          <DotsMenuWrapper documentId={document.documentId} />
        </div>
        <div className="text-md-200 flex items-center gap-2 text-gray-40">
          <span>{document.issuedDate}</span>
          <span>{document.issuer}</span>
        </div>
      </div>
      {isDetailOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseDetailModal}
        >
          <div
            className="flex w-[20rem] flex-col gap-6 rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-sm-200 flex items-center justify-between text-gray-60">
              <h1 className="title-sm-300 text-gray-80">
                {document.documentName}
              </h1>
              <button onClick={handleCloseDetailModal}>
                <span className="text-[1.5rem] text-gray-40">
                  <XIcon />
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h2 className="text-md-200 text-gray-40">발급 날짜</h2>
                <p className="text-md-200 text-gray-80">
                  {document.issuedDate}
                </p>
              </div>
              {document.issuer && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-md-200 text-gray-40">발급 기관</h2>
                  <p className="text-md-200 text-gray-80">{document.issuer}</p>
                </div>
              )}
              {document.memo && (
                <div className="flex flex-col gap-2">
                  <h2 className="text-md-200 text-gray-40">메모</h2>
                  <p className="text-md-200 text-gray-80">{document.memo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default DocumentItem;
