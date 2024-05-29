import Image from 'next/image';

import GrayBackground from '@/components/ui/global-style/GrayBackground';
import LinkIcon from '@/components/ui/icon/LinkIcon';
import PencilCogIcon from '@/components/ui/icon/PencilCogIcon';
import UserCheckIcon from '@/components/ui/icon/UserCheckIcon';
import CheckupListIcon from '@/components/ui/icon/CheckupListIcon';
import Message2CogIcon from '@/components/ui/icon/Message2CogIcon';
import Link from 'next/link';
import { fetchMyInfo } from '@/api/mypage';

const MyPage = async () => {
  const res = await fetchMyInfo();
  const myInfo = res.data;

  console.log(myInfo);

  const menuList: {
    icon: React.ReactNode;
    label: React.ReactNode;
    description: React.ReactNode;
    href: string;
  }[] = [
    {
      icon: <UserCheckIcon />,
      label: '개인정보 관리',
      description: '맞춤 장학금 추천을 위한 개인정보 관리하기',
      href: '/me/privacy',
    },
    {
      icon: <CheckupListIcon />,
      label: '서류 관리',
      description: '맞춤 장학금 추천을 위한 개인정보 관리하기',
      href: '/me/documents',
    },
    {
      icon: <Message2CogIcon />,
      label: '후기 관리',
      description: '내가 작성한 장학금의 후기 관리하기',
      href: '/me/reviews',
    },
  ];

  return (
    <div>
      <GrayBackground />
      <div>
        <header className="fixed z-10 w-full bg-gray-00 p-4">
          <div className="mx-auto flex max-w-screen-lg items-center gap-2">
            <div className="overflow-hidden rounded-full">
              <Image
                src="/images/placeholders/placeholder-profile.png"
                alt="임시 프로필 이미지"
                width={88}
                height={88}
              />
            </div>
            <div className="flex flex-col gap-3 px-4 py-3">
              <div className="flex items-center gap-2">
                <h1 className="text-lg-300 text-gray-90">{myInfo.nickname}</h1>
                <div className="flex items-center text-gray-30">
                  <span>
                    <LinkIcon />
                  </span>
                  <span className="caption-300">
                    {myInfo.socialLoginName === 'kakao'
                      ? '카카오'
                      : myInfo.socialLoginName === 'naver' && '네이버'}{' '}
                    로그인
                  </span>
                </div>
              </div>
              <div className="flex">
                <button className="flex items-center gap-1 rounded-full border border-primary px-3 py-1.5 text-primary-80">
                  <span>
                    <PencilCogIcon />
                  </span>
                  <span className="caption-300">프로필 수정하기</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="h-[120px]" />
      </div>
      <main className="px-4">
        <ul className="mx-auto flex max-w-screen-lg flex-col gap-4 py-6">
          {menuList.map((menu, index) => (
            <li key={index}>
              <Link
                href={menu.href}
                className="flex items-center gap-4 rounded-2xl border border-gray-10 bg-gray-00 p-6"
              >
                <div>
                  <span className="text-[1.5rem]">{menu.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg-300 text-gray-80">{menu.label}</h2>
                  <p className="text-md-200 text-gray-40">{menu.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default MyPage;
