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
      <div className={styles.side1}>
        <div className={styles.chatRoomList}>
          <ChatSide />
          <div className={styles.list}>
            <div className={styles.chatfont}>
              <div className={styles.ChatText}>채팅 목록</div>
            </div>
            <hr />
            <br />
            {chatroom.map((chat, index) => {
              console.log(chat.chatTime.substr(11, 5));
              // const a = chat.chatContent.length;
              // console.log(a);
              console.log(chat.chatContent.substr(0, 15));
              console.log(chat.chatroom.chatroomName.substr(0, 15));
              return (
                <div className={styles.roomcon} key={index}>
                  <Link to={`/chat?room=${chat.chatroom.chatroomId}`}>
                    <Box
                      className={styles.chatRoomBox}
                      sx={
                        {
                          // border: 0.5,
                          // borderColor: '#8b8b8b',
                          // marginBottom: 0.1,
                        }
                      }>
                      {/* {chat.chatroom.chatroomName}({chat.chatroom.headCount}) */}

                      {chat.chatroom.chatroomName.length <= '15' ? (
                        <div>
                          <span className={styles.chatName}>
                            {chat.chatroom.chatroomName}(
                            {chat.chatroom.headCount})
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className={styles.chatName}>
                            {chat.chatroom.chatroomName.substr(0, 12)}...(
                            {chat.chatroom.headCount})
                          </span>
                        </div>
                      )}

                      <div className={styles.DeleteBtn}>
                        <Button
                          variant="text"
                          disableElevation
                          onClick={(e) => {
                            const roomDelete = () => {
                              e.preventDefault();
                              onExitRoom(
                                chat.chatroom.chatroomId,
                                empInfo.empId,
                                sendExit(
                                  client,
                                  chat.chatroom.chatroomId,
                                  empInfo
                                )
                              );

                              window.location.href = '/chatroom';
                            };

                            return roomDelete();
                          }}>
                          <DeleteIcon />
                        </Button>
                      </div>
                      <div className={styles.content}>
                        {chat.chatContent.length <= '15' ? (
                          <div className={styles.content}>
                            {chat.chatContent}
                            <div className={styles.LastTimecon}>
                              <div className={styles.LastTime}>
                                {chat.chatTime.substr(11, 5)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.content}>
                            {chat.chatContent.substr(0, 25)}...
                            <div className={styles.LastTime}>
                              {chat.chatTime.substr(11, 5)}
                            </div>
                          </div>
                        )}
                        {/* {chat.chatContent.substr(0, 15)}... */}
                      </div>
                    </Box>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
export default ChatRoom;
