import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Header.css';

function ChatRoom() {
  const [chatroom, setChatroom] = useState([]);
  const [chatList, setChatList] = useState([]);

  const onChatroom = (setChatroom) => {
    axios.get('http://localhost:8080/allChat').then((response) => {
      setChatroom(response.data);
      console.log(response.data);
    });
  };

  const onChatroomList = (setChatList) => {
    axios.get('http://localhost:8080/allChatroom').then((response) => {
      setChatList(response.data);
    });
  };

  return (
    <div>
      <div className="header-title-container">
        <h3>balloon의 채팅앱</h3>
      </div>
      <div>
        <br />
        <button
          onClick={() => {
            onChatroomList(setChatList);
          }}>
          채팅방이름만보기
        </button>
        <div>
          <Link to={'/createroom'}>
            <div>채팅방만들기</div>
          </Link>
        </div>
        {chatList.map((list, index) => {
          return <div key={index}>chatroomName : {list.chatroomName}</div>;
        })}
        <div>
          <hr />
        </div>
        <button
          onClick={() => {
            onChatroom(setChatroom);
          }}>
          모두보기
        </button>
        {chatroom.map((chat, index) => {
          return (
            <div key={index}>
              chatroomName : {chat.chatroom.chatroomName}
              <br />
              headCount : {chat.chatroom.headCount}
              <br />
              chatContent : {chat.chatContent}
              <br />
              empId : {chat.employee.empId}
              <Link to={`/chat?room=${chat.chatroom.chatroomId}`}>
                <div>바로가기</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default ChatRoom;
