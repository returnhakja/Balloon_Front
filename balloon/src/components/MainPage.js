import styles from '../css/Navbar.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import React from 'react';

function MainPage() {
  const [empInfo, setEmpInfo] = useOutletContext();
  return (
    <div>
      <header className={styles.header}>
        <img
          src={`${process.env.PUBLIC_URL}/asset/banner.png`}
          alt="BALLOON"
          className={styles.img}></img>
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
              <Link to={'/LoginPage'}>
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
