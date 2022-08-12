import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useOutletContext } from 'react-router-dom';

import Input from '@mui/material/Input';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';

function CreateChatroom({ invite }) {
  const [roomId, setRoomId] = useState();
  const chatroomId = roomId;

  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;

  //채팅방만들때 사원 초대하기
  const onCreateChatroom = () => {
    const chatroomName = document.getElementById('chatroomName');
    invite.push(empId);

    axios
      .post('http://localhost:8080/createChatroom', {
        chatroomName: chatroomName.value,
        headCount: invite.length,
      })
      .then((response) => {
        console.log(response.data);
        setRoomId(response.data);
      });
  };

  //chatroomEmployee T에 초대할 사람과 초대한 사람 넣어주기
  const onUserInvite = () => {
    invite &&
      axios
        .post(
          `http://localhost:8080/insertChatEmp/${chatroomId}`,

          invite.map((data) => {
            console.log(data);
            return {
              empId: {
                empId: data,
              },
            };
          })
        )
        .then((response) => {
          console.log(response.data);
        });
  };
  console.log(invite.length);

  return (
    <div>
      <Container maxWidth="sm" border="1px dashed blue" width="50%">
        <h3>채팅방 만들기</h3>
        <br />
        <Input id="chatroomName" placeholder="채팅방 이름을 입력하세요" />
        {/* <br /> */}
        {/* <Input id="headCount" placeholder="인원수를 입력하세요" /> */}
        <br />
        <Button
          variant="text"
          onClick={() => {
            onCreateChatroom();
          }}>
          등록
        </Button>
        <Link to={`/chat?room=${roomId}`}>
          <Button variant="text" onClick={() => onUserInvite()}>
            <div>채팅하기</div>
          </Button>
        </Link>
      </Container>
    </div>
  );
}
export default CreateChatroom;
