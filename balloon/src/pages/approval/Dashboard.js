import React from 'react';
import SideNavigation from '../../components/SideNavigation';
import { DBCard } from './approvalCards/DashboardCards';
import { Card, Container } from '@mui/material';
import { Box } from '@mui/system';

const linkArr = ['/draft/br', '/draft/bt', '/draft/pa'];
const titleArr = ['업무기안', '출장계획서', '인사명령'];
const contentArr = ['업무기안입니다.', '출장계획서입니다.', '인사명령입니다.'];

function Dashboard() {
  return (
    <SideNavigation>
      <Container maxWidth>
        <p style={{ fontSize: '2.1rem' }}>기본양식함</p>
        <br />
        <div style={{ border: '1px solid black' }} />
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
          {linkArr.map((data, index) => {
            return (
              <DBCard
                key={index}
                link={data}
                title={titleArr[index]}
                content={contentArr[index]}
              />
            );
          })}
        </Box>
      </Container>
    </SideNavigation>
  );
}

export default Dashboard;
