import { Card, CardContent, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SideNavigation from './SideNavigation';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography
        sx={{ fontSize: 25 }}
        color="#00AAFF"
        gutterBottom
        textAlign="center">
        업무기안
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        업무기안입니다.
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
        출장계획서
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        출장계획서입니다.
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
        인사명령
      </Typography>
      <hr />
      <br />
      <Typography
        sx={{ fontSize: 20 }}
        variant="h5"
        component="div"
        textAlign="center">
        인사명령입니다.
      </Typography>
    </CardContent>
  </React.Fragment>
);

function Dashboard() {
  return (
    <div>
      <SideNavigation>
        <Container maxWidth="xl">
          <p style={{ fontSize: '30px' }}>기본양식함</p>
          <hr />
          <p style={{ fontSize: '25px' }}>기본양식 3</p>
          <Box
            sx={{
              display: 'flex',
              width: 1500,
              height: 200,

              justifyContent: 'space-around',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
            }}
            //   borderRadius: 1,
          >
            <Card
              variant="outlined"
              sx={{ minWidth: 400 }}
              style={{ backgroundColor: '#F1F9FF' }}>
              {card}
            </Card>
            <Card
              variant="outlined"
              sx={{ minWidth: 400 }}
              style={{ backgroundColor: '#F1F9FF' }}>
              {card1}
            </Card>
            <Card
              variant="outlined"
              sx={{ minWidth: 400 }}
              style={{ backgroundColor: '#F1F9FF' }}>
              {card2}
            </Card>
          </Box>
        </Container>
      </SideNavigation>
    </div>
  );
}

export default Dashboard;
