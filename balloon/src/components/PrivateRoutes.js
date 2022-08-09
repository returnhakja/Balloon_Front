import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Link, useOutletContext } from 'react-router-dom';
import { getCookie } from '../context/AuthFunc';
import Cookies from 'universal-cookie';

function PrivateRoutes({ empId, setEmpId, empInfo, setEmpInfo }) {
  const cookies = new Cookies();
  const [cookie, setCookie] = useState({});
  useEffect(() => {
    cookies.get('accessToken');
    setCookie(cookies.cookies);
  }, []);

  return !!cookie ? (
    <Outlet context={(setEmpId, empInfo, setEmpInfo)} />
  ) : (
    <Navigate to="/loginpage" />
  );
}

export default PrivateRoutes;
