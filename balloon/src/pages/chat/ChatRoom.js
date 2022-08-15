import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';

function ChatRoom() {
  const [chatroom, setChatroom] = useState([]);

  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;
  console.log(empInfo);

  useEffect(() => {
    const onChatroom = (setChatroom) => {
      axios.get(`http://localhost:8080/allChat/${empId}`).then((response) => {
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
        <br />
        <Link to={'/chatemplist'}>
          <Button variant="contained">사원리스트 이동</Button>
        </Link>
      </div>
      <br />
      {/* 채팅방 목록보기 & 삭제하기 */}
      <Container maxWidth="sm">
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
                onClick={() => onDeleteRoom(chat.chatroom.chatroomId)}>
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
