import Footer from '../../components/landing/footer/Footer';
import CoverLetterSection from '../../components/landing/section/CoverLetterSection';
import DateSection from '../../components/landing/section/DateSection';
import RecommendSection from '../../components/landing/section/RecommendSection';
import TopSection from '../../components/landing/section/TopSection';

const Landing = () => {
  return (
    <div className="flex-1">
      <main>
        <TopSection />
        <RecommendSection />
        <DateSection />
        <CoverLetterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
