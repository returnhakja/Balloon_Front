import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Banner from './banner.svg';
import styles from '../css/nav/Navbar.module.css';
import { Avatar, Box, Button, Container } from '@mui/material';
import {
  // endlessWork,
  endWork,
  findWorkOff,
  findWorkOn,
  startWork,
} from '../context/EmpTimeAxios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/ko';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['상신한', '완료된', '저장된', '반려된'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      // borderWidth: 1,
    },
  ],
};

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

  // const WorkEndless = () => {
  //   empInfo && endlessWork(empInfo.empId);
  // };

  return (
    <div>
      <header className={styles.header}>
        <img src={Banner} alt="BANNER" className={styles.img}></img>
      </header>
      <div
        style={{
          padding: '30px',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
        <Box
          sx={{
            backgroundColor: '#EEEEEE',
            mt: 20,
            width: '250px',
            height: '200px',
            position: 'relative',
            boxShadow: '0px 0px 25px hsla(0, 0%, 71%, 1)',
          }}>
          <p style={{ padding: '10px' }}>내 정보</p>

          <div
            style={{
              display: 'grid',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />

            <p>{empInfo.empName + ' ' + empInfo.position}</p>
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                transform: 'translate(50%)',
              }}>
              <Button sx={{ fontSize: '24px' }} onClick={() => WorkStart()}>
                출근
              </Button>
              <Button sx={{ fontSize: '24px' }} onClick={() => WorkEnd()}>
                퇴근
              </Button>
            </div>
          </div>
        </Box>

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
        <div
          id="myChart"
          style={{
            width: '250px',
            height: '400px',
            marginTop: '15vh',
            backgroundColor: '#EEEEEE',
            boxShadow: '0px 0px 25px hsla(0, 0%, 71%, 1)',
          }}>
          <p style={{ padding: '10px' }}>결재관리</p>
          <Pie data={data} />
          <div style={{ textAlign: 'center' }}>
            <br />
            <p>상신한 : 19 완료된 : 5</p>
            <p>저장된 : 1 반려된 : 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
