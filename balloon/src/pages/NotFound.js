import { display } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  justify-content: center;
`;

export const Div = styled.div`
  margin-top: 5%;
  text-align: center;
  padding: 10px;
  width: 90vw;
  height: 60vh;
  background: paleturquoise;
  border-radius: 20px;

  justifycontent: center;
  alignitems: center;
`;

function NotFound() {
  return (
    <Box>
      <Div>
        <div style={{ marginTop: '10%' }}>
          <img
            src={`${process.env.PUBLIC_URL}/asset/do.png`}
            style={{ marginRight: '20px' }}></img>

          <img src={`${process.env.PUBLIC_URL}/asset/jong.png`}></img>
        </div>
        <br />
        <h1 style={{ marginBottom: '5vh' }}>NotFound Page</h1>
        <p style={{ fontSize: '30px', color: 'red' }}>
          위 주소는 찾을 수 없거나 없는 페이지입니다.
        </p>
      </Div>
    </Box>
  );
}

export default NotFound;
