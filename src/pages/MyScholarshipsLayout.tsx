import { Outlet } from 'react-router-dom';
import Header from '../components/my-scholarships/Header';
import GrayBackground from '../components/ui/global-style/GrayBackground';

const MyScholarshipsLayout = () => {
  return (
    <div>
      <GrayBackground />
      <Header />
      <Outlet />
    </div>
  );
};

export default MyScholarshipsLayout;
