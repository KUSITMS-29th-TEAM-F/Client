import { useEffect } from 'react';

const NavBarHide = () => {
  useEffect(() => {
    const navBar = document.querySelector('.nav-bar') as HTMLElement;
    if (navBar) {
      navBar.style.display = 'none';
    }

    return () => {
      if (navBar) {
        navBar.style.display = 'block';
      }
    };
  }, []);

  return null;
};

export default NavBarHide;
