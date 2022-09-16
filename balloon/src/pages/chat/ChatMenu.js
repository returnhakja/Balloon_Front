import React, { useEffect, useState } from 'react';
import styles from '../../css/chat/Chat.module.css';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import ChatEmpList from './ChatEmpList';
import ChatRoom from './ChatRoom';
import ChatNotice from './ChatNotice';
import ChatSide from './ChatSide';

export default function ChatMenu({ open, setOpen, empInfo }) {
  const [chatStatus, setChatStatus] = useState('chatEmpList');
  const handleClose = () => setOpen(false);
  useEffect(() => {}, [chatStatus]);

  return (
    <div>
      <Box open={open}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#d0eef7',
          }}>
          <span
            style={{
              fontSize: '18px',
              marginLeft: '20px',
              color: 'black',
            }}>
            메신저
          </span>
          <div style={{ float: 'right' }} onClick={handleClose}>
            <ClearIcon />
          </div>
        </div>
        <hr />
        <div className={styles.side2}>
          <div className={styles.listcon}>
            <ChatSide setChatStatus={setChatStatus} />
            {chatStatus === 'chatEmpList' ? (
              <ChatEmpList
                open={open}
                empInfo={empInfo}
                chatStatus={chatStatus}
                setChatStatus={setChatStatus}
              />
            ) : chatStatus === 'chatList' ? (
              <ChatRoom
                empInfo={empInfo}
                chatStatus={chatStatus}
                setChatStatus={setChatStatus}
              />
            ) : chatStatus === 'chatNotice' ? (
              <ChatNotice empInfo={empInfo} setChatStatus={setChatStatus} />
            ) : (
              ''
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}
