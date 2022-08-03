// import logo from '%PUBLIC_URL%/asset/logo.png';
// import logo from {\\`${process.env.PUBLIC_URL}/asset/logo.png`};

import styles from '../css/Navbar.module.css';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';

function Navbar() {
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
                <Box className={styles.lii}>
                  {/* <li className={styles.lii}>결재관리</li> */}
                  결재관리
                </Box>
              </Link>
              <Link to={'/calendar'}>
                <li className={styles.lii}>캘린더</li>
              </Link>
              <li className={styles.lii}>메신저</li>
              <Link to={'/organization'}>
                <li className={styles.lii}>조직도</li>
              </Link>
            </ul>
          </div>
          <Link to={'/login'}>
            <button type="button" className={styles.btnnav}>
              Login
            </button>
          </Link>

          <div className="text-end"></div>
        </div>
      </header>

    </div>
  );
}

export default Navbar;
