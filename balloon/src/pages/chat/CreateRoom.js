import React, { useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { onCreateChatroom } from '../../context/ChatAxios';
import styles from '../../css/chat/Chat.module.css';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { Box, Modal } from '@mui/material';

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  padding: 4,
};

function CreateChatroom({ invite, openCreatChat, setopenCreatChat }) {
  const inputRef = useRef();
  const [empInfo] = useOutletContext();
  // socket
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  const keyEnter = (e) => {
    if (e.key === 'Enter') {
      eventChatHandle();
    }
  };

  const eventChatHandle = () => {
    const input = document.getElementById('chatroomName');
    console.log(input.value);
    if (input.value.trim() !== '') {
      console.log(input.value);
      if (input.value.length === 0) {
        inputRef.current.focus();
        input.value = '';
        alert('채팅방 이름을 입력해주세요!!');
      } else {
        onCreateChatroom(
          empInfo,
          invite,
          document.getElementById('chatroomName'),
          client
        );
      }
    } else {
      inputRef.current.focus();
      input.value = '';
      alert('채팅방 이름을 입력해주세요!!');
    }
  };

  const handleClose = () => setopenCreatChat(false);

  return (
    <Modal open={openCreatChat} onClose={handleClose}>
      <Box sx={styleBox}>
        <h3 className={styles.inBox}>채팅방 만들기</h3>
        <div>
          <Input
            id="chatroomName"
            className={styles.inBox}
            ref={inputRef}
            onKeyPress={keyEnter}
            placeholder="채팅방 이름을 입력하세요"
          />
          <Button
            variant="contained"
            onClick={() => {
              eventChatHandle();

              // inputRef.current.value = '';
            }}>
            <div>채팅하기</div>
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
export default CreateChatroom;
