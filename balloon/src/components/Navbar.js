import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { logoutFunc, getCookie } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import styles from '../css/nav/Navbar.module.css';
import '../css/nav/Navbar.css';
import { Avatar, Button } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ClearIcon from '@mui/icons-material/Clear';
import ChatStomp from '../pages/chat/ChatStomp';

function Navbar({ setEmpInfo, empInfo, logout, isLogin }) {
  const cookies = new Cookies();
  const [isMobile, setIsMobile] = useState(false);

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
    <nav className="navbar">
      <Link to={'/'} className={styles.Link}>
        <div className={styles.logo}>
          BALL<span className={styles.oofont}>OO</span>N
        </div>
      </Link>
      <ul
        className={isMobile ? 'nav-links-mobile' : 'nav-links'}
        onClick={() => setIsMobile(false)}>
        <NavLink to={'/boxes'} style={activeStyle}>
          <li className="approval">결재관리</li>
        </NavLink>
        <NavLink to={'/schudule'} style={activeStyle}>
          <li className="celendar">캘린더</li>
        </NavLink>
        <NavLink to={'/organization'} style={activeStyle}>
          <li className="management">조직도</li>
        </NavLink>
        {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' && (
          <NavLink to={'/management/unit'} style={activeStyle}>
            <li className="unit">조직관리</li>
          </NavLink>
        )}
        {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' && (
          <NavLink to={'/management/employee'} style={activeStyle}>
            <li className="unit">사원관리</li>
          </NavLink>
        )}
        {isLogin && (
          <NavLink to={'/mypage'} style={activeStyle}>
            <li className="unit">마이페이지</li>
          </NavLink>
        )}
      </ul>

      <ul>
        {isLogin ? (
          empInfo.length !== 0 ? (
            <div className={styles.namediv}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                }}
                src={
                  !!empInfo.photo
                    ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${empInfo.photo}`
                    : `${process.env.REACT_APP_AWS_S3_DEFAULT}`
                }
              />
              <span className="login">
                {`${empInfo.empName}${' '}${empInfo.position}`}
              </span>
              <Button
                type="button"
                variant="outlined"
                size="small"
                className={styles.btnnav}
                onClick={() => {
                  logoutFunc(logout);
                }}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.namediv}>
              <span className="login">일시적 오류</span>
              <Button
                type="button"
                variant="outlined"
                size="small"
                className={styles.btnnav}
                onClick={() => {
                  logoutFunc(logout);
                }}>
                Logout
              </Button>
            </div>
          )
        ) : (
          <div className={styles.namediv}>
            <Link to={'/loginpage'}>
              <p className="login">
                <Button
                  // className={styles.btnnav}
                  variant="contained"
                  size="small">
                  Login
                </Button>
              </p>
            </Link>
          </div>
        )}
        <button
          className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <ClearIcon /> : <MenuOpenIcon />}
        </button>
      </ul>
    </nav>
  );
}

export default Navbar;
