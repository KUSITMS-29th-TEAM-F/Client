export interface PrivacyInputValue {
  gender: number | null;
  year: number | null;
  city: number | null;
  area: number | null;
  familySize: string;
  universityType: number | null;
  universityCity: number | null;
  universityName: string;
  departmentGroup: number | null;
  department: string;
  enrollmentStatus: number | null;
  sememster: string;
  totalGpa: string;
  previousGpa: string;
  maxGpa: number | null;
  incomeBracket: number | null;
  supportIncomeBracket: number | null;
  monthlyIncome: string;
  socialSupportBracket: number | null;
}

export interface PrivacySectionProps {
  value: PrivacyInputValue;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedIndexChange: (
    key: keyof PrivacyInputValue,
  ) => (index: number | null) => void;
  isVisible?: boolean;
}
