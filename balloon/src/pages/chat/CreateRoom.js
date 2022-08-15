import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';

import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { onCreateChatroom, onUserInvite } from '../../context/ChatAxios';

function CreateChatroom({ invite }) {
  const [roomId, setRoomId] = useState();
  const chatroomId = roomId;

  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;

  // socket
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);
  const [input, setInput] = useState([]);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      setInput([...input, chat]);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  //채팅방만들기
  // const onCreateChatroom = () => {
  //   const chatroomName = document.getElementById('chatroomName');
  // invite.push(empInfo);
  // console.log(invite);
  // axios
  //   .post('http://localhost:8080/createChatroom', {
  //     chatroomName: chatroomName.value,
  //     headCount: invite.length,
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  //     setRoomId(response.data);
  //   });
  // };

  // {
  //   invite &&
  //     invite.map((data) => {
  //       console.log(data);
  //       console.log(data.empId);
  //       console.log(data.empName);
  //     });
  // }

  //사원초대하기
  //chatroomEmployee T에 초대할 사람과 초대한 사람 넣어주기
  // const onUserInvite = () => {
  //   invite &&
  //     axios
  //       .post(
  //         `http://localhost:8080/insertChatEmp/${chatroomId}`,
  //         invite.map((data) => {
  //           const inviteEnter = () => {
  //             client.send(
  //               '/app/chat/message',
  //               {},
  //               JSON.stringify({
  //                 chatroomId: chatroomId,
  //                 writer: data.empId,
  //                 chatContent: data.empName + '님이 입장하셨습니다',
  //               })
  //             );
  //           };
  //           inviteEnter();
  //           return {
  //             empId: {
  //               empId: data.empId,
  //             },
  //           };
  //         })
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //       });
  // };

  return (
    <div>
      <br />
      <Link to={'/chatemplist'}>
        <Button variant="contained">사원리스트 이동</Button>
      </Link>
      <br />
      <br />
      <h3>채팅방 만들기</h3>
      <br />
      <Input id="chatroomName" placeholder="채팅방 이름을 입력하세요" />

      <br />
      <Button
        variant="contained"
        onClick={() => {
          onCreateChatroom(
            empInfo,
            setRoomId,
            invite,
            document.getElementById('chatroomName')
          );
        }}>
        등록
      </Button>
      <Link to={`/chat?room=${roomId}`}>
        <Button
          variant="contained"
          onClick={() => onUserInvite(chatroomId, invite, client)}>
          <div>채팅하기</div>
        </Button>
      </Link>
    </div>
  );
}
export default CreateChatroom;
