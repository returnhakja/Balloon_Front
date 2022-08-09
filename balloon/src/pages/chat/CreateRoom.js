import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CreateChatroom() {
  const [roomId, setRoomId] = useState();
  const onCreateChatroom = () => {
    const chatroomName = document.getElementById('chatroomName');
    const headCount = document.getElementById('headCount');
    axios
      .post('http://localhost:8080/createChatroom', {
        chatroomName: chatroomName.value,
        headCount: headCount.value,
      })
      .then((response) => {
        console.log(response.data);
        setRoomId(response.data);
      });
  };
  return (
    <div>
      <div>
        <h3>채팅방 만들기</h3>
        <br />
        <input id="chatroomName" placeholder="채팅방 이름을 입력하세요" />
        <br />
        <input id="headCount" placeholder="인원수를 입력하세요" />
        <br />
        <button
          onClick={() => {
            onCreateChatroom();
          }}>
          등록
        </button>

        <Link to={`/chat?room=${roomId}`}>
          <button>
            <div>채팅하기</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
export default CreateChatroom;
