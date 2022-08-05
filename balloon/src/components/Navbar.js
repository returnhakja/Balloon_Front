// import logo from '%PUBLIC_URL%/asset/logo.png';
// import logo from {\\`${process.env.PUBLIC_URL}/asset/logo.png`};

import styles from '../css/Navbar.module.css';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import Cookies from 'universal-cookie';
import { logout } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import { useEffect, useState } from 'react';

function Navbar({ setEmpId, empInfo }) {
  const cookies = new Cookies();
  const [accessCookie, setAccessCookie] = useState('');

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
              <Link to={'/box'}>
                <Box className={styles.lii}>결재관리</Box>
              </Link>
              <Link to={'/calendar'}>
                <Box className={styles.lii}>캘린더</Box>
              </Link>
              <Box className={styles.lii}>메신저</Box>
              <Link to={'/organization'}>
                <Box className={styles.lii}>조직도</Box>
              </Link>
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
