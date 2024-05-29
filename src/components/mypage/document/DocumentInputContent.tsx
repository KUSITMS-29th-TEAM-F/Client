import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DialogHeader from '../../ui/DialogHeader';
import FormControl from '../../ui/FormControl';
import Dropdown from '../../ui/Dropdown';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '../../../api/axios';

interface DocumentInputContentProps {
  mode: 'NEW' | 'EDIT';
  documentId?: number;
}

const DocumentInputContent = ({
  mode,
  documentId,
}: DocumentInputContentProps) => {
  const navigate = useNavigate();

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

  useQuery({
    queryKey: ['members', 'documents'],
    queryFn: async () => {
      const res = await axios.get(`/members/documents/${documentId}`);
      const document = res.data.data;
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
      return res.data;
    },
    enabled: mode === 'EDIT' && documentId !== undefined,
  });

  const addDocument = useMutation({
    mutationFn: async (value: {
      documentName: string;
      issuedDate: string;
      issuer: string | null;
      memo: string | null;
    }) => {
      const res = await axios.post('/members/documents', value);
      return res.data;
    },
    onSuccess: () => {
      navigate('/me/documents');
    },
  });

  const editDocument = useMutation({
    mutationFn: async (value: {
      documentName: string;
      issuedDate: string;
      issuer: string | null;
      memo: string | null;
    }) => {
      const res = await axios.patch(`/members/documents/${documentId}`, value);
      return res.data;
    },
    onSuccess: () => {
      navigate('/me/documents');
    },
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

  const handleSelectedIndexChange =
    (key: string) => (selectedIndex: number | null) => {
      setSelectedIndexGroup({ ...selectedIndexGroup, [key]: selectedIndex });
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
      editDocument.mutate(value);
    } else if (mode === 'NEW') {
      addDocument.mutate(value);
    }
  };

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
                setSelectedIndex={handleSelectedIndexChange('document')}
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
                setSelectedIndex={handleSelectedIndexChange('year')}
                className="col-span-3"
                placeholder="년도"
              />
              <Dropdown
                itemList={monthList}
                selectedIndex={selectedIndexGroup.month}
                setSelectedIndex={handleSelectedIndexChange('month')}
                className="col-span-2"
                placeholder="월"
              />
              <Dropdown
                itemList={dayList}
                selectedIndex={selectedIndexGroup.day}
                setSelectedIndex={handleSelectedIndexChange('day')}
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
