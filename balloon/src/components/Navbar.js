import styles from '../css/Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import Cookies from 'universal-cookie';
import { logout } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import { useEffect, useState } from 'react';

function Navbar({ setEmpId, empInfo, setLogin }) {
  const cookies = new Cookies();
  const [accessCookie, setAccessCookie] = useState('');

  function activeStyle({ isActive }) {
    return {
      textDecoration: 'none',
      fontSize: isActive ? '24px' : undefined,
      color: isActive ? '#00AAFF' : 'black',
      background: 'white',
    };
  }

  useEffect(() => {
    cookies.get('accessToken');
    if (cookies.cookies.accessToken) {
      setAccessCookie(cookies.cookies.accessToken);

      getMe(setEmpId);
    }
  }, [accessCookie]);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.contents}>
          <Link to={'/'} className={styles.Link}>
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/asset/logo.png`}
                alt="풍선"
                className={styles.ballon}
              />
              <strong className={styles.ballonfont}>
                {' '}
                BALL<span className={styles.oofont}>OO</span>N{' '}
              </strong>
            </div>
          </Link>

          <div className={styles.ulll}>
            <ul className={styles.ulmarginn}>
              <NavLink to={'/box'} style={activeStyle}>
                <Box className={styles.lii}>결재관리</Box>
              </NavLink>
              <NavLink to={'/calendar'} style={activeStyle}>
                <Box className={styles.lii}>캘린더</Box>
              </NavLink>
              <NavLink to={'/chatemplist'} style={activeStyle}>
                <Box className={styles.lii}>메신저</Box>
              </NavLink>
              <NavLink to={'/organization'} style={activeStyle}>
                <Box className={styles.lii}>조직도</Box>
              </NavLink>
              {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
                <NavLink to={'/management/unit'} style={activeStyle}>
                  <Box className={styles.lii}>조직관리</Box>
                </NavLink>
              ) : null}
              {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
                <NavLink to={'/management/employee'} style={activeStyle}>
                  <Box className={styles.lii}>사원관리</Box>
                </NavLink>
              ) : null}
            </ul>
          </div>
          {accessCookie ? (
            <div>
              <span>
                {' '}
                {empInfo.empName} {empInfo.position}{' '}
              </span>
              <button type="button" className={styles.btnnav} onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={'/loginpage'}>
              <button type="button" className={styles.btnnav}>
                Login
              </button>
            </Link>
          )}

          <div className="text-end"></div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
