import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/nav-bar/NavBar";

import "./globals.css";
import "/public/styles/font.css";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
