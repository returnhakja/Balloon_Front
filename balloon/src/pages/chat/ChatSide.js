import React from 'react';
import styles from '../../css/chat/CS.module.css';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ChatSide({ children, setChatStatus, setRoomId }) {
  return (
    <div className={styles.constainer}>
      <div className={styles.iconcon}>
        <ul className={styles.constainer}>
          <li
            className={styles.listyle}
            onClick={() => setChatStatus('chatEmpList')}>
            <PersonIcon fontSize="large" />
          </li>
          <li
            className={styles.listyle}
            onClick={() => {
              setChatStatus('chatList');
              setRoomId(0);
            }}>
            <ChatIcon fontSize="large" />
          </li>
          <li
            className={styles.listyle}
            onClick={() => setChatStatus('chatNotice')}>
            <SettingsIcon fontSize="large" />
          </li>
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
}
