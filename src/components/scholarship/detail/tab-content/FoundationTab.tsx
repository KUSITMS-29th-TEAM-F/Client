import Button from '@/components/ui/Button';
import Description from '../description/Description';
import ChecklistIcon from '@/components/ui/icon/ChecklistIcon';
import { useEffect, useState } from 'react';
import XIcon from '@/components/ui/icon/XIcon';
import {
  fetchScholarshipFoundation,
  fetchScholarshipFoundationSummary,
} from '@/api/scholarship';

interface FoundationTabProps {
  scholarshipId: number;
  foundation: string;
}

const FoundationTab = ({ scholarshipId, foundation }: FoundationTabProps) => {
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [foundationDescription, setFoundationDescription] =
    useState<string>('');
  const [foundationSummary, setFoundationSummary] = useState<string>('');

  useEffect(() => {
    const fetchFoundation = async () => {
      const res = await fetchScholarshipFoundation(scholarshipId);
      setFoundationDescription(res.data.foundationInformation);
    };
    fetchFoundation();
  }, [scholarshipId]);

  const handleGetFoundationSummary = async () => {
    const res = await fetchScholarshipFoundationSummary(foundationDescription);
    setFoundationSummary(res.data.summary);
    setIsSummaryModalOpen(true);
  };

  const handleCloseSummaryModal = () => {
    setIsSummaryModalOpen(false);
  };

  return (
    <div>
      <div className="p-4">
        <Button
          variant="light-primary"
          onClick={() => handleGetFoundationSummary()}
        >
          <span className="flex items-center gap-1">
            <span className="text-[1.25rem]">
              <ChecklistIcon />
            </span>
            <span className="text-lg-300">재단 정보 요약하기</span>
          </span>
        </Button>
      </div>
      <Description>{foundationDescription}</Description>
      {isSummaryModalOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseSummaryModal}
        >
          <div
            className="flex w-[20rem] flex-col gap-8 rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-sm-200 flex items-center justify-between text-gray-60">
              <div>
                <span>재단 정보 요약</span>
              </div>
              <button onClick={handleCloseSummaryModal}>
                <span className="text-[1.5rem] text-gray-40">
                  <XIcon />
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="title-sm-300 text-gray-80">{foundation}</h1>
              <p className="text-sm-extra whitespace-pre-wrap text-gray-70">
                {foundationSummary}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundationTab;
