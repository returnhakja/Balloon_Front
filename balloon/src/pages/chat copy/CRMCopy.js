import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { sendExit } from '../../utils/ChatUtils';
import { onChatroom, onExitRoom, onHCupdate } from '../../context/ChatAxios';
import styles from '../../css/chat/Chat.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/system';
import ChatCopy from './ChatCopy';

function CRMCopy({ empInfo, setChatStatus }) {
  const [chatroom, setChatroom] = useState([]);
  const empId = empInfo.empId;
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);
  const [roomId, setRoomId] = useState(0);

  //마지막으로 보낸 채팅list가져오기
  useEffect(() => {
    if (empId) {
      onChatroom(setChatroom, empId);
    }
  }, [empId]);

  useEffect(() => {}, [roomId]);

  // console.log(chatStatus);
  return (
    <div className={styles.listroom}>
      {roomId === 0 ? (
        <>
          <div className={styles.chatfont}>
            <div className={styles.ChatText}>채팅 목록</div>
          </div>
          <div className={styles.roomContanar}>
            {chatroom.map((chat, index) => {
              return (
                <div
                  className={styles.roomcon}
                  key={index}
                  onClick={() => {
                    setRoomId(chat.chatroom.chatroomId);
                  }}>
                  <Box className={styles.chatRoomBox}>
                    {chat.chatroom.chatroomName.length <= '15' ? (
                      <div>
                        <span className={styles.chatName}>
                          {chat.chatroom.chatroomName}({chat.chatroom.headCount}
                          )
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
                              ),
                              onHCupdate(
                                chat.chatroom.chatroomId,
                                chat.chatroom.chatroomName,
                                chat.chatroom.headCount
                              )
                            );
                            setChatStatus('chatEmpList');
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
                          {chat.chatContent.substr(0, 15)}...
                          <div className={styles.LastTime}>
                            {chat.chatTime.substr(11, 5)}
                          </div>
                        </div>
                      )}
                    </div>
                  </Box>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <ChatCopy
          empInfo={empInfo}
          roomId={roomId}
          setChatStatus={setChatStatus}
        />
      )}
    </div>
  );
}
export default CRMCopy;
