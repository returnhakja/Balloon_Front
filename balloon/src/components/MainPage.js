import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  // endlessWork,
  endWork,
  findWorkOff,
  findWorkOn,
  startWork,
} from '../context/EmpTimeAxios';
import moment from 'moment';
import 'moment/locale/ko';
import Banner from './banner.svg';
import styles from '../css/nav/Navbar.module.css';
import { Button } from '@mui/material';

function MainPage() {
  const [empInfo] = useOutletContext();
  const [inCnt, setInCnt] = useState(0);
  const [outCnt, setOutCnt] = useState(0);

  // 시간 설정
  const nowTime = moment().format('HHmmss');

  useEffect(() => {
    if (empInfo.length !== 0) {
      if (!!empInfo) {
        findWorkOn(empInfo.empId, setInCnt);
        findWorkOff(empInfo.empId, setOutCnt);
      }
    }
  }, [empInfo.length, inCnt, outCnt]);

  const WorkStart = () => {
    if (inCnt === 1) {
      alert('이미 출근 등록을 하였습니다!');
    } else {
      if (nowTime <= process.env.REACT_APP_WORK_IN) {
        empInfo && startWork(empInfo.empId);
        alert('출근 등록을 하였습니다!');
      } else {
        alert('18시 30분이 지났습니다!!!');
      }
    }
  };

  const WorkEnd = () => {
    if (inCnt === 0) {
      alert('오늘 출근 등록을 하지 않았습니다!');
    } else {
      if (outCnt === 1) {
        alert('이미 퇴근 등록을 하였습니다!');
      } else {
        if (nowTime <= process.env.REACT_APP_WORK_IN) {
          empInfo && endWork(empInfo.empId);
          alert('퇴근 등록을 하였습니다!');
        } else {
          alert('야근 등록을 해야 합니다!!');
        }
      }
    }
  };

  useEffect(() => {}, [inCnt]);

  // const WorkEndless = () => {
  //   empInfo && endlessWork(empInfo.empId);
  // };

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
                {inCnt === 0 ? (
                  <div>
                    <p>아직 출근 등록을 하지 않았습니다.</p>
                    <p>출근 등록을 해주세요.</p>
                  </div>
                ) : outCnt === 0 ? (
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
