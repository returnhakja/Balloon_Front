import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function PrivateRoutes({ empId, setEmpId, empInfo, setEmpInfo, cookie }) {
  useEffect(() => {
    console.log(empId);
    console.log(empInfo);
    console.log(cookie);
  }, []);

  return !!empId ? (
    <Outlet context={[setEmpId, empInfo, setEmpInfo]} />
  ) : (
    <Navigate to="/loginpage" />
  );
}

export default PrivateRoutes;
