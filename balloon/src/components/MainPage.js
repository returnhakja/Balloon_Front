import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Banner from './banner.svg';
import styles from '../css/nav/Navbar.module.css';

function MainPage() {
  const [empInfo] = useOutletContext();
  return (
    <div>
      <header className={styles.header}>
        <img
          // src={`${process.env.PUBLIC_URL}/asset/banner.svg`}
          src={Banner}
          alt="BANNER"
          className={styles.img}></img>
        <span>dd</span>
      </header>
      <div className={styles.logingo}>
        <div className={styles.logcon}>
          <h1 className={styles.h1}>BALLOON</h1>
          {empInfo.empName ? (
            <>
              <br />
              <p className={styles.pbottom}>
                {empInfo.empName + ' ' + empInfo.position}님 오신것을
                환영합니다.
              </p>
              <br />
              <p>일을 하세요.</p>
            </>
          ) : (
            <>
              <p className={styles.pbottom}>
                오신것을 환영합니다. 먼저 로그인을 하세요.
              </p>
              <Link to={'/loginpage'}>
                <button className={styles.btn}> 로그인하러가기</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
