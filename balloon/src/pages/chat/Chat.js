import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styles from '../../css/Chat/Chat.module.css';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
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
  onHCupdate,
  onUserUpdate,
} from '../../context/ChatAxios';

import { sendExit } from '../../utils/ChatUtils';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';

import ChatSide from './ChatSide';

const scrollToBottom = () => {
  document.getElementById('scroller').scroll(0, 1000);
};

function Chat() {
  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;
  const chatroomId = new URL(document.location).searchParams.get('room');
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

  //chatroomEmployee T에 chatroomId로 사원정보 가져오기
  //채팅방에 어떤사람이 남아있는지 알려주기 위해서
  const [chatempinfo, setChatempinfo] = useState([]);

  useEffect(() => {
    empIdInfo(chatroomId, setChatempinfo);
  }, []);

  //chatroom에 들어갔을 때 기록남게
  useEffect(() => {
    chatRecord(chatroomId, setChatting);
    chatroomInfo(chatroomId, setChatroomName, setHeadCount);
  }, [input]);

  const [modalOpen, setModalOpen] = useState(false);

  const closemodal = () => {
    setModalOpen(!modalOpen);
  };

  // 채팅방 이름 바꾸기
  const [chatRoomTitle, setChatRoomTitle] = useState(chatroomName);
  const [changeTitle, setChangeTitle] = useState(false);
  const [clickChk, setClickChk] = useState(0);

  const onChangeTitle = (event) => {
    // console.log(event);
    setChatRoomTitle(event.target.value);
  };

  useEffect(() => {
    setChatRoomTitle(chatroomName);
  }, [chatroomName]);

  useEffect(() => {
    setClickChk(clickChk);
  }, [clickChk]);

  const onClickChatRoomTitle = () => {
    setClickChk(clickChk + 1);
    // setChangeTitle(true);
    console.log(clickChk);
    if (clickChk > 1) {
      // setChangeTitle(false);
      // onChangeTitle();
      setClickChk(0);
    }
  };

  const keyEnter = (e) => {
    if (e.key == 'Enter') {
      setClickChk(0);
      onChangeTitle();
      // setChangeTitle(false);
    }
  };

  return (
    <Container maxWidth="xs" className={styles.Listcontainer}>
      <div className={styles.side}>
        <ChatSide />
        <div className={styles.chatconvimeline}>
          <div className={styles.chatroomname}>
            {chatroomName ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  label="-"
                  maxRows={4}
                  value={chatRoomTitle}
                  onChange={onChangeTitle}
                  onKeyPress={keyEnter}
                  onClick={onClickChatRoomTitle}
                />
                {clickChk == 2 ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      onUserUpdate(chatroomId, chatRoomTitle, headCount);
                      setClickChk(0);
                    }}>
                    수정하기
                  </Button>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <h5 className=" mb-2 font-weight-bold text-gray-dark">
                {chatRoomTitle}{' '}
              </h5>
            )}
          </div>

          {/* <Link to={'/chatroom'}>
              <Button variant="contained">채팅목록 이동</Button>
            </Link> */}
          {/* 
          // {/* 채팅방 나가기 
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
          </div> */}

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

          <List sx={{ zIndex: 5 }}>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="채팅중인 사람" />

              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </ListItemButton>

            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                position: 'absolute',
                width: '100%',
                background: 'lightgray',
                paddingTop: 2,
                maxHeight: 200,
                overflowY: 'scroll',
              }}>
              {chatempinfo &&
                chatempinfo.map((data, index) => {
                  return (
                    <List component="div" disablePadding key={index}>
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
              {/* 채팅방 나가기 */}
              <div className={styles.logoutBtn}>
                <Link to={'/chatlist'}>
                  <Button
                    onClick={() => (
                      onExitRoom(
                        chatroomId,
                        empId,
                        sendExit(client, chatroomId, empInfo)
                      ),
                      onHCupdate(chatroomId, chatroomName, headCount)
                    )}>
                    <LogoutIcon />
                  </Button>
                </Link>
              </div>
            </Collapse>
          </List>

          {/* <ScrollToBottom className={styles.scrollbar}> */}

          {/* 채팅방에서 사원초대하기 */}
          {/* <div>
        <input id="empId" placeholder="초대할 사원의 사번을 입력하세요" />
        <button onClick={onUserAdd}>사원초대하기</button>
      </div> */}

          <ScrollToBottom className={styles.scrollbar} id="scroller">
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
                    <div>
                      <div className={styles.othermessage}>
                        <div>{msg.employee.empName}</div>
                        <div className={styles.contentContan}>
                          <div className={styles.othercontent}>
                            {msg.chatContent}
                          </div>
                          <div className={styles.time}>{chatTime}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollToBottom>

          <div className={styles.scroll}>
            <div className={styles.contain}></div>

            <div className={styles.inputmain}>
              <input
                className={styles.inputform}
                ref={inputRef}
                onKeyPress={onKeyPress}
                placeholder="메시지를 입력하세요"
              />

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                className={styles.inputbutton}
                onClick={() => {
                  inputRef.current.value && send();
                  inputRef.current.focus();
                  inputRef.current.value = '';
                  // inputRef.current.scroll(0, 1000);
                  // scrollToBottom();
                }}>
                전송
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Chat;
