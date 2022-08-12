import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function PrivateRoutes({ empInfo, setEmpInfo, isLogin, setLogin }) {
  const [check, setCheck] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const l = localStorage.getItem('logged');
    l && JSON.parse(l) ? setLogin(true) : setLogin(false);

    setCheck(!check);
  }, []);

  return check ? (
    isLogin ? (
      <Outlet context={[empInfo, setEmpInfo]} />
    ) : (
      <>
        {cookies.remove('accessToken')}
        <Navigate to="/loginpage" />
      </>
    )
  ) : null;
}

export default PrivateRoutes;
