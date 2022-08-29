import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { onCreateChatroom } from '../../context/ChatAxios';
import styles from '../../css/chat/Chat.module.css';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {
  onAllChatEmp,
  onCreateChatroom,
  onUserInvite,
} from '../../context/ChatAxios';
import { Box, Modal } from '@mui/material';

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  padding: 4,
};

function CreateChatroom({ invite, openCreatChat, setopenCreatChat }) {
  const inputRef = useRef();
  const [empInfo] = useOutletContext();
  // socket
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, () => {
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  console.log(invite);
  //1:1채팅일 때 이미있는 채팅방 예외처리
  const alreadyInvite = [];
  invite.map((vite) => {
    alreadyInvite.push(vite.empId);
  });
  console.log(alreadyInvite);

  const [allChatEmp, setAllChatEmp] = useState([]);

  useEffect(() => {
    onAllChatEmp(setAllChatEmp);
  }, []);

  console.log(allChatEmp);
  let allChatEmpId = [];
  allChatEmpId = allChatEmp.filter((emp) => emp.empId.empId !== empInfo.empId);
  console.log(allChatEmpId);

  const checkChatEmp = (allChatEmpId, alreadyInvite) => {
    let check = true;
    allChatEmpId.map((id) => {
      if (id.empId.empId == alreadyInvite) {
        alert('이미 있는 채팅방입니다');
        check = false;
      }
    });
    return check;
  };

  return (
    <Modal open={openCreatChat} onClose={handleClose}>
      <Box sx={style}>
        <br />
        <br />
        <h3>채팅방 만들기</h3>
        <br />
        <Input id="chatroomName" placeholder="채팅방 이름을 입력하세요" />
        <br />
        <br />
        <Button
          variant="contained"
          sx={{ marginRight: 2 }}
          onClick={() => {
            if (alreadyInvite.length === 1) {
              const check = checkChatEmp(allChatEmpId, alreadyInvite[0]);
              check &&
                onCreateChatroom(
                  empInfo,
                  setRoomId,
                  invite,
                  document.getElementById('chatroomName')
                );
            } else {
              onCreateChatroom(
                empInfo,
                setRoomId,
                invite,
                document.getElementById('chatroomName')
              );
            }
          }}>
          등록
        </Button>
        <Link to={`/chatting?room=${roomId}`}>
          <Button
            variant="contained"
            onClick={() => {
              eventChatHandle();

              // inputRef.current.value = '';
            }}>
            <div>채팅하기</div>
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
export default CreateChatroom;
