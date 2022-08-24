import { Box, Button, Modal } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import styles from '../../css/Chat/Chat.module.css';
import { Checkbox } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import {
  chatroomInfo,
  onHCInvite,
  onUserInvite,
} from '../../context/ChatAxios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function InviteEmp({ style, modalOpen, setModalOpen }) {
  const [chatEmpList, setCEList] = useState([]);
  const [chatUnitList, setCUList] = useState([]);
  const [invite, setInvite] = useState([]);
  //채팅방 정보 불러오기
  const [chatroomName, setChatroomName] = useState('');
  const [headCount, setHeadCount] = useState(0);

  const [disable, setDisable] = useState(false);

  const chatroomId = new URL(document.location).searchParams.get('room');

  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;

  // socket
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  ////////////////////////////////////////////////////////////
  const returnArr = (list, setCUList) => {
    const arr = [];
    list.map((row) => {
      // return arr.push(row.unit.unitCode);
      return arr.push(row.unit.unitName);
    });
    const array = arr.filter((row, index) => {
      return arr.indexOf(row) === index;
    });
    return setCUList(array);
  };

  // 사원list 출력하기
  useEffect(() => {
    if (chatUnitList.length === 0) {
      if (chatEmpList.length === 0) {
        getEmpListInSameUnit(empId, setCEList);
        setInvite([]);
      } else {
        setCUList(chatEmpList.unit);
        returnArr(chatEmpList, setCUList);
      }
    }
  }, [chatEmpList, chatUnitList]);

  //초대할 사원을 담아두는 메소드
  const onInvite = (checked, data) => {
    if (checked) {
      setInvite([...invite, data]);
    } else {
      setInvite(invite.filter((button) => button !== data));
    }
  };
  console.log(invite);
  console.log(chatroomId);
  console.log(chatroomName);
  console.log(headCount);

  useEffect(() => {
    chatroomInfo(chatroomId, setChatroomName, setHeadCount);
  }, []);

  console.log();
  const closemodal = () => {
    // onUserInvite(chatroomId, invite, client);
    setModalOpen(false);
    // onHCInvite(chatroomId, chatroomName, headCount, invite);
  };

  return (
    <Modal open={modalOpen} onClose={closemodal}>
      <Box sx={style}>
        <h3>사원 초대하기</h3>
        <div className={styles.olList}>
          {chatUnitList.map((cu, index) => {
            return (
              <div key={index} className={styles.cuCon}>
                <p className={styles.cuName}>{cu}</p>

                {chatEmpList.map((ce, index) => {
                  if (ce.unit.unitName === cu) {
                    return (
                      <div key={index} className={styles.fontlist}>
                        {ce.empName} {ce.position}
                        <Checkbox
                          type="checkbox"
                          onChange={(e) => {
                            onInvite(e.currentTarget.checked, ce);
                          }}
                          checked={invite.includes(ce) ? true : false}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
        <Button
          variant="contained"
          onClick={() => (
            onUserInvite(chatroomId, invite, client),
            onHCInvite(chatroomId, chatroomName, headCount, invite)
          )}>
          초대하기
        </Button>
      </Box>
    </Modal>
  );
}

export default InviteEmp;
