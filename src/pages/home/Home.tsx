import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import ArticleItem from '../../components/home/ArticleItem';
import Axios from '../../api/axios';

const Home = () => {
  const navigate = useNavigate();

  const [popularScholarshipList, setPopularScholarshipList] = useState<
    {
      announcementId: number;
      scholarShipName: string;
      content: string;
      scholarshipFoundation: string;
      scholarShipImage: string;
      applicationPeriod: string;
      howManyLikes: string;
    }[]
  >([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useQuery({
    queryKey: ['home', 'announcements'],
    queryFn: async () => {
      const res = await Axios.get('/home/announcements');
      setPopularScholarshipList(res.data.data.popularAnnouncementResponses);
      return res.data;
    },
  });

  const articleList: { title: string; imageSrc: string }[] = [
    {
      title: '건강보험료 자격득실확인서 발급 방법은 ?',
      imageSrc: '/images/article/article1.jpeg',
    },
    {
      title: '장학재단 소득분위 산정은 어떻게 이뤄질까?',
      imageSrc: '/images/article/article2.jpeg',
    },
    {
      title: '장학금 자기소개서 잘 쓰는 방법을 공개합니다!',
      imageSrc: '/images/article/article3.jpeg',
    },
    {
      title: '교내장학금, 기업장학금, 국가장학금 .. 이게 다 뭐지?',
      imageSrc: '/images/article/article4.jpeg',
    },
    {
      title: '유니브핏으로 영리하게 장학금 일정 관리하는 방법 ?!',
      imageSrc: '/images/article/article5.jpeg',
    },
    {
      title: '장학재단 소득분위 산정은 어떻게 이뤄질까?',
      imageSrc: '/images/article/article6.jpeg',
    },
  ];

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const refreshToken = localStorage.getItem('refresh-token');

    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/landing');
    }
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main>
      <section className="px-3 pb-6 pt-2">
        <Link
          to="/scholarships/1"
          className="relative mx-auto flex w-full max-w-screen-lg justify-between overflow-hidden rounded-2xl bg-[#18181A] px-6 py-4 text-gray-00"
          style={{
            background: 'linear-gradient(93deg, #FAB928 0%, #F06E10 100%)',
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="title-sm-300">최대 200만원 혜택?</span>
            <span className="text-lg-200">
              성적 기준 없는 장학금 지원하러가기
            </span>
          </div>
          <div className="opacity-30 mix-blend-screen">
            <img
              src="/images/banner-logo.svg"
              alt="배너 로고"
              width={64}
              height={56}
            />
          </div>
        </Link>
      </section>
      <section className="bg-gray-05 p-4">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-4">
          <div className="flex justify-between">
            <h1 className="title-md-300 text-gray-80">인기 장학금 공고</h1>
            <Link to="/scholarships" className="text-lg-200 text-gray-30">
              전체보기
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularScholarshipList.map((scholarship) => (
              <li key={scholarship.announcementId}>
                <Link
                  to={`/scholarships/${scholarship.announcementId}`}
                  className="block rounded-2xl border border-gray-10 bg-gray-00 p-4"
                >
                  <div className="flex items-start">
                    <div className="relative aspect-square w-[4rem] overflow-hidden rounded-lg">
                      <img
                        src={scholarship.scholarShipImage}
                        alt={scholarship.scholarShipName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex flex-1 flex-col gap-1">
                      <h2 className="text-md-300 line-clamp-1 text-gray-70">
                        {scholarship.scholarShipName}
                      </h2>
                      <p className="text-md-200 text-gray-40">
                        {scholarship.scholarshipFoundation}
                      </p>
                      <p className="caption-200 text-gray-30">
                        {scholarship.applicationPeriod}
                      </p>
                    </div>
                  </div>
                  <div className="text-md-200 mt-2 text-primary">
                    {scholarship.howManyLikes}명이 찜했어요!
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="px-4 py-6 pb-16">
        <div className="mx-auto max-w-screen-lg">
          <div className="flex justify-between px-2">
            <div className="flex items-end gap-2">
              <h1 className="title-md-300 text-gray-80">아티클</h1>
              <span className="text-md-200 text-gray-40">장학금 지원 A-Z!</span>
            </div>
            <Link to="/articles" className="text-lg-200 text-gray-30">
              전체보기
            </Link>
          </div>
          <ul className="mt-4 flex w-[calc(100vw-(100vw-100%)+1rem)] gap-4 overflow-x-auto">
            {articleList.map((article, index) => (
              <ArticleItem key={index} {...article} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
