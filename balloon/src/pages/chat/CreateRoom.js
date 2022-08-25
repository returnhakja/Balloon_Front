import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Link, useOutletContext } from 'react-router-dom';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { onCreateChatroom, onUserInvite } from '../../context/ChatAxios';
import { Box, Modal } from '@mui/material';

function CreateChatroom({ invite, openCreatChat, setopenCreatChat, style }) {
  const [roomId, setRoomId] = useState();
  const chatroomId = roomId;

  const [empInfo, setEmpInfo] = useOutletContext();

  const handleClose = () => setopenCreatChat(false);
  // socket
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);
  // const [input, setInput] = useState([]);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      // setInput([...input, chat]);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  return (
    <Modal open={openCreatChat} onClose={handleClose}>
      <Box sx={style}>
        {/* <br />
        <br /> */}
        <h3>채팅방 만들기</h3>
        {/* <br /> */}
        <Input id="chatroomName" placeholder="채팅방 이름을 입력하세요" />
        {/* <br />
        <br /> */}
        <Button
          variant="contained"
          sx={{ marginRight: 2 }}
          onClick={() => {
            onCreateChatroom(
              empInfo,
              setRoomId,
              invite,
              document.getElementById('chatroomName')
            );
          }}>
          등록
        </Button>
        <Link to={`/chatting?room=${roomId}`}>
          <Button
            variant="contained"
            onClick={() => onUserInvite(chatroomId, invite, client)}>
            <div>채팅하기</div>
          </Button>
        </Link>
      </Box>
    </Modal>
  );
}
export default CreateChatroom;
