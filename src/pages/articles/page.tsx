import NoteIcon from '@/components/ui/icon/NoteIcon';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleList {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

const ArticleListPage = () => {
  const topArticle: ArticleList = {
    id: 1,
    title: '건강보험료 자격득실확인서 발급 방법은?',
    description: '건강보험료 자격득실 확인서 발급 방법 알아보기!',
    imageSrc: '/images/article/article1.jpeg',
  };

  const articleList: ArticleList[] = [
    {
      id: 2,
      title: '장학재단 소득분위 산정은 어떻게 이뤄질까?',
      description: '매학기 장학재단에서 우리의 소득분위를 산정하여 장학금을...',
      imageSrc: '/images/article/article2.jpeg',
    },
    {
      id: 3,
      title: '장학금 자기소개서 잘 쓰는 방법을 공개합니다 !',
      description: '장학금을 지원하기 위해서는 자기소개서를 필요로 하는...',
      imageSrc: '/images/article/article3.jpeg',
    },
    {
      id: 4,
      title:
        '교내장학금, 기업장학금, 국가장학금 .. 이게 다 뭐지? 장학금 종류 알아보기',
      description: '생각보다 수많은 장학금 제도가 존재한다는 사실을 다들...',
      imageSrc: '/images/article/article4.jpeg',
    },
    {
      id: 5,
      title: '유니브핏으로 영리하게 장학금 일정 관리하는 방법 ?!',
      description: '장학금을 받기 위해서는 다양한 일정을 관리해야 합니...',
      imageSrc: '/images/article/article5.jpeg',
    },
    {
      id: 6,
      title: '장학재단 소득분위 산정은 어떻게 이뤄질까?',
      description: '매학기 장학재단에서 우리의 소득분위를 산정하여 장학금을...',
      imageSrc: '/images/article/article6.jpeg',
    },
  ];

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-screen-md">
        <header>
          <section>
            <Link
              href={`/articles/${topArticle.id}`}
              className="relative block aspect-[14/10] w-full overflow-hidden md:aspect-video md:rounded-lg"
              style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 28.28%, rgba(0, 0, 0, 0.40) 100%), url(${topArticle.imageSrc}) lightgray 50% / cover no-repeat`,
              }}
            >
              <div className="absolute bottom-6 flex flex-col gap-2 px-6">
                <h2 className="title-md-300 line-clamp-1 text-gray-00">
                  {topArticle.title}
                </h2>
                <p className="text-md-200 line-clamp-1 text-gray-00">
                  {topArticle.description}
                </p>
              </div>
            </Link>
          </section>
          <section>
            <div className="flex items-center gap-2 px-6 pb-2 pt-6">
              <div>
                <Image
                  src="/icons/menu/articles-icon.svg"
                  alt="아티클"
                  width={20}
                  height={20}
                />
              </div>
              <h1 className="title-md-300 text-gray-90">아티클</h1>
            </div>
          </section>
        </header>
        <main>
          <ul>
            {articleList.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/articles/${article.id}`}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className="relative aspect-square w-[5rem] overflow-hidden rounded-lg">
                    <Image src={article.imageSrc} alt={article.title} fill />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <h2 className="text-lg-200 line-clamp-2 text-gray-90">
                      {article.title}
                    </h2>
                    <p className="text-md-200 line-clamp-1 text-gray-40">
                      {article.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ArticleListPage;
