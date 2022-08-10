import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';
import { useOutletContext } from 'react-router-dom';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

function ChatRoom() {
  const [chatroom, setChatroom] = useState([]);
  const [setEmpId, empInfo, setEmpInfo] = useOutletContext();

  useEffect(() => {
    const onChatroom = (setChatroom) => {
      axios
        .get(`http://localhost:8080/allChat/${empInfo.empId}`)
        .then((response) => {
          setChatroom(response.data);
          console.log(response.data);
        });
    };
    onChatroom(setChatroom);
  }, []);

  const onDeleteRoom = (chatroomId) => {
    axios
      .delete(`http://localhost:8080/deleteChatroom/${chatroomId}`)
      .then((response) => console.log(response.data));
  };

  return (
    <>
      <div>
        {/* 헤더 */}
        <div className="header-title-container">
          <h3>balloon의 채팅앱</h3>
          <h3></h3>
        </div>

        {/* 채팅방 만들기 버튼 */}
        <div>
          <Grid container justifyContent="flex-end">
            <Button className="chatIcon">
              <Link to={'/createroom'}>
                <ChatIcon />
              </Link>
            </Button>
          </Grid>
        </div>

        {/* 채팅방 목록보기 & 삭제하기 */}
        <Container maxWidth="sm">
          {chatroom.map((chat, index) => {
            return (
              <Box key={index} border="1px dashed blue">
                <Link to={`/chat?room=${chat.chatroom.chatroomId}`}>
                  <ListItemButton>
                    {chat.chatroom.chatroomName}({chat.chatroom.headCount})
                    <br />
                    {chat.chatContent}
                  </ListItemButton>
                </Link>
                {chat.employee.empId}

                <Button
                  variant="text"
                  disableElevation
                  onClick={() => onDeleteRoom(chat.chatroom.chatroomId)}>
                  <DeleteIcon />
                </Button>
              </Box>
            );
          })}
        </Container>
      </div>
    </>
  );
}
export default ChatRoom;
