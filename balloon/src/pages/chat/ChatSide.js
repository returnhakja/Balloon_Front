import { Box, Button } from '@mui/material';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import styles from './ChatSide.module.css';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
function ChatSide({ children }) {
  return (
    <div className={styles.constainer}>
      <div className={styles.iconcon}>
        <div>
          <PersonIcon />
        </div>

        <div>
          <ChatIcon />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default ChatSide;
