import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import {
  chatroomInfo,
  empIdInfo,
  onHCInvite,
  onUserInvite,
} from '../../context/ChatAxios';

import styles from '../../css/chat/Chat.module.css';
import { Checkbox } from '@mui/material';
import { Box, Button, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

function InviteEmp({ modalOpen, setModalOpen }) {
  const [chatEmpList, setCEList] = useState([]);
  const [chatUnitList, setCUList] = useState([]);
  const [newInvite, setNewInvite] = useState([]);
  const [existChatEmp, setECEList] = useState([]);
  //채팅방 정보 불러오기
  const [chatroomName, setChatroomName] = useState('');
  const [headCount, setHeadCount] = useState(0);
  const [chatempinfo, setChatempinfo] = useState([]);

  const chatroomId = new URL(document.location).searchParams.get('room');

  const [empInfo] = useOutletContext();
  const empId = empInfo.empId;

  // socket
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  ////////////////////////////////////////////////////////////
  const existEmp = [];
  chatempinfo.map((info) => {
    return existEmp.push(info.empId.empId);
  });
  console.log(existEmp);

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

  //초대할 사원을 담아두는 메소드
  const onInvite = (checked, data) => {
    if (checked) {
      setNewInvite([...newInvite, data]);
    } else {
      setNewInvite(newInvite.filter((button) => button !== data));
    }
  };

  //사원정보가져오기
  useEffect(() => {
    if (chatroomId.length === 0) {
      chatroomInfo(chatroomId, setChatroomName, setHeadCount);
      empIdInfo(chatroomId, setChatempinfo);
    }
  }, [chatroomId]);

  //채팅방에 없는 사원list
  const ChatEmpHandle = (chatEmpList, setECEList) => {
    console.log();
    const arr = chatEmpList.filter((list) => !existEmp.includes(list.empId));
    console.log(arr);
    setECEList(arr);
  };

  // 사원list 출력하기
  useEffect(() => {
    if (chatUnitList.length === 0) {
      if (chatEmpList.length === 0) {
        getEmpListInSameUnit(empId, setCEList);
        setNewInvite([]);
      } else {
        setCUList(chatEmpList.unit);
        returnArr(chatEmpList, setCUList);

        ChatEmpHandle(chatEmpList, setECEList);
      }
    } else {
      console.log(existChatEmp);
    }
  }, [chatEmpList, chatUnitList, existChatEmp]);

  const closemodal = () => {
    setModalOpen(false);
  };

  return (
    <Modal open={modalOpen} onClose={closemodal}>
      <Box sx={style}>
        <h3>사원 초대하기</h3>
        <div className={styles.olList}>
          {chatUnitList.length !== 0 &&
            chatUnitList.map((cu, index) => {
              return (
                <div key={index} className={styles.cuCon}>
                  <p className={styles.cuName}>{cu}</p>

                  {existChatEmp.length !== 0 &&
                    existChatEmp.map((ce, index) => {
                      if (ce.unit.unitName === cu) {
                        return (
                          <div key={index} className={styles.fontlist}>
                            {ce.empName} {ce.position}
                            <Checkbox
                              type="checkbox"
                              onChange={(e) => {
                                onInvite(e.currentTarget.checked, ce);
                              }}
                              checked={newInvite.includes(ce) ? true : false}
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
            onUserInvite(chatroomId, newInvite, client),
            onHCInvite(chatroomId, chatroomName, headCount, newInvite),
            closemodal()
          )}>
          초대하기
        </Button>
      </Box>
    </Modal>
  );
}

export default InviteEmp;
