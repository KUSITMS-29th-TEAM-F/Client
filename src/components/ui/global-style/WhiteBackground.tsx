import { useEffect } from 'react';

const WhiteBackground = () => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLElement;
    body.style.backgroundColor = '#ffffff';

    return () => {
      body.style.backgroundColor = '#ffffff';
    };
  }, []);

  return null;
};

export default WhiteBackground;
