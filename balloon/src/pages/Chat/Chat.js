import { useEffect, useRef, useState } from 'react';
import './Header.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styles from './Chat.module.css';
import { useOutletContext } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

function Chat() {
  // login할때 empId를 가져옴 -> 채팅방생성/채팅 시 사용가능
  const [empInfo, setEmpInfo, empId] = useOutletContext();
  console.log(empId);

  //실시간 시간 가져오기
  const nowTime = moment().format('HH:mm');
  console.log(nowTime);

  const chatroomId = new URL(document.location).searchParams.get('room');
  // input에 저장해야하는것은 채팅내용과 작성자를 객체형태로 만들어서 배열로 저장
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      console.log(chat);
      setInput([...input, chat]);
      console.log(...input);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  const send = () => {
    console.log('sending');
    client.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        chatroomId: chatroomId,
        writer: empId,
        chatContent: inputRef.current.value,
      })
    );
  };
  //채팅방 채팅기록
  const [chatting, setChatting] = useState([]);

  //chatroom에 들어갔을 때 기록남게
  useEffect(() => {
    const onChatroomList = (setChatting) => {
      axios
        .get(`http://localhost:8080/onechatroom/${chatroomId}`)
        .then((response) => {
          console.log(response.data);
          setChatting(response.data);
        });
    };
    onChatroomList(setChatting);
  }, []);

  //채팅방에 사람추가하는 기능 - 수정
  const onUserAdd = () => {
    const chatroomName = document.getElementById('chatroomName');
    const headCount = document.getElementById('headCount');
    axios
      .put(`http://localhost:8080/updateroomName/${chatroomId}`, {
        chatroomName: chatroomName.value,
        headCount: headCount.value,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <>
      <div className="header-title-container">
        {/* <h3>{chatting[0].chatroom.chatroomName}</h3> */}
        <h3>채팅방이름</h3>
      </div>
      <div>
        <input
          id="chatroomName"
          placeholder="수정할 채팅방의 이름을 입력하세요"
          // defaultValue={chatting[0].chatroom.chatroomName}
        />
        <br />
        <input
          id="headCount"
          placeholder="수정할 인원수 입력하세요"
          // defaultValue={chatting[0] && chatting.headCount}
        />
        <br />
        <button onClick={onUserAdd}>수정하기</button>
      </div>

      <div>
        {/* 채팅기록을 가져옴 */}
        {chatting.map((msg, index) => {
          return (
            <div key={index}>
              {msg.employee.empId == empId ? (
                <div className={styles.message}>
                  {msg.chatTime}
                  {msg.chatContent}
                </div>
              ) : (
                <div className={styles.othermessage}>
                  {msg.chatTime}
                  {msg.chatContent}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.scroll}>
        <div className={styles.contain}>
          {/* chatting내용 사용자에 따라 배치 */}
          {input.length != 0 &&
            input.map((chat, index) => {
              console.log(chat);
              return (
                <div key={chat.writer + index}>
                  {empId == chat.writer ? (
                    <div className={styles.message}>
                      {nowTime}
                      {chat.chatContent}
                    </div>
                  ) : (
                    <div className={styles.othermessage}>
                      {nowTime}
                      {chat.chatContent}
                    </div>
                  )}
                  <br />
                </div>
              );
            })}
        </div>

        <div className={styles.inputmain}>
          <input className={styles.inputform} ref={inputRef}></input>
          <button
            className={styles.inputbutton}
            onClick={() => {
              inputRef.current.value && send();
              inputRef.current.focus();
              inputRef.current.value = '';
            }}>
            보내기
          </button>
        </div>
      </div>
    </>
  );
}
export default Chat;
