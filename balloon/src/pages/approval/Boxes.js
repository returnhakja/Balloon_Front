import React, { useState, useEffect } from 'react';
import { resolvePath, useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import { StatusCard } from './approvalCards/ApprovalStatusCard';
import { getACount, getDCount } from '../../context/ApprovalFunc';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

function Boxes() {
  const [empInfo] = useOutletContext();
  const [value, setValue] = useState('1');
  const [DDCount, setDDCount] = useState('');
  const [DCCount, setDCCount] = useState('');
  const [DSCount, setDSCount] = useState('');
  const [DRCount, setDRCount] = useState('');
  const [ABCount, setABCount] = useState('');
  const [AOCount, setAOCount] = useState('');
  const [ACCount, setACCount] = useState('');
  const [ARCount, setARCount] = useState('');

  // 현황 카드 변수
  const linkArr = ['/boxes/dd', '/boxes/dc', '/boxes/ds', '/boxes/dr'];

  const linkArr2 = ['/boxes/ab', '/boxes/ao', '/boxes/ac', '/boxes/ar'];

  const apprvoalStatus = ['상신한', '완료된', '저장된', '반려된'];

  const apprvoalStatus2 = ['결재전', '진행중', '완료된', '반려된'];

  const [countDArr, setCountDArr] = useState([]);
  const [countAArr, setCountAArr] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (
      DDCount.length !== 0 &&
      DCCount.length !== 0 &&
      DSCount.length !== 0 &&
      DRCount.length !== 0 &&
      ABCount.length !== 0 &&
      AOCount.length !== 0 &&
      ACCount.length !== 0 &&
      ARCount.length !== 0
    ) {
      if (countDArr.length === 0) {
        setCountDArr([DDCount, DCCount, DSCount, DRCount]);
        setCountAArr([ABCount, AOCount, ACCount, ARCount]);
      }
    } else {
      getDCount(empInfo.empId, setDDCount, setDCCount, setDSCount, setDRCount);
      getACount(empInfo.empId, setABCount, setAOCount, setACCount, setARCount);
    }
  }, [
    empInfo.empId,
    DDCount,
    DCCount,
    DSCount,
    DRCount,
    countDArr,
    countAArr,
    ABCount,
    AOCount,
    ACCount,
    ARCount,
  ]);

  return (
    <div>
      <SideNavigation>
        <Container maxWidth="maxWidth">
          <p style={{ fontSize: '25px', padding: 4 }}>나의 현황</p>
          <div style={{ border: '1px solid black' }} />
          <p style={{ fontSize: '25px' }}>기안함</p>
          <Box
            sx={{
              display: 'flex',
              // gridTemplateColumns: 'repeat(4, 1fr)',
              height: 200,
              justifyContent: 'space-around',
              p: 1,
              m: 1,
              mt: 3,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}>
            {countDArr.length !== 0 &&
              apprvoalStatus.map((status, index) => {
                return (
                  <StatusCard
                    key={index}
                    status={status}
                    count={countDArr[index]}
                    link={linkArr[index]}
                  />
                );
              })}
          </Box>
          <p style={{ fontSize: '25px' }}>결재함</p>
          <Box
            sx={{
              display: 'flex',
              // gridTemplateColumns: 'repeat(4, 1fr)',
              height: 200,
              justifyContent: 'space-around',
              p: 1,
              m: 1,
              mt: 3,
              bgcolor: 'background.paper',
              // borderRadius: 1,
            }}>
            {countDArr.length !== 0 &&
              apprvoalStatus2.map((status, index) => {
                return (
                  <StatusCard
                    key={index}
                    status={status}
                    count={countAArr[index]}
                    link={linkArr2[index]}
                  />
                );
              })}
          </Box>
        </Container>
      </SideNavigation>
    </div>
  );
}

export default Boxes;
