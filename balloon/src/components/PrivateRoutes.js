import { Outlet, Navigate } from 'react-router-dom';
import { Link, useOutletContext } from 'react-router-dom';
import { getCookie } from '../context/AuthFunc';

function PrivateRoutes({ empId, setEmpId, empInfo, setEmpInfo }) {
  return !!empId ? (
    <Outlet context={(setEmpId, empInfo, setEmpInfo)} />
  ) : (
    <Navigate to="/loginpage" />
  );
}

export default PrivateRoutes;
