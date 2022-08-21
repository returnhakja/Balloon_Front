import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';

import { onChatroom, onExitRoom, onHCupdate } from '../../context/ChatAxios';
import Stomp from 'stompjs';
import { sendExit } from '../../utils/ChatUtils';
import SockJS from 'sockjs-client';
// import styles from '../../css/Chat/ChatRoom.module.css';
import ChatSide from './ChatSide';
import { Grid } from '@mui/material';
import styles from '../../css/Chat/Chat.module.css';

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
    <Container maxWidth="xs" className={styles.Listcontainer}>
      <div className={styles.side}>
        <div className={styles.chatRoomList}>
          <ChatSide />
          <div className={styles.list}>
            <div className={styles.chatfont}>
              <div className={styles.ChatText}>채팅목록</div>
            </div>
            <hr />

            {chatroom.map((chat, index) => {
              return (
                <div className={styles.roomcon}>
                  <Box key={index} className={styles.chatRoomBox}>
                    <Link to={`/chat?room=${chat.chatroom.chatroomId}`}>
                      <Button>
                        {chat.chatroom.chatroomName}({chat.chatroom.headCount})
                      </Button>
                      <p className={styles.content}>
                        {chat.chatContent}
                        <div className={styles.DeleteBtn}>
                          <Button
                            variant="text"
                            disableElevation
                            onClick={() =>
                              onExitRoom(
                                chat.chatroom.chatroomId,
                                empInfo.empId,
                                sendExit(
                                  client,
                                  chat.chatroom.chatroomId,
                                  empInfo
                                )
                              )
                            }>
                            <DeleteIcon />
                          </Button>
                        </div>
                      </p>
                    </Link>
                  </Box>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    {/*  <br />
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
                onClick={() => {
                  onExitRoom(
                    chat.chatroom.chatroomId,
                    empInfo.empId,
                    sendExit(client, chat.chatroom.chatroomId, empInfo)
                  );
                  onHCupdate(
                    chat.chatroom.chatroomId,
                    chat.chatroom.chatroomName,
                    chat.chatroom.headCount
                  );
                }}>
                <DeleteIcon />
              </Button>
            </Box>
          );
        })}
      </Container>
    </>*/}

    </Container>

  );
}
export default ChatRoom;
