const CoverLetterSection = () => {
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
            장학금 지원을 위한 자기소개서 작성
          </h2>
          <p className="text-sm-extra text-center text-gray-40">
            장학금 지원을 위해 필요한 자기소개서를
            <br />
            바로 작성하고, 공고 별로 관리해요
            <br />
          </p>
        </div>
        <div className="h-[30rem] w-full">
          <img
            src="/images/landing/phone4.png"
            alt="스마트폰 이미지 2"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};

export default CoverLetterSection;
