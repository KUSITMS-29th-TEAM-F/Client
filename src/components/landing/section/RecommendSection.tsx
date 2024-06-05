const RecommendSection = () => {
  return (
    <section className="flex justify-center bg-gray-05 pb-16 pt-12">
      <div className="flex w-[20rem] flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div>
            <img
              src="/images/landing/logo-black.svg"
              alt="검정색 로고 아이콘 이미지"
            />
          </div>
          <h2 className="title-md-300 text-gray-90">
            오직 나를 위한 맞춤 장학금 추천
          </h2>
          <p className="text-sm-extra text-center text-gray-40">
            개개인의 온보딩 정보를 기반으로
            <br />
            지원 가능한 장학금을 추천해요
          </p>
        </div>
        <div className="h-[30rem] w-full">
          <img
            src="/images/landing/phone2.png"
            alt="스마트폰 이미지 2"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};

export default RecommendSection;
