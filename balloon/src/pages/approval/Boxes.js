import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import { StatusCard } from './approvalCards/ApprovalStatusCard';
import { getDCount } from '../../context/ApprovalFunc';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function Boxes() {
  const [empInfo] = useOutletContext();
  const [value, setValue] = useState('1');
  const [DDCount, setDDCount] = useState('');
  const [DCCount, setDCCount] = useState('');
  const [DSCount, setDSCount] = useState('');
  const [DRCount, setDRCount] = useState('');

  // 현황 카드 변수
  const linkArr = ['/boxes/dd', '/boxes/dc', '/boxes/ds', '/boxes/dr'];
  const apprvoalStatus = ['상신한', '완료된', '저장된', '반려된'];
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
        <Box
          sx={{
            display: 'flex',
            height: 200,
            justifyContent: 'space-around',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}>
          {countArr.length !== 0 &&
            apprvoalStatus.map((status, index) => {
              return (
                // <CardActionArea
                //   sx={{
                //     height: 200,
                //     display: 'flex',
                //     justifyContent: 'space-around',
                //   }}>
                //   <Card
                //     variant="outlined"
                //     sx={{ minWidth: 250, height: 200 }}
                //     style={{ backgroundColor: '#F1F9FF' }}
                //     key={index}>
                <StatusCard
                  key={index}
                  status={status}
                  count={countArr[index]}
                  link={linkArr[index]}
                />
                //   </Card>
                // </CardActionArea>
              );
            })}
        </Box>

        <Box sx={{ width: '100%', typography: 'body1', marginTop: 30 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="내가 상신한 문서" value="1" />
                <Tab label="내가 결재한 문서" value="2" />
                <Tab label="최근 결재한 문서" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              (나중에 테이블만들때 여기다가 적용하면 될듯 각각)내가 상신한
              문서에 대한 테이블
            </TabPanel>
            <TabPanel value="2">
              (나중에 테이블만들때 여기다가 적용하면 될듯 각각)내가 결재한
              문서에 대한 테이블
            </TabPanel>
            <TabPanel value="3">
              (나중에 테이블만들때 여기다가 적용하면 될듯 각각)최근 결재한
              문서에 대한 테이블
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </SideNavigation>
  );
}

export default Boxes;
