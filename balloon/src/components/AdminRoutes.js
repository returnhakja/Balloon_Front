import { Outlet, Navigate } from 'react-router-dom';

function AdminRoutes({ empInfo, setEmpInfo, role }) {
  return (
    !!role &&
    (role === 'ROLE_ADMIN' ? (
      <Outlet context={[empInfo, setEmpInfo]} />
    ) : (
      <>
        {alert('사용 권한이 없습니다.')}
        <Navigate to="/" />
      </>
    ))
  );
}

export default AdminRoutes;
