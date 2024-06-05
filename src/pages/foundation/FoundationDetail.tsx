import Header from '../../components/foundation/header/Header';
import ReviewsSection from '../../components/foundation/section/ReviewsSection';

const FoundationDetail = () => {
  return (
    <div className="relative px-4">
      <div className="mx-auto w-full max-w-screen-lg">
        <Header />
        <div className="h-[0.5rem]">
          <div className="absolute left-0 h-[0.5rem] w-screen bg-gray-05" />
        </div>
        <ReviewsSection />
      </div>
    </div>
  );
};

export default FoundationDetail;
