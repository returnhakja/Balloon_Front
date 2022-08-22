import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import styles from '../../css/Chat/Chat.module.css';
import Button from '@mui/material/Button';
import { Checkbox, Container, Grid } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';
// import Search from 'antd/lib/transfer/search';
import ChatSide from './ChatSide';
import CreateChatroom from './CreateRoom';
import AddCommentIcon from '@mui/icons-material/AddComment';

// import TextField from '@mui/material/TextField';

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

function ChatEmpList({ invite, setInvite }) {
  const [chatEmpList, setCEList] = useState([]);
  const [chatUnitList, setCUList] = useState([]);
  const [openCreatChat, setopenCreatChat] = useState(false);

  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;

  const returnArr = (list, setCUList) => {
    const arr = [];

    list.map((row) => {
      // return arr.push(row.unit.unitCode);
      return arr.push(row.unit.unitName);
    });

    console.log(arr);

    const ss = ['라이언', '어피치', '라이언', '어피치'];

    const array = arr.filter((row, index) => {
      return arr.indexOf(row) === index;
    });
    console.log(array);

    return setCUList(array);
  };

  // 사원list 출력하기
  useEffect(() => {
    if (chatEmpList.length === 0) {
      getEmpListInSameUnit(empId, setCEList);
      setInvite([]);
    } else {
      console.log(chatEmpList);
      setCUList(chatEmpList.unit);
      // const returnArray = returnArr(chatEmpList, setCUList);
      // console.log(returnArray);
      returnArr(chatEmpList, setCUList);
      // if (chatUnitList.length !== 0) {
      //   console.log(chatUnitList);
      // }
    }
  }, [chatEmpList]);

  useEffect(() => {
    !!chatUnitList.length && console.log(chatUnitList);
  }, [chatUnitList]);

  //초대할 사원을 담아두는 메소드
  // const [invite, setInvite] = useState([]);
  const onInvite = (checked, data) => {
    if (checked) {
      setInvite([...invite, data]);
      console.log(invite);
    } else {
      setInvite(invite.filter((button) => button !== data));
    }
  };

  return (
    <Container maxWidth="xs" className={styles.Listcontainer}>
      <div className={styles.side}>
        <div className={styles.listcon}>
          <ChatSide />
          <div className={styles.list}>
            <div className={styles.chatIcon}>
              <div className={styles.text}>사원 목록</div>
              <Grid container justifyContent="flex-end">
                <Button
                  className="chatIcon"
                  onClick={() => {
                    setopenCreatChat(true);
                  }}>
                  {/* <Link to={'/createroom'}> */}
                  <AddCommentIcon
                    fontSize="large"
                    className={styles.creatIcon}
                  />
                  {/* </Link> */}
                </Button>
                {openCreatChat && (
                  <CreateChatroom
                    style={style}
                    openCreatChat={openCreatChat}
                    setopenCreatChat={setopenCreatChat}
                    invite={invite}
                  />
                )}
              </Grid>
            </div>
            <hr />
            <ol className={styles.olList}>
              {chatUnitList.map((cu, index) => {
                return (
                  <div key={index}>
                    <h2>{cu}</h2>
                    {chatEmpList.map((ce, index) => {
                      // if (ce.unit.unitCode === cu) {
                      if (ce.unit.unitName === cu) {
                        return (
                          <div key={index} className={styles.fontlist}>
                            {/* <img src={ce.photo} alt="사원 이미지" /> */}
                            {'  '}
                            <div className={styles.liststyle}>
                              {ce.empName} {ce.position}
                              <Checkbox
                                type="checkbox"
                                onChange={(e) => {
                                  onInvite(e.currentTarget.checked, ce);
                                }}
                                checked={invite.includes(ce) ? true : false}
                              />
                            </div>

                            {/* <span>{ce.position}</span> */}
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ChatEmpList;
