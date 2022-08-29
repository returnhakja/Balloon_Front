import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChatSide from './ChatSide';
import CreateChatroom from './CreateRoom';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import styles from '../../css/chat/Chat.module.css';
import Button from '@mui/material/Button';
import { Checkbox, Container, Grid } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';

function ChatEmpList({ invite, setInvite }) {
  //채팅할사원
  const [chatEmpList, setCEList] = useState([]);
  //조직이름
  const [chatUnitList, setCUList] = useState([]);
  //채팅방모달
  const [openCreatChat, setopenCreatChat] = useState(false);
  //로그인 한 사원정보
  const [empInfo] = useOutletContext();
  const empId = empInfo.empId;

  //로그인 한 사원이 속한 조직빼오기
  const returnUnit = (chatEmpList, setCUList) => {
    const unitname = [];

    chatEmpList.map((row) => {
      return unitname.push(row.unit.unitName);
    });

    const array = unitname.filter((row, index) => {
      return unitname.indexOf(row) === index;
    });

    return setCUList(array);
  };

  // 사원list 출력하기
  useEffect(() => {
    setInvite([]);
    if (!!empId) {
      if (chatUnitList.length === 0) {
        if (chatEmpList.length === 0) {
          getEmpListInSameUnit(empId, setCEList);
        } else {
          setCUList(chatEmpList.unit);
          returnUnit(chatEmpList, setCUList);
        }
      }
    }
  }, [empId, chatEmpList, chatUnitList]);

  //초대할 사원을 담아두는 메소드
  const onInvite = (checked, data) => {
    if (checked) {
      setInvite([...invite, data]);
    } else {
      setInvite(invite.filter((button) => button !== data));
    }
  };

  //사원 미선택 시 알림창
  const eventClickHandle = () => {
    if (invite.length === 0) {
      alert('사원을 선택해주세요!!');
    } else {
      setopenCreatChat(true);
    }
  };

  return (
    <Container maxWidth="xs" className={styles.Listcontainer}>
      <div className={styles.side2}>
        <div className={styles.listcon}>
          <ChatSide />
          <div className={styles.list}>
            <div className={styles.chatIcon}>
              <div className={styles.text}>사원 목록</div>
              <Grid container justifyContent="flex-end">
                <Button
                  className="chatIcon"
                  onClick={() => {
                    eventClickHandle();
                  }}>
                  <AddCommentIcon
                    fontSize="large"
                    className={styles.creatIcon}
                  />
                </Button>
                {openCreatChat && (
                  <CreateChatroom
                    invite={invite}
                    openCreatChat={openCreatChat}
                    setopenCreatChat={setopenCreatChat}
                  />
                )}
              </Grid>
            </div>
            <hr />
            <div className={styles.olList}>
              {chatUnitList.length !== 0 &&
                chatUnitList.map((cu, index) => {
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
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ChatEmpList;
