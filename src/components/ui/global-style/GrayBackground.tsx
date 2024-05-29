import { useEffect } from 'react';

const GrayBackground = () => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLElement;
    body.style.backgroundColor = '#f2f2f3';

    return () => {
      body.style.backgroundColor = '#ffffff';
    };
  }, []);

  return null;
};

export default GrayBackground;
