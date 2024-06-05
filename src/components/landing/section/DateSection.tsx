const DateSection = () => {
  return (
    <section className="flex justify-center bg-gray-80 pb-16 pt-12">
      <div className="flex w-[23rem] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div>
            <img
              src="/images/landing/logo-white.svg"
              alt="검정색 로고 아이콘 이미지"
            />
          </div>
          <h2 className="title-md-300 text-white">
            장학금 일정을 간편하게 관리
          </h2>
          <p className="text-sm-extra text-center text-gray-40">
            장학금을 저장하고 관리할 수 있어
            <br />
            지원기간을 놓치지 않아요
          </p>
        </div>
        <div className="h-[30rem] w-full">
          <img
            src="/images/landing/phone3.png"
            alt="스마트폰 이미지 2"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};

export default DateSection;
