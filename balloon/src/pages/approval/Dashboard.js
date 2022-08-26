import React from 'react';
import { Link } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

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
    <SideNavigation>
      <Container maxWidth>
        <p style={{ fontSize: '2.1rem' }}>기본양식함</p>
        <br />
        <hr />
        <p style={{ fontSize: '1.5rem', marginTop: '2%' }}>기본양식 3</p>
        <br />
        <Box
          sx={{
            display: 'flex',
            height: 200,

            justifyContent: 'space-around',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
          }}>
          <Link to={'/draft/br'}>
            <CardActionArea>
              <Card
                variant="outlined"
                sx={{ minWidth: 250, height: 200 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card}
              </Card>
            </CardActionArea>
          </Link>

          <Link to={'/draft/bt'}>
            <CardActionArea>
              <Card
                variant="outlined"
                sx={{ minWidth: 250, height: 200 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card1}
              </Card>
            </CardActionArea>
          </Link>

          <Link to={'/draft/pa'}>
            <CardActionArea>
              <Card
                variant="outlined"
                sx={{ minWidth: 250, height: 200 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                {card2}
              </Card>
            </CardActionArea>
          </Link>
        </Box>
      </Container>
    </SideNavigation>
  );
}

export default Dashboard;
