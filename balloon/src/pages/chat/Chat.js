import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styles from '../../css/Chat/Chat.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Button,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { TextField } from '@mui/material';
import {
  chatRecord,
  chatroomInfo,
  empIdInfo,
  onExitRoom,
  onUserUpdate,
} from '../../context/ChatAxios';

import Modal from './Modal';
import { sendExit } from '../../utils/ChatUtils';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ChatSide from './ChatSide';

function Chat() {
  //스크롤

  // login할때 empId를 가져옴 -> 채팅방생성/채팅 시 사용가능
  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;
  console.log(empInfo);

  //실시간 시간 가져오기
  const nowTime = moment().format('HH:mm');

  const chatroomId = new URL(document.location).searchParams.get('room');
  // input에 저장해야하는것은 채팅내용과 작성자를 객체형태로 만들어서 배열로 저장
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  //채팅방 사람 확인 state
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      console.log(chat);
      setInput([...input, chat]);
      console.log(input);
      disconnect();
    });
  });

  console.log(input);

  const disconnect = () => {
    client.disconnect();
  };

  const send = (e) => {
    // invite.pop(empId);
    // console.log(invite);
    client.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        chatroomId: chatroomId,
        writer: empInfo,
        chatContent: inputRef.current.value,
      })
    );
  };

  //엔터키
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      send();
      inputRef.current.value = '';
    }
  };

  //채팅방 채팅기록
  const [chatting, setChatting] = useState([]);

  //채팅방 정보 불러오기
  const [chatroomName, setChatroomName] = useState('');
  const [headCount, setHeadCount] = useState(0);

  //채팅방이름수정을위해서 채팅방정보가져옴
  // const chatroomInfo = () => {
  //   axios
  //     .get(`http://localhost:8080/oneChatroom/${chatroomId}`)
  //     .then((response) => {
  //       console.log(response.data.chatroomName);
  //       setChatroomName(response.data.chatroomName);
  //       setHeadCount(response.data.headCount);
  //     });
  // };

  //chatroomEmployee T에 chatroomId로 사원정보 가져오기
  //채팅방에 어떤사람이 남아있는지 알려주기 위해서
  const [chatempinfo, setChatempinfo] = useState([]);

  useEffect(() => {
    // const empIdInfo = () => {
    //   axios
    //     .get(`http://localhost:8080/oneChatEmp/${chatroomId}`)
    //     .then((response) => {
    //       console.log(response.data);
    //       setChatempinfo(response.data);
    //     });
    // };
    empIdInfo(chatroomId, setChatempinfo);
  }, []);

  //chatroom에 들어갔을 때 기록남게
  useEffect(() => {
    // const chatRecord = (setChatting) => {
    //   axios
    //     .get(`http://localhost:8080/chatRecord/${chatroomId}`)
    //     .then((response) => {
    //       console.log(response.data);
    //       setChatting(response.data);
    //     });
    // };
    chatRecord(chatroomId, setChatting);
    chatroomInfo(chatroomId, setChatroomName, setHeadCount);
  }, [input]);

  //채팅방 이름수정
  // const onUserUpdate = () => {
  //   const chatroomName = document.getElementById('chatroomName');

  //   axios
  //     .put(`http://localhost:8080/updateroom/${chatroomId}`, {
  //       chatroomName: chatroomName.value,
  //       headCount: headCount,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  const [modalOpen, setModalOpen] = useState(false);

  const closemodal = () => {
    setModalOpen(!modalOpen);
  };

  //사원초대
  // const onUserAdd = () => {
  //   const employee = document.getElementById('empId');
  //   console.log(chatroomId);
  //   console.log(employee.value);
  //   axios
  //     .post(`http://localhost:8080/insertChatEmp/${chatroomId}`, {
  //       empId: {
  //         empId: employee.value,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  //채팅방 나가기
  // const sendExit = () => {
  //   client.send(
  //     '/app/chat/message',
  //     {},
  //     JSON.stringify({
  //       chatroomId: chatroomId,
  //       writer: empInfo,
  //       chatContent: empInfo.empName + '님이 방을 나가셨습니다',
  //     })
  //   );
  // };

  // const onExitRoom = () => {
  //   console.log(chatroomId);
  //   console.log(empId);
  //   axios
  //     .delete(`http://localhost:8080/deleteroom/${chatroomId}/${empId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  //   sendExit();
  // };
  // console.log(empInfo.empName);

  return (
    <Container maxWidth="xs">
      <ChatSide />
      <div className={styles.chatroomname}>
        <h3>
          <button onClick={closemodal}>{chatroomName}</button>
          {modalOpen && <Modal closemodal={closemodal} />}
        </h3>
      </div>
      <div className="chatconvimeline">
        <div className={styles.chatheadder}>
          <Link to={'/chatroom'}>
            <Button variant="contained">채팅목록 이동</Button>
          </Link>
          {/* 채팅방 나가기 */}
          <div className={styles.logoutBtn}>
            <Link to={'/chatroom'}>
              <Button
                onClick={() =>
                  onExitRoom(
                    chatroomId,
                    empId,
                    sendExit(client, chatroomId, empInfo)
                  )
                }>
                <LogoutIcon />
              </Button>
            </Link>
          </div>
        </div>
        {/* 채팅방 인원수 & 이름수정 */}
        {/* <div className={styles.updatename}>
        <TextField
          id="chatroomName"
          variant="outlined"
          placeholder="수정할 채팅방의 이름을 입력하세요"
          defaultValue={chatroomName}
        />
        <br />
        <Button
          variant="contained"
          onClick={() =>
            onUserUpdate(
              chatroomId,
              document.getElementById('chatroomName'),
              headCount
            )
          }>
          수정하기
        </Button>
      </div> */}
        {/* <div>{modalOpen == true ? <Modal /> : null}</div> */}
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="채팅중인 사람" />
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {chatempinfo &&
              chatempinfo.map((data) => {
                return (
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {/* console.log(data.empId.empName); return{' '} */}
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={data.empId.empName} />
                    </ListItemButton>
                  </List>
                );
              })}
          </Collapse>
        </List>
        {/* <div>
          <h3>채팅방에 있는 사람</h3>
          {chatempinfo &&
            chatempinfo.map((data) => {
              console.log(data.empId.empName);
              return <div>{data.empId.empName}</div>;
            })}
        </div> */}

        {/* 채팅방에서 사원초대하기 */}
        {/* <div>
        <input id="empId" placeholder="초대할 사원의 사번을 입력하세요" />
        <button onClick={onUserAdd}>사원초대하기</button>
      </div> */}

        <div className={styles.scrollbar}>
          {/* 채팅기록을 가져옴 */}
          {chatting.map((msg, index) => {
            const chatTime = msg.chatTime.substr(11, 5);
            console.log(msg.chatTime.substr(11, 5));

            return (
              <div key={index}>
                {msg.employee.empId === empInfo.empId ? (
                  <div className={styles.message}>
                    <div className={styles.mytime}>{chatTime}</div>
                    <div className={styles.mycontent}>{msg.chatContent}</div>
                  </div>
                ) : (
                  <div className={styles.othermessage}>
                    <div>{msg.employee.empName}</div>
                    <span className={styles.othercontent}>
                      {msg.chatContent}
                    </span>
                    <span className={styles.time}>{chatTime}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.scroll}>
          <div className={styles.contain}>
            {/* chatting내용 사용자에 따라 배치 */}

            {/* {input.map((chat, index) => {
            return (
              <div key={chat.writer + index}>
                {empInfo.empId === chat.writer.empId ? (
                  <div className={styles.message}>
                    <span className={styles.mytime}>{nowTime}</span>
                    <span className={styles.mycontent}>{chat.chatContent}</span>
                  </div>
                ) : (
                  <div className={styles.othermessage}>
                    <div>{chat.writer.empName}</div>
                    <span className={styles.othercontent}>
                      {chat.chatContent}
                    </span>
                    <span className={styles.time}>{nowTime}</span>
                  </div>
                )}
                <br />
              </div>
            );
          })} */}

            {/* {input.length !== 0 &&
            input.map((chat, index) => {
              console.log(chat);
              return (
                <div key={chat.writer + index}>
                  {empInfo.empId === chat.writer ? (
                    <div className={styles.message}>
                      {nowTime}
                      {chat.chatContent}
                    </div>
                  ) : (
                    <div className={styles.othercon}>
                      <div className={styles.othermessage}>
                        {nowTime}
                        {chat.chatContent}
                      </div>
                    </div>
                  )}
                  <br />
                </div>
              );
            })}
*/}
          </div>

          <div className={styles.inputmain}>
            <input
              className={styles.inputform}
              ref={inputRef}
              onKeyPress={onKeyPress}
              placeholder="메시지를 입력하세요"
            />
            {/* <Button
            className={styles.inputbutton}
            onClick={() => {
              inputRef.current.value && send();
              inputRef.current.focus();
              inputRef.current.value = '';
            }}>
            보내기
          </Button> */}
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              className={styles.inputbutton}
              onClick={() => {
                inputRef.current.value && send();
                inputRef.current.focus();
                inputRef.current.value = '';
              }}>
              {' '}
              전송
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Chat;
