// import logo from '%PUBLIC_URL%/asset/logo.png';
// import logo from {\\`${process.env.PUBLIC_URL}/asset/logo.png`};

import styles from '../css/Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
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
                  <li className={styles.lii}>결재관리</li>
                </Link>
                <li className={styles.lii}>캘린더</li>
                <li className={styles.lii}>메신저</li>
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
    </div>
  );
}

export default Navbar;
