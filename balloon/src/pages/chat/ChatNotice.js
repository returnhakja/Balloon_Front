import React from 'react';
import styles from '../../css/chat/Chat.module.css';

export default function ChatNotice() {
  return (
    <div className={styles.listroom}>
      <div className={styles.chatfont}>
        <div className={styles.ChatText}>공지 사항</div>
      </div>
      <div className={styles.roomContanar}>
        <div>
          <span className={styles.chatName}>
            <p>아직 공지사항이 없습니다.</p>
          </span>
        </div>
      </div>
    </div>
  );
}
