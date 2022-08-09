import React from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';
import SideNavigation from '../../components/SideNavigation';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/system';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        상신된
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        0
      </Typography>
    </CardContent>
  </React.Fragment>
);
const card1 = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        저장된
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        0
      </Typography>
    </CardContent>
  </React.Fragment>
);
const card2 = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        완료된
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        0
      </Typography>
    </CardContent>
  </React.Fragment>
);
const card3 = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        반려된
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        0
      </Typography>
    </CardContent>
  </React.Fragment>
);

function Boxs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <SideNavigation>
        <main>
          <Container maxWidth="xl">
            {/* <p style={{ fontSize: "25px" }}>나의 현황</p> */}
            <p style={{ fontSize: '25px' }}>나의 현황</p>
            <hr />
            <Box
              sx={{
                display: 'flex',

                width: 1500,
                height: 200,

                justifyContent: 'space-around',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}>
              <Card
                variant="outlined"
                sx={{ minWidth: 250 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card}
              </Card>
              <Card
                variant="outlined"
                sx={{ minWidth: 250 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card1}
              </Card>
              <Card
                variant="outlined"
                sx={{ minWidth: 250 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card2}
              </Card>
              <Card
                variant="outlined"
                sx={{ minWidth: 250 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card3}
              </Card>
            </Box>
          </Container>

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
        </main>
      </SideNavigation>
    </div>
  );
}

export default Boxs;
