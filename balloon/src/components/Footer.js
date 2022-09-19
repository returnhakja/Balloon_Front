import React from 'react';
import styles from '../css/Footer.module.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <div className={styles.team_member}>
          <b>
            <p>김윤호</p>
            <a
              href="https://github.com/Uno0306"
              target="_blank"
              rel="noopener noreferrer">
              {' '}
              GitHub{' '}
            </a>
          </b>
        </div>
        <div className={styles.team_member}>
          <b>
            <p>서의진</p>
            <a
              href="https://github.com/kki45"
              target="_blank"
              rel="noopener noreferrer">
              {' '}
              GitHub{' '}
            </a>
          </b>
        </div>
        <div className={styles.team_member}>
          <b>
            <p>김도헌</p>
            <a
              href="https://github.com/returnhakja"
              target="_blank"
              rel="noopener noreferrer">
              GitHub
            </a>
          </b>
        </div>
        <div className={styles.team_member}>
          <b>
            <p>성종헌</p>
            <a
              href="https://github.com/SJHeon"
              target="_blank"
              rel="noopener noreferrer">
              {' '}
              GitHub{' '}
            </a>
          </b>
        </div>
      </div>
      <div>
        <h2 className={styles.title}>
          <br />
          Copyright by &copy; 2022 BALLOON
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
