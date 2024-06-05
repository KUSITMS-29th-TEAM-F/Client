import { Outlet } from 'react-router-dom';
import Header from '../../my-scholarships/ui/Header';

const MyScholarshipsLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MyScholarshipsLayout;
