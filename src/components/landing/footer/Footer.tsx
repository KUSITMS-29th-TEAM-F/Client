const Footer = () => {
  return (
    <footer className="bg-gray-80 p-6">
      <div className="flex items-center gap-1 opacity-80">
        <div>
          <img src="/images/landing/logo-gray.svg" alt="유니브핏 아이콘" />
        </div>
        <div>
          <img src="/images/landing/logo-text-gray.svg" alt="유니브핏 로고" />
        </div>
      </div>
      <div className="text-md-100 mt-4 text-gray-50">
        <div>(주) 유니브핏</div>
        <div>Copyright ©univfit. All Rights Reserved.</div>
      </div>
      <div className="mt-8 flex items-center gap-2 opacity-30">
        <div>
          <img src="/images/landing/kusitms-logo.svg" alt="큐시즘 로고" />
        </div>
        <div className="text-sm-200 text-white">|</div>
        <div className="w-[5.5rem]">
          <img
            src="/images/landing/naver-clova-logo.png"
            alt="네이버 클로바 로고"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
