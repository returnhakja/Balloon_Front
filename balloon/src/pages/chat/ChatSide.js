import { Box, Button } from '@mui/material';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import styles from './ChatSide.module.css';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
function ChatSide({ children }) {
  return (
    <div className={styles.constainer}>
      <div className={styles.iconcon}>
        <ul className={styles.constainer}>
          <li className={styles.listyle}>
            <PersonIcon fontSize="large" />
          </li>
          <li className={styles.listyle}>
            <ChatIcon fontSize="large" />
          </li>
          <li className={styles.listyle}>
            <SettingsIcon fontSize="large" />
          </li>
        </ul>
        {/* <div>
          <PersonIcon />
        </div>

        <div>
          <ChatIcon />
        </div> */}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default ChatSide;
