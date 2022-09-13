import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function PrivateRoutes({ empInfo, setEmpInfo, isLogin, setLogin }) {
  const [check, setCheck] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const logged = localStorage.getItem('logged');
    logged && logged === 'true' ? setLogin(true) : setLogin(false);

    setCheck(!check);
  }, []);

  return (
    check &&
    (isLogin ? (
      <Outlet context={[empInfo, setEmpInfo]} />
    ) : (
      <>
        {cookies.remove('accessToken')}
        <Navigate to="/loginpage" />
      </>
    ))
  );
}

export default PrivateRoutes;
