import GrayBackground from '@/components/ui/global-style/GrayBackground';
import Header from '@/components/my-scholarships/Header';

const MyScholarshipsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GrayBackground />
      <Header />
      {children}
    </div>
  );
};

export default MyScholarshipsLayout;
