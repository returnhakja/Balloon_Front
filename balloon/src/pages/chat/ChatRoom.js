import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { onChatroom } from '../../context/ChatAxios';
import styles from '../../css/chat/Chat.module.css';
import Box from '@mui/material/Box';

export default function ChatRoom({
  empInfo,
  setChatStatus,
  roomId,
  setRoomId,
  check,
}) {
  const [chatroom, setChatroom] = useState([]);
  const empId = empInfo.empId;

  //마지막으로 보낸 채팅list가져오기
  useEffect(() => {
    if (empId) {
      onChatroom(setChatroom, empId);
    }
  }, [empId, check]);

  return (
    <div className={styles.listroom}>
      {roomId === 0 ? (
        <>
          <div className={styles.chatfont}>
            <div className={styles.ChatText}>채팅 목록</div>
          </div>
          <div className={styles.roomContanar}>
            {chatroom.map((chat) => {
              return (
                <>
                  <div
                    className={styles.roomcon}
                    onClick={() => {
                      setRoomId(chat.chatroom.chatroomId);
                    }}>
                    <Box className={styles.chatRoomBox}>
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
                            {chat.chatroom.chatroomName.substr(0, 12)}... (
                            {chat.chatroom.headCount})
                          </span>
                        </div>
                      )}
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
                </>
              );
            })}
          </div>
        </>
      ) : (
        <Chat
          empInfo={empInfo}
          roomId={roomId}
          setChatStatus={setChatStatus}
          setRoomId={setRoomId}
        />
      )}
    </div>
  );
}
