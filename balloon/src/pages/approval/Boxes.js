import React, { useState, useEffect } from 'react';
import { resolvePath, useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import { StatusCard } from './approvalCards/ApprovalStatusCard';
import { getDCount } from '../../context/ApprovalFunc';
import { Container } from '@mui/material';
import { Box } from '@mui/system';

function Boxes() {
  const [empInfo] = useOutletContext();
  const [value, setValue] = useState('1');
  const [DDCount, setDDCount] = useState('');
  const [DCCount, setDCCount] = useState('');
  const [DSCount, setDSCount] = useState('');
  const [DRCount, setDRCount] = useState('');

  // 현황 카드 변수
  const linkArr = ['/boxes/dd', '/boxes/dc', '/boxes/ds', '/boxes/dr'];

  const linkArr2 = ['/boxes/ab', '/boxes/ao', '/boxes/ac', '/boxes/ar'];

  const apprvoalStatus = ['상신한', '완료된', '저장된', '반려된'];

  const apprvoalStatus2 = ['결재전', '진행중', '완료된', '반려된'];

  const [countArr, setCountArr] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (
      DDCount.length !== 0 &&
      DCCount.length !== 0 &&
      DSCount.length !== 0 &&
      DRCount.length !== 0
    ) {
      if (countArr.length === 0) {
        setCountArr([DDCount, DCCount, DSCount, DRCount]);
      }
    } else {
      getDCount(empInfo.empId, setDDCount, setDCCount, setDSCount, setDRCount);
    }
  }, [empInfo.empId, DDCount, DCCount, DSCount, DRCount, countArr]);

  return (
    <SideNavigation>
      <Container maxWidth="maxWidth">
        <p style={{ fontSize: '25px' }}>나의 현황</p>
        <hr />
        <p style={{ fontSize: '25px' }}>기안함</p>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            height: 200,
            justifyContent: 'space-around',
            p: 1,
            m: 1,
            mt: 3,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}>
          {countArr.length !== 0 &&
            apprvoalStatus.map((status, index) => {
              return (
                <StatusCard
                  key={index}
                  status={status}
                  count={countArr[index]}
                  link={linkArr[index]}
                />
              );
            })}
        </Box>
        <p style={{ fontSize: '25px' }}>결재함</p>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            height: 200,
            justifyContent: 'space-around',
            p: 1,
            m: 1,
            mt: 3,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}>
          {countArr.length !== 0 &&
            apprvoalStatus2.map((status, index) => {
              return (
                <StatusCard
                  key={index}
                  status={status}
                  count={countArr[index]}
                  link={linkArr2[index]}
                />
              );
            })}
        </Box>
      </Container>
    </SideNavigation>
  );
}

export default Boxes;
