import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';

import { onChatroom, onExitRoom } from '../../context/ChatAxios';
import Stomp from 'stompjs';
import { sendExit } from '../../utils/ChatUtils';
import SockJS from 'sockjs-client';
import styles from '../../css/Chat/ChatRoom.module.css';
function ChatRoom() {
  const [chatroom, setChatroom] = useState([]);
  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  //마지막으로 보낸 채팅list가져오기
  useEffect(() => {
    if (empId) {
      onChatroom(setChatroom, empId);
    }
  }, [empId]);

  return (
    <>
      <br />
      <Container maxWidth="xs" sx={{ border: 1 }}>
        <div className={styles.chatroom}>
          <br />
          <Link to={'/chatemplist'}>
            <Button variant="contained">사원리스트 이동</Button>
          </Link>
        </div>
        <br />
        {/* 채팅방 목록보기 & 삭제하기 */}
        {chatroom.map((chat, index) => {
          return (
            <Box key={index} border="1px solid ">
              <Link to={`/chat?room=${chat.chatroom.chatroomId}`}>
                <ListItemButton>
                  <Button>
                    {chat.chatroom.chatroomName}({chat.chatroom.headCount})
                  </Button>
                  {chat.chatContent}
                </ListItemButton>
              </Link>
              <Button
                variant="text"
                disableElevation
                onClick={() =>
                  onExitRoom(
                    chat.chatroom.chatroomId,
                    empInfo.empId,
                    sendExit(client, chat.chatroom.chatroomId, empInfo)
                  )
                }>
                <DeleteIcon />
              </Button>
            </Box>
          );
        })}
      </Container>
    </>
  );
}
export default ChatRoom;
