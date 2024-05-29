export const genderList = ['남', '여'];

export const yearList = Array.from({ length: 100 }, (_, i) => `${2024 - i}`);

export const cityList = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];

export const areaList = [
  '송파구',
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];
export const universityTypeList = ['대학(4년제)', '전문대학'];

export const universityCityList = cityList;

export const departmentGroupList = [
  '인문사회계열',
  '상경계열',
  '교육계열',
  '공학계열',
  '자연계열',
  '의학계열',
  '예체능계열',
];

export const enrollmentStatusList = ['재학', '휴학'];

export const maxGpaList = ['4.5', '4.3'];

export const incomeBracketList = Array.from({ length: 11 }, (_, i) => `${i}`);

export const supportIncomeBracketList = Array.from(
  { length: 9 },
  (_, i) => `${i + 1}`,
);

export const socialSupportBracketList = [
  '해당없음',
  '장애인',
  '국가유공자',
  '다문화가정',
  '기초생활수급자',
  '차상위계층',
  '한부모가정',
];
