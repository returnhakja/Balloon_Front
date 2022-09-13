import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Banner from './banner.svg';
import styles from '../css/nav/Navbar.module.css';
import { Button } from '@mui/material';
import {
  // endlessWork,
  endWork,
  findWorkIn,
  startWork,
} from '../context/EmpTimeAxios';

function MainPage({ workStatus, setWorkStatus }) {
  const [empInfo] = useOutletContext();

  const WorkStart = () => {
    empInfo && startWork(empInfo.empId, setWorkStatus);
  };

  const WorkEnd = () => {
    empInfo && endWork(empInfo.empId, setWorkStatus);
  };

  // const WorkEndless = () => {
  //   empInfo && endlessWork(empInfo.empId, setWorkStatus);
  // };

  useEffect(() => {
    if (empInfo.length !== 0) {
      !!empInfo && findWorkIn(empInfo.empId, setWorkStatus);
    }
  }, [empInfo.length, workStatus]);

  return (
    <div>
      <header className={styles.header}>
        <img
          // src={`${process.env.PUBLIC_URL}/asset/banner.svg`}
          src={Banner}
          alt="BANNER"
          className={styles.img}></img>
      </header>
      <div className={styles.logingo}>
        <div className={styles.logcon}>
          <h1 className={styles.h1}>BALLOON</h1>
          {empInfo.empName ? (
            <div>
              <div>
                <br />
                <p className={styles.pbottom}>
                  {empInfo.empName + ' ' + empInfo.position}님 오신것을
                  환영합니다.
                </p>
                <br />
              </div>
              <div style={{ marginTop: '50px' }}>
                {workStatus ? (
                  <div>
                    <p>출근 상태입니다.</p>
                    <p>일을 하세요.</p>
                  </div>
                ) : (
                  <div>
                    <p>퇴근 상태입니다.</p>
                    <p>고생하셨습니다.</p>
                  </div>
                )}

                <Button sx={{ fontSize: '100px' }} onClick={() => WorkStart()}>
                  출근
                </Button>
                <Button sx={{ fontSize: '100px' }} onClick={() => WorkEnd()}>
                  퇴근
                </Button>
                {/* {workStatus && (
                  <Button
                    sx={{ fontSize: '100px' }}
                    onClick={() => WorkEndless()}>
                    야근
                  </Button>
                )} */}
              </div>
            </div>
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
