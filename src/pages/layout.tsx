import { Outlet } from 'react-router-dom';

import NavBar from '../components/ui/nav-bar/NavBar';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
