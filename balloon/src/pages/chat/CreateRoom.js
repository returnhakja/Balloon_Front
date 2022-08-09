import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Input from '@mui/material/Input';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';

function CreateChatroom() {
  const [roomId, setRoomId] = useState();
  const onCreateChatroom = () => {
    const chatroomName = document.getElementById('chatroomName');
    const headCount = document.getElementById('headCount');
    axios
      .post('http://localhost:8080/createChatroom', {
        chatroomName: chatroomName.value,
        headCount: headCount.value,
      })
      .then((response) => {
        console.log(response.data);
        setRoomId(response.data);
      });
  };
  return (
    <div>
      <Container maxWidth="sm" border="1px dashed blue" width="50%">
        <h3>채팅방 만들기</h3>
        <br />
        <Input id="chatroomName" placeholder="채팅방 이름을 입력하세요" />
        <br />
        <Input id="headCount" placeholder="인원수를 입력하세요" />
        <br />
        <Button
          variant="text"
          onClick={() => {
            onCreateChatroom();
          }}>
          등록
        </Button>
        <Link to={`/chat?room=${roomId}`}>
          <Button variant="text">
            <div>채팅하기</div>
          </Button>
        </Link>
      </Container>
    </div>
  );
}
export default CreateChatroom;
