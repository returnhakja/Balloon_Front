import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import styles from '../../css/chat/Chat.module.css';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, Checkbox, Container, Grid } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CRCopy from './CRCopy';

export default function CECopy({ open, setOpen, empInfo }) {
  const handleClose = () => setOpen(false);
  const [chatEmpList, setCEList] = useState([]);
  const [chatUnitList, setCUList] = useState([]);
  const [openCreatChat, setopenCreatChat] = useState(false);
  const [invite, setInvite] = useState([]);
  const empId = empInfo.empId;
  const [chatStatus, setChatStatus] = useState('chatEmpList');
  const returnArr = (list, setCUList) => {
    const arr = [];

    list.map((row) => {
      return arr.push(row.unit.unitName);
    });

    const array = arr.filter((row, index) => {
      return arr.indexOf(row) === index;
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
          returnArr(chatEmpList, setCUList);
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

  const eventClickHandle = () => {
    if (invite.length === 0) {
      alert('사원을 선택해주세요!!');
    } else {
      console.log(invite);
      setopenCreatChat(true);
    }
  };

  useEffect(() => {}, [chatStatus]);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"> */}
      <Box open={open}>
        <div className={styles.side2}>
          <div className={styles.listcon}>
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
                    <CRCopy
                      invite={invite}
                      openCreatChat={openCreatChat}
                      setopenCreatChat={setopenCreatChat}
                      empInfo={empInfo}
                      setChatStatus={setChatStatus}
                      setInvite={setInvite}
                    />
                  )}
                </Grid>
              </div>
              {/* <hr /> */}
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
                                {/* <img src={ce.photo} alt="사원 이미지" /> */}
                                {/* <div className={styles.liststyle}> */}
                                {/* <div className={styles.li}> */}
                                {ce.empName} {ce.position}
                                <Checkbox
                                  type="checkbox"
                                  onChange={(e) => {
                                    onInvite(e.currentTarget.checked, ce);
                                  }}
                                  checked={invite.includes(ce) ? true : false}
                                />
                                {/* <span>{ce.position}</span> */}
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
      </Box>
      {/* </Modal> */}
    </div>
  );
}
