import React from 'react';
import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
`;

export const Div = styled.div`
  text-align: center;
  padding: 10px;
  width: 90vw;
  height: 60vh;
  background: paleturquoise;
  border-radius: 20px;
`;

function NotFound() {
  return (
    <Box>
      <Div>
        <h1 style={{ paddingTop: '10px' }}>NotFound Page</h1>
        <p style={{ paddingTop: '250px' }}>
          위 주소는 찾을 수 없거나 없는 페이지입니다.
        </p>
      </Div>
    </Box>
  );
}

export default NotFound;
