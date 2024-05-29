import { getTokenCookie } from '@/app/actions/cookies';
import { PrivacyInputValue } from '@/interfaces/privacy';

export const fetchNickname = async (nickname: string, accessToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/onboards/nick-name`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ nickName: nickname }),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const fetchOnboarding = async (request: {
  schoolType: number | null;
  schoolName: string | null;
  schoolLocation: string | null;
  deptType: string | null;
  deptName: string | null;
  isPresent: boolean | null;
  semester: number | null;
  residence: string | null;
  residenceType: number | null;
  gender: number | null;
  birthYear: number | null;
  underPrivilegedInfo: string | null;
  totalFullGrade: number | null;
  totalGrade: number | null;
  lastFullGrade: number | null;
  lastGrade: number | null;
  incomeQuality: number | null;
  monthlyIncome: number | null;
  supportSection: number | null;
}) => {
  const accessToken = await getTokenCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/onboards`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
