import { Outlet } from 'react-router-dom';

import NavBar from '../nav-bar/NavBar';
import ScrollToTop from '../ScrollToTop';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
