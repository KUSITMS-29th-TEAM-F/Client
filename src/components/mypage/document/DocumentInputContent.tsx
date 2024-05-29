'use client';

import { addDocument, editDocument, fetchDocument } from '@/api/document';
import DialogHeader from '@/components/ui/DialogHeader';
import Dropdown from '@/components/ui/Dropdown';
import FormControl from '@/components/ui/FormControl';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DocumentInputContentProps {
  mode: 'NEW' | 'EDIT';
  documentId?: number;
}

const DocumentInputContent = ({
  mode,
  documentId,
}: DocumentInputContentProps) => {
  const router = useRouter();

  const [selectedIndexGroup, setSelectedIndexGroup] = useState<{
    document: number | null;
    year: number | null;
    month: number | null;
    day: number | null;
  }>({
    document: null,
    year: null,
    month: null,
    day: null,
  });
  const [inputGroup, setInputGroup] = useState<{
    documentName: string;
    issuer: string;
    memo: string;
  }>({
    documentName: '',
    issuer: '',
    memo: '',
  });

  const documentItemList: string[] = [
    '직접 입력',
    '성적증명서',
    '재학증명서',
    '건강보험료납입증명서',
    '건강보험료자격득실확인서',
    '가족관계증명서',
    '주민등록등본',
    '학자금지원구간(소득분위)통지서',
    '기초생활수급자증명서',
    '차상위계층증명서',
    '한부모가족증명서',
    '장애인증명서',
    '국가유공자확인서',
  ];

  const yearList = Array.from({ length: 50 }, (_, i) => `${2024 - i}`);
  const monthList = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const dayList = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const setDocumentSelectedIndex = (selectedIndex: number | null) => {
    setSelectedIndexGroup({ ...selectedIndexGroup, document: selectedIndex });
  };

  const setYearSelectedIndex = (selectedIndex: number | null) => {
    setSelectedIndexGroup({ ...selectedIndexGroup, year: selectedIndex });
  };

  const setMonthSelectedIndex = (selectedIndex: number | null) => {
    setSelectedIndexGroup({ ...selectedIndexGroup, month: selectedIndex });
  };

  const setDaySelectedIndex = (selectedIndex: number | null) => {
    setSelectedIndexGroup({ ...selectedIndexGroup, day: selectedIndex });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputGroup({ ...inputGroup, [e.target.name]: e.target.value });
  };

  const handleSaveButtonClick = async () => {
    if (
      selectedIndexGroup.document === null ||
      selectedIndexGroup.year === null ||
      selectedIndexGroup.month === null ||
      selectedIndexGroup.day === null
    )
      return;
    const value = {
      documentName:
        selectedIndexGroup.document === 0
          ? inputGroup.documentName
          : documentItemList[selectedIndexGroup.document],
      issuedDate: `${yearList[selectedIndexGroup.year]}-${monthList[selectedIndexGroup.month].padStart(2, '0')}-${dayList[selectedIndexGroup.day].padStart(2, '0')}`,
      issuer: inputGroup.issuer === '' ? null : inputGroup.issuer,
      memo: inputGroup.memo === '' ? null : inputGroup.memo,
    };
    if (mode === 'EDIT' && documentId) {
      await editDocument(value, documentId);
    } else if (mode === 'NEW') {
      await addDocument(value);
    }
    window.location.href = '/me/documents';
  };

  useEffect(() => {
    const fetchData = async () => {
      if (mode === 'EDIT' && documentId) {
        const res = await fetchDocument(documentId);
        const document = res.data;
        setSelectedIndexGroup({
          document:
            documentItemList.indexOf(document.documentName) === -1
              ? 0
              : documentItemList.indexOf(document.documentName),
          year: parseInt(document.issuedDate.split('-')[0]) - 2024,
          month: parseInt(document.issuedDate.split('-')[1]) - 1,
          day: parseInt(document.issuedDate.split('-')[2]) - 1,
        });
        setInputGroup({
          documentName: document.documentName,
          issuer: document.issuer || '',
          memo: document.memo || '',
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <DialogHeader
        title="서류 등록"
        confirmButton={{ onClick: handleSaveButtonClick }}
      />
      <main className="px-6 py-4">
        <div className="mx-auto flex max-w-screen-md flex-col gap-10">
          <FormControl label="서류명" required>
            <div className="flex flex-col gap-2">
              <Dropdown
                itemList={documentItemList}
                selectedIndex={selectedIndexGroup.document}
                setSelectedIndex={setDocumentSelectedIndex}
                placeholder="서류를 선택해주세요"
              />
              {selectedIndexGroup.document === 0 && (
                <Input
                  name="documentName"
                  value={inputGroup.documentName}
                  onChange={handleInputChange}
                  placeholder="서류 이름을 입력해주세요(띄어쓰기 없이)"
                />
              )}
            </div>
          </FormControl>
          <FormControl label="발급 날짜" required>
            <div className="grid grid-cols-7 items-center gap-2">
              <Dropdown
                itemList={yearList}
                selectedIndex={selectedIndexGroup.year}
                setSelectedIndex={setYearSelectedIndex}
                className="col-span-3"
                placeholder="년도"
              />
              <Dropdown
                itemList={monthList}
                selectedIndex={selectedIndexGroup.month}
                setSelectedIndex={setMonthSelectedIndex}
                className="col-span-2"
                placeholder="월"
              />
              <Dropdown
                itemList={dayList}
                selectedIndex={selectedIndexGroup.day}
                setSelectedIndex={setDaySelectedIndex}
                className="col-span-2"
                placeholder="일"
              />
            </div>
          </FormControl>
          <FormControl label="발급 기관">
            <Input
              name="issuer"
              value={inputGroup.issuer}
              onChange={handleInputChange}
              placeholder="발급 기관을 입력해주세요"
            />
          </FormControl>
          <FormControl label="메모">
            <TextArea
              name="memo"
              value={inputGroup.memo}
              onChange={handleInputChange}
              placeholder="메모를 남겨보세요"
              rows={5}
            />
          </FormControl>
        </div>
      </main>
    </div>
  );
};

export default DocumentInputContent;
