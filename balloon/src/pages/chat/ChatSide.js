import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../css/chat/ChatSide.module.css';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

function ChatSide({ children }) {
  return (
    <div className={styles.constainer}>
      <div className={styles.iconcon}>
        <ul className={styles.constainer}>
          <Link to={'/chatemplist'}>
            <li className={styles.listyle}>
              <PersonIcon fontSize="large" />
            </li>
          </Link>
          <Link to={'/chatlist'}>
            <li className={styles.listyle}>
              <ChatIcon fontSize="large" />
            </li>
          </Link>
          <Link to={'/chatnotice'}>
            <li className={styles.listyle}>
              <SettingsIcon fontSize="large" />
            </li>
          </Link>
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
