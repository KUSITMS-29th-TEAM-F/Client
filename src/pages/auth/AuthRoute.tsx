import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthRoute = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      navigate('/login');
    }
  }, []);

  if (accessToken && refreshToken) {
    return <Outlet />;
  }

  return null;
};

export default AuthRoute;
