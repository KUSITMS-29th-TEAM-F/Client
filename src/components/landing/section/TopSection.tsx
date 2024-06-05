const TopSection = () => {
  return (
    <section
      className="flex min-h-[calc(100vh-68px)] items-center justify-center overflow-hidden px-9 pb-20 pt-8 sm:pb-8 lg:min-h-[calc(100vh-104px)]"
      style={{
        background: 'linear-gradient(180deg, #FAB928 11.04%, #F49652 100%)',
      }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-between lg:max-w-4xl lg:translate-x-20 lg:flex-row">
        <div>
          <div className="title-md-200 flex flex-col gap-1 text-white">
            <div>장학금 추천부터</div>
            <div>지원까지</div>
            <div>한 번에</div>
          </div>
          <div className="mt-4 h-[2rem] w-px bg-white" />
          <div className="mt-4">
            <img
              src="/images/landing/logo-text-white.svg"
              alt="흰색 로고 이미지"
            />
          </div>
          <p className="text-sm-extra mt-5 text-white">
            장학금 지원을 위한 수많은 정보와
            <br />
            지원 자격 여부를 더욱 쉽게 알아보고,
            <br />
            장학금을 간편하게 관리해요!
          </p>
        </div>
        <div className="mt-16 sm:mt-0 lg:w-[40rem]">
          <img
            src="/images/landing/phone1.png"
            alt="스마트폰 이미지 1"
            className="w-[100rem] scale-150 sm:scale-100"
          />
        </div>
      </div>
    </section>
  );
};

export default TopSection;
