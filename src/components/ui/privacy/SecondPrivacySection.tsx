import Dropdown from '@/components/ui/Dropdown';
import BinarySelect from '../BinarySelect';
import FormControl from '../FormControl';
import Input from '../Input';
import MultipleSelect from '../MultipleSelect';
import UnitInput from '../UnitInput';
import {
  departmentGroupList,
  enrollmentStatusList,
  maxGpaList,
  universityCityList,
  universityTypeList,
} from '@/constants/optionList';
import PrivacySectionLayout from './PrivacySectionLayout';
import { PrivacySectionProps } from '@/interfaces/privacy';

const SecondPrivacySection = ({
  isVisible,
  value,
  handleInputChange,
  handleSelectedIndexChange,
}: PrivacySectionProps) => {
  return (
    <PrivacySectionLayout isVisible={isVisible}>
      <FormControl label="학교">
        <div className="flex flex-col gap-4">
          <BinarySelect
            selectedIndex={value.universityType}
            setSelectedIndex={handleSelectedIndexChange('universityType')}
            optionList={universityTypeList}
          />
          <Dropdown
            selectedIndex={value.universityCity}
            setSelectedIndex={handleSelectedIndexChange('universityCity')}
            itemList={universityCityList}
            placeholder="시/도"
          />
          <Input
            name="universityName"
            placeholder="대학교 이름"
            value={value.universityName}
            onChange={handleInputChange}
          />
        </div>
      </FormControl>
      <FormControl label="학과 계열">
        <MultipleSelect
          selectedIndex={value.departmentGroup}
          setSelectedIndex={handleSelectedIndexChange('departmentGroup')}
          optionList={departmentGroupList}
        />
      </FormControl>
      <FormControl label="학과">
        <UnitInput
          inputProps={{
            type: 'text',
            name: 'department',
            value: value.department,
            onChange: handleInputChange,
          }}
          unit="학과/학부"
        />
      </FormControl>
      <FormControl label="재적상태">
        <BinarySelect
          selectedIndex={value.enrollmentStatus}
          setSelectedIndex={handleSelectedIndexChange('enrollmentStatus')}
          optionList={enrollmentStatusList}
        />
      </FormControl>
      <FormControl label="수료학기">
        <UnitInput
          inputProps={{
            type: 'number',
            name: 'sememster',
            value: value.sememster,
            onChange: handleInputChange,
          }}
          unit="학기"
        />
      </FormControl>
      <FormControl label="총 학점">
        <div className="grid grid-cols-7 gap-4">
          <Input
            type="number"
            name="totalGpa"
            placeholder="총 학점"
            value={value.totalGpa}
            onChange={handleInputChange}
            className="col-span-4"
          />
          <Dropdown
            selectedIndex={value.maxGpa}
            setSelectedIndex={handleSelectedIndexChange('maxGpa')}
            itemList={maxGpaList}
            placeholder="최대 학점"
            className="col-span-3"
          />
        </div>
      </FormControl>
      <FormControl label="직전 학기 학점">
        <div className="grid grid-cols-7 gap-4">
          <Input
            type="number"
            name="previousGpa"
            placeholder="직전 학기 학점"
            value={value.previousGpa}
            onChange={handleInputChange}
            className="col-span-4"
          />
          <Dropdown
            selectedIndex={value.maxGpa}
            setSelectedIndex={handleSelectedIndexChange('maxGpa')}
            itemList={maxGpaList}
            placeholder="최대 학점"
            className="col-span-3"
          />
        </div>
      </FormControl>
    </PrivacySectionLayout>
  );
};

export default SecondPrivacySection;
