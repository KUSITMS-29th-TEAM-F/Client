import Header from '../../components/foundation/header/Header';
import ReviewsMain from '../../components/foundation/main/ReviewsMain';

const FoundationDetail = () => {
  return (
    <div className="relative px-4 pb-16">
      <div className="mx-auto w-full max-w-screen-lg">
        <Header />
        <div className="h-[0.5rem]">
          <div className="absolute left-0 h-[0.5rem] w-screen bg-gray-05" />
        </div>
        <ReviewsMain />
      </div>
    </div>
  );
};

export default FoundationDetail;
