import { Fragment, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  PrivacyInputValue,
  PrivacySectionProps,
} from '../../../interfaces/privacy';
import { initPrivacyValue } from '../../../constants/privacy';
import FirstPrivacySection from '../../../components/ui/privacy/FirstPrivacySection';
import SecondPrivacySection from '../../../components/ui/privacy/SecondPrivacySection';
import ThirdPrivacySection from '../../../components/ui/privacy/ThirdPrivacySection';
import DialogHeader from '../../../components/ui/DialogHeader';
import axios from '../../../api/axios';
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
} from '../../../constants/optionList';
import Divider from '../../../components/ui/Divider';

interface OnboardRequestType {
  schoolType: number | null;
  schoolName: string;
  schoolLocation: string | null;
  deptType: string | null;
  deptName: string;
  isPresent: boolean;
  semester: number;
  residence: string;
  residenceType: number;
  gender: number | null;
  birthYear: number | null;
  underPrivilegedInfo: string | null;
  totalFullGrade: number | null;
  totalGrade: number;
  lastFullGrade: number | null;
  lastGrade: number;
  incomeQuality: number | null;
  monthlyIncome: number;
  supportSection: number | null;
}

const Privacy = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [value, setValue] = useState<PrivacyInputValue>(initPrivacyValue);

  useQuery({
    queryKey: ['onboards'],
    queryFn: async () => {
      const res = await axios.get('/onboards');
      const onboard = res.data.data;
      console.log(onboard);
      setValue({
        ...initPrivacyValue,
        gender: onboard.gender,
        year: yearList.findIndex((year) => year === `${onboard.birthYear}`),
        city: cityList.findIndex(
          (city) => city === onboard.residence.split(' ')[0],
        ),
        area: areaList.findIndex(
          (city) => city === onboard.residence.split(' ')[1],
        ),
        familySize: onboard.residenceType,
        universityType: onboard.schoolType,
        universityCity: universityCityList.findIndex(
          (city) => city === onboard.schoolLocation,
        ),
        universityName: onboard.schoolName,
        departmentGroup: departmentGroupList.findIndex(
          (departmentGroup) => departmentGroup === onboard.deptType,
        ),
        department: onboard.deptName,
        enrollmentStatus: onboard.isPresent ? 0 : 1,
        sememster: onboard.semester,
        totalGpa: onboard.totalGrade,
        previousGpa: onboard.lastGrade,
        maxGpa: maxGpaList.findIndex(
          (maxGpa) => maxGpa === `${onboard.totalFullGrade}`,
        ),
        incomeBracket: incomeBracketList.findIndex(
          (incomeBracket) => incomeBracket === `${onboard.incomeQuality}`,
        ),
        supportIncomeBracket: supportIncomeBracketList.findIndex(
          (supportIncomeBracket) =>
            supportIncomeBracket === `${onboard.supportSection}`,
        ),
        monthlyIncome: onboard.monthlyIncome,
        socialSupportBracket:
          onboard.underPrivilegedInfo === null
            ? 0
            : socialSupportBracketList.findIndex(
                (socialSupportBracket) =>
                  socialSupportBracket === onboard.underPrivilegedInfo,
              ),
      });
      return res.data;
    },
  });

  const savePrivacy = useMutation({
    mutationFn: async (value: OnboardRequestType) => {
      const res = await axios.post('/onboards', value);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['onboards'] });
      navigate(-1);
    },
  });

  const handleInputChange: PrivacySectionProps['handleInputChange'] = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSelectedIndexChange: PrivacySectionProps['handleSelectedIndexChange'] =
    (key: string) => (selectedIndex: number | null) => {
      setValue({ ...value, [key]: selectedIndex });
    };

  const handleSaveButtonClick = () => {
    const newValue: OnboardRequestType = {
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
          ? socialSupportBracketList[value.socialSupportBracket] === '해당없음'
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
    };
    savePrivacy.mutate(newValue);
  };

  const sectionProps = {
    value: value,
    handleInputChange: handleInputChange,
    handleSelectedIndexChange: handleSelectedIndexChange,
  };

  const sectionList: React.ReactNode[] = [
    <FirstPrivacySection key={0} {...sectionProps} />,
    <SecondPrivacySection key={1} {...sectionProps} />,
    <ThirdPrivacySection key={2} {...sectionProps} />,
  ];

  return (
    <div className="pb-24">
      <DialogHeader
        title="개인정보 관리"
        confirmButton={{ onClick: handleSaveButtonClick }}
      />
      <main className="px-6">
        <div className="mx-auto max-w-screen-md">
          {sectionList.map((section, index) => (
            <Fragment key={index}>
              <div className="pb-6 pt-8">{section}</div>
              {index !== sectionList.length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Privacy;
