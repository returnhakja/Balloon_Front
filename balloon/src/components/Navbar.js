import styles from '../css/Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { logoutFunc, getCookie } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import { useEffect, useState } from 'react';

function Navbar({ setEmpInfo, empInfo, logout, isLogin }) {
  const cookies = new Cookies();

  function activeStyle({ isActive }) {
    return {
      textDecoration: 'none',
      fontSize: isActive ? '24px' : undefined,
      color: isActive ? '#00AAFF' : 'black',
      background: 'white',
    };
  }

  useEffect(() => {
    if (isLogin === true) {
      getCookie(cookies);

      if (cookies.cookies.accessToken) {
        getMe(setEmpInfo);
      } else {
        logoutFunc(logout);
        localStorage.setItem('logged', false);
      }
    }
  }, [isLogin]);

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

        {isLogin ? (
          <div className="imgflex">
            {' '}
            {empInfo.empName} {empInfo.position}{' '}
            <button
              type="button"
              className={styles.btnnav}
              onClick={() => logoutFunc(logout)}>
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
      </div>
    </header>
  );
}

export default Navbar;
