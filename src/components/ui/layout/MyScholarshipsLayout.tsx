import { Outlet } from 'react-router-dom';
import Header from '../../my-scholarships/Header';
import GrayBackground from '../global-style/GrayBackground';

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
