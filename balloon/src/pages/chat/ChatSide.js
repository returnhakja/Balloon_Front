import { Box } from '@mui/material';
import React from 'react';
import { BsPerson } from 'react-icons/bs';
import styles from './ChatSide.module.css';

function ChatSide({ children }) {
  return (
    <div>
      <div className={styles.constainer}>
        <div>
          <BsPerson />
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default ChatSide;
