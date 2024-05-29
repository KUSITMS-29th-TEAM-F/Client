import { useEffect } from 'react';

const HeaderHide = () => {
  useEffect(() => {
    const header = document.querySelector(
      '.my-scholarships-header',
    ) as HTMLElement;
    header.style.display = 'none';

    return () => {
      header.style.display = 'block';
    };
  }, []);

  return null;
};

export default HeaderHide;
