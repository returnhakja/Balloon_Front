import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getDCountByDate } from '../context/ApprovalFunc';
import {
  // endlessWork,
  endWork,
  findWorkOff,
  findWorkOn,
  startWork,
} from '../context/EmpTimeAxios';
import Banner from './banner.svg';
import styles from '../css/nav/Navbar.module.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/ko';
import { Avatar, Box, Button } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);

function MainPage() {
  const [empInfo] = useOutletContext();
  const [inCnt, setInCnt] = useState(0);
  const [outCnt, setOutCnt] = useState(0);
  const [rend, setRend] = useState(false);
  // 시간 설정
  const nowTime = moment().format('HHmmss');
  const [DDCount, setDDCount] = useState('');
  const [DCCount, setDCCount] = useState('');
  const [DSCount, setDSCount] = useState('');
  const [DRCount, setDRCount] = useState('');
  const [countDArr, setCountDArr] = useState([]);
  const [chk, setChk] = useState(false);

  function getCurrentWeek() {
    const day = new Date();
    const sunday = day.getTime() - 86400000 * day.getDay();

    day.setTime(sunday);

    const result = [day.toISOString().slice(0, 10)];

    for (let i = 1; i < 7; i++) {
      day.setTime(day.getTime() + 86400000);
      result.push(day.toISOString().slice(0, 10));
    }

    return result;
  }

  const [sunDay, setSunDay] = useState(getCurrentWeek()[0]);
  const [saturDay, setSaturDay] = useState(getCurrentWeek()[6]);

  useEffect(() => {
    if (empInfo.length !== 0) {
      if (!!empInfo) {
        findWorkOn(empInfo.empId, setInCnt);
        findWorkOff(empInfo.empId, setOutCnt);
      }
      if (
        DDCount.length !== 0 &&
        DCCount.length !== 0 &&
        DSCount.length !== 0 &&
        DRCount.length !== 0
      ) {
        if (countDArr.length === 0) {
          setCountDArr([DDCount, DCCount, DSCount, DRCount]);
        }
      } else {
        getDCountByDate(
          empInfo.empId,
          setDDCount,
          setDCCount,
          setDSCount,
          setDRCount,
          sunDay,
          saturDay
        );
      }
    }
  }, [empInfo.empId, rend, countDArr]);

  useEffect(() => {
    console.log('aaaaaaaaaaaaaa', sunDay);
    getDCountByDate(
      empInfo.empId,
      setDDCount,
      setDCCount,
      setDSCount,
      setDRCount,
      sunDay,
      saturDay
    );

    console.log('countDArr', countDArr);
  }, [sunDay]);

  useEffect(() => {
    console.log('aaaaaadddddaa', DDCount, DCCount, DSCount, DRCount);
    setCountDArr([DDCount, DCCount, DSCount, DRCount]);
  }, [DDCount, DCCount, DSCount, DRCount]);

  useEffect(() => {
    console.log('aaa');
  }, [countDArr]);
  // useEffect(() => {
  //   getDCountByDate(
  //     empInfo.empId,
  //     setDDCount,
  //     setDCCount,
  //     setDSCount,
  //     setDRCount,
  //     sunDay,
  //     saturDay
  //   );
  //   console.log(countDArr);
  // }, [countDArr]);

  const data = {
    labels: [
      `상신한 ${DDCount ? DDCount : '0'}`,
      `완료된 ${DCCount ? DCCount : '0'}`,
      `저장된 ${DSCount ? DSCount : '0'}`,
      `반려된 ${DRCount ? DRCount : '0'}`,
    ],
    datasets: [
      {
        label: '# of Votes',
        data: [DDCount, DCCount, DSCount, DRCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        // borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          padding: 10,
        },
        display: true,
        position: 'bottom',
      },
    },
  };

  const WorkStart = () => {
    if (inCnt === 1) {
      alert('이미 출근 등록을 하였습니다!');
    } else {
      if (nowTime <= process.env.REACT_APP_WORK_IN) {
        empInfo && startWork(empInfo.empId);
        setRend(!rend);
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
          setRend(!rend);
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

  const prevWeek = () => {
    const prevSun = new Date(sunDay);
    const prevSatur = new Date(saturDay);
    if (
      moment(prevSun).format('YYYYMMDD') -
        7 -
        moment(empInfo.hiredate).format('YYYYMMDD') >=
      0
    ) {
      prevSun.setDate(prevSun.getDate() - 7);
      prevSatur.setDate(prevSatur.getDate() - 7);
      setSunDay(moment(prevSun).format('YYYY-MM-DD'));
      setSaturDay(moment(prevSatur).format('YYYY-MM-DD'));
      setChk(!chk);
    } else {
      alert('입사일 전입니다.');
    }
  };

  const nextWeek = () => {
    const day = new Date();
    const nextSun = new Date(sunDay);
    const nextSatur = new Date(saturDay);
    if (
      moment(day).format('YYYYMMDD') - moment(nextSatur).format('YYYYMMDD') >=
      0
    ) {
      nextSun.setDate(nextSun.getDate() + 7);
      nextSatur.setDate(nextSatur.getDate() + 7);
      setSunDay(moment(nextSun).format('YYYY-MM-DD'));
      setSaturDay(moment(nextSatur).format('YYYY-MM-DD'));
      setChk(!chk);
    } else {
      alert('아직 기록이 없습니다.');
    }
  };

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
        {empInfo.length !== 0 && (
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              // mt: 20,
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
                // alignItems: 'center',
              }}>
              {console.log(
                `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${empInfo.photo}`
              )}
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                }}
                src={
                  !!empInfo.photo
                    ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${empInfo.photo}`
                    : `${process.env.REACT_APP_AWS_S3_DEFAULT}`
                }
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
        )}

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

        {empInfo.length !== 0 &&
          (JSON.stringify(countDArr) === JSON.stringify([0, 0, 0, 0]) ? (
            <div
              id="myChart"
              style={{
                width: '250px',
                height: '350px',
                // marginTop: '12vh',
                backgroundColor: '#EEEEEE',
                boxShadow: '0px 0px 25px hsla(0, 0%, 71%, 1)',
              }}>
              <p style={{ padding: '10px' }}>결재관리</p>

              <div
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}>
                <button>이전</button>
                <p style={{ textAlign: 'center' }}>
                  {sunDay + ' ~ ' + saturDay}
                </p>
                <button>다음</button>
              </div>
              <p>아직 결재 정보가 없습니다.</p>
            </div>
          ) : (
            <Box
              id="myChart"
              sx={{
                backgroundColor: '#EEEEEE',
                // mt: 20,
                width: '250px',
                height: '350px',
                position: 'relative',
                boxShadow: '0px 0px 25px hsla(0, 0%, 71%, 1)',
              }}>

              <p style={{ padding: '10px' }}>결재관리</p>
              <div
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}>
                <button onClick={prevWeek}>이전</button>
                <p style={{ textAlign: 'center' }}>
                  {sunDay + ' ~ ' + saturDay}
                </p>
                <button onClick={nextWeek}>다음</button>
              </div>

              <Pie data={data} options={options} />
            </Box>
          ))}
      </div>
    </div>
  );
}

export default MainPage;
