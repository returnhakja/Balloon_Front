// import logo from '%PUBLIC_URL%/asset/logo.png';
// import logo from {\\`${process.env.PUBLIC_URL}/asset/logo.png`};

import styles from '../css/Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import Cookies from 'universal-cookie';
import { logout } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import { useEffect, useState } from 'react';
import { Button, Container, TextField } from '@mui/material';

function Navbar({ setEmpId, empInfo }) {
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
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.imgflex}>
          <Link to={'/'} className={styles.Link}>
            <h2>
              BALL<span className={styles.oofont}>OO</span>N{' '}
            </h2>
          </Link>
        </div>
        <ul className={styles.ulmarginn}>
          <NavLink to={'/boxs'} style={activeStyle}>
            <li className={styles.lii}>결재관리</li>
          </NavLink>
          <NavLink to={'/calendar'} style={activeStyle}>
            <li className={styles.lii}>캘린더</li>
          </NavLink>
          <NavLink to={'/chatroom'} style={activeStyle}>
            <li className={styles.lii}>메신저</li>
          </NavLink>
          <NavLink to={'/organization'} style={activeStyle}>
            <li className={styles.lii}>조직도</li>
          </NavLink>
          {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
            <NavLink to={'/management/unit'} style={activeStyle}>
              <li className={styles.lii}>조직관리</li>
            </NavLink>
          ) : null}
          {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
            <NavLink to={'/management/employee'} style={activeStyle}>
              <li className={styles.lii}>사원관리</li>
            </NavLink>
          ) : null}
        </ul>

        {accessCookie ? (
          <ul className={styles.namediv}>
            <li className={styles.nameli}>
              {' '}
              {empInfo.empName} {empInfo.position}
            </li>

            <li className={styles.nameli}>
              <Button onClick={logout} variant="outlined">
                Logout
              </Button>
            </li>
          </ul>
        ) : (
          <ul className={styles.namediv}>
            <Link to={'/loginpage'}>
              <li className={styles.nameli}>
                <Button className={styles.btnnav} variant="contained">
                  Login
                </Button>
              </li>
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Navbar;
