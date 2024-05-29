'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import FirstPrivacySection from '@/components/ui/privacy/FirstPrivacySection';
import { initPrivacyValue } from '@/constants/privacy';
import { PrivacyInputValue, PrivacySectionProps } from '@/interfaces/privacy';
import SecondPrivacySection from '@/components/ui/privacy/SecondPrivacySection';
import ThirdPrivacySection from '@/components/ui/privacy/ThirdPrivacySection';
import Button from '@/components/ui/Button';
import NicknameSection from '@/components/onboarding/NicknameSection';
import clsx from 'clsx';
import CompleteSection from '@/components/onboarding/CompleteSection';
import NavBarHide from '@/components/ui/global-style/NavBarHide';
import XIcon from '@/components/ui/icon/XIcon';
import ChevronLeftIcon from '@/components/ui/icon/ChevronLeftIcon';
import { fetchNickname, fetchOnboarding } from '@/api/onboarding';
import {
  areaList,
  cityList,
  departmentGroupList,
  incomeBracketList,
  maxGpaList,
  socialSupportBracketList,
  supportIncomeBracketList,
  universityCityList,
  yearList,
} from '@/constants/optionList';
import { setTokenCookie } from '../actions/cookies';

const Onboarding = () => {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [value, setValue] = useState<PrivacyInputValue>(initPrivacyValue);

  const pageSize = 4;

  const handleInputChange: PrivacySectionProps['handleInputChange'] = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSelectedIndexChange: PrivacySectionProps['handleSelectedIndexChange'] =
    (key: string) => (selectedIndex: number | null) => {
      setValue({ ...value, [key]: selectedIndex });
    };

  const handleNextButtonClick = async () => {
    window.scrollTo(0, 0);
    if (page === 0) {
      const res = await fetchNickname(
        nickname,
        localStorage.getItem('access_token') || '',
      );
      console.log(res.data);
      const accessToken = res.data.accessToken;
      setTokenCookie(accessToken);
    } else if (page === 3) {
      const res = await fetchOnboarding({
        schoolType: value.universityType,
        schoolName: value.universityName,
        schoolLocation:
          value.universityCity !== null
            ? universityCityList[value.universityCity]
            : null,
        deptType:
          value.departmentGroup !== null
            ? departmentGroupList[value.departmentGroup]
            : null,
        deptName: value.department,
        isPresent: value.enrollmentStatus === 0,
        semester: Number(value.sememster),
        residence: `${value.city !== null ? cityList[value.city] : ''} ${value.area !== null ? areaList[value.area] : ''}`,
        residenceType: Number(value.familySize),
        gender: value.gender,
        birthYear: value.year !== null ? Number(yearList[value.year]) : null,
        underPrivilegedInfo:
          value.socialSupportBracket !== null
            ? socialSupportBracketList[value.socialSupportBracket] ===
              '해당없음'
              ? null
              : socialSupportBracketList[value.socialSupportBracket]
            : null,
        totalFullGrade:
          value.maxGpa !== null ? Number(maxGpaList[value.maxGpa]) : null,
        totalGrade: Number(value.totalGpa),
        lastFullGrade:
          value.maxGpa !== null ? Number(maxGpaList[value.maxGpa]) : null,
        lastGrade: Number(value.previousGpa),
        incomeQuality:
          value.incomeBracket !== null
            ? Number(incomeBracketList[value.incomeBracket])
            : null,
        monthlyIncome: Number(value.monthlyIncome),
        supportSection:
          value.supportIncomeBracket !== null
            ? Number(supportIncomeBracketList[value.supportIncomeBracket])
            : null,
      });
      console.log(res.data);
      localStorage.removeItem('access_token');
    }
    if (page <= 3) {
      setPage(page + 1);
    } else {
      window.location.href = '/';
    }
  };

  const handleCloseButtonClick = () => {
    router.push('/');
  };

  const handlePreviousButtonClick = () => {
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const sectionProps = {
    value,
    handleInputChange: handleInputChange,
    handleSelectedIndexChange: handleSelectedIndexChange,
  };

  return (
    <div className="flex h-full flex-col">
      <div>
        <div className="fixed h-[3.5rem] w-full bg-white p-4">
          <div className="mx-auto grid max-w-screen-md grid-cols-3">
            <div>
              <button
                onClick={
                  page === 0
                    ? handleCloseButtonClick
                    : handlePreviousButtonClick
                }
              >
                <span className="text-[1.5rem]">
                  {page === 0 ? <XIcon /> : <ChevronLeftIcon />}
                </span>
              </button>
            </div>
            <div className="title-sm-200 text-center text-gray-90">
              기본 정보 입력
            </div>
          </div>
        </div>
        <div className="h-[3.5rem]" />
      </div>
      <NavBarHide />
      {page !== 0 && (
        <div>
          <div className="fixed z-10 w-full bg-white">
            <div className="mx-auto max-w-screen-md">
              <div
                className="flex h-[6.5rem] w-full flex-col gap-2 bg-primary-00 px-6 py-4"
                style={{
                  background:
                    'linear-gradient(94deg, #FFFAF0 0%, #FEEABE 100%)',
                }}
              >
                <p>
                  내 정보를 입력하면
                  <br />
                  <strong className="font-semibold text-primary">
                    정확한 장학금 추천
                  </strong>
                  을 받을 수 있어요!
                </p>
                <p className="caption-200 text-gray-60">
                  추후 정보 수정이 가능해요.
                </p>
              </div>
              <div
                className="-mt-0.5 block h-0.5 w-full bg-primary-40"
                style={{
                  width: `${(page / pageSize) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="h-[6.75rem]" />
        </div>
      )}
      <main className="flex-1">
        <div
          className={clsx('h-full px-6 pb-36 pt-6', {
            'pt-2': page === 0,
            'flex items-center justify-center pb-0 pt-0': page === 4,
          })}
        >
          <div className="mx-auto max-w-screen-md">
            <NicknameSection
              nickname={nickname}
              setNickname={setNickname}
              isVisible={page === 0}
            />
            <FirstPrivacySection {...sectionProps} isVisible={page === 1} />
            <SecondPrivacySection {...sectionProps} isVisible={page === 2} />
            <ThirdPrivacySection {...sectionProps} isVisible={page === 3} />
            <CompleteSection isVisible={page === 4} />
          </div>
        </div>
      </main>
      <div className="h-24">
        <div />
        <div className="fixed bottom-8 w-full px-4">
          <div className="mx-auto max-w-screen-md">
            <Button onClick={handleNextButtonClick}>
              {page >= 4 ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
