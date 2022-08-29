import { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import InviteEmp from './InviteEmp';
import { sendExit } from '../../utils/ChatUtils';
import {
  chatRecord,
  chatroomInfo,
  empIdInfo,
  onExitRoom,
  onHCupdate,
  onUserUpdate,
} from '../../context/ChatAxios';
import styles from '../../css/chat/Chat.module.css';
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
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

function ChatCopy({ empInfo, roomId }) {
  // const [empInfo] = useOutletContext();
  const empId = empInfo.empId;
  const chatroomId = roomId;
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  //채팅방 사람 확인 state
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const styleBox = {
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

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      console.log(chat);
      setInput([...input, chat]);
      console.log(...input);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  const send = () => {
    if (inputRef.current.value.trim() !== '') {
      client.send(
        '/app/chat/message',
        {},
        JSON.stringify({
          chatroomId: chatroomId,
          writer: empInfo,
          chatContent: inputRef.current.value,
        })
      );
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

  const [modalOpen, setModalOpen] = useState(false);

  // 채팅방 이름 바꾸기
  const [chatRoomTitle, setChatRoomTitle] = useState(chatroomName);
  const [clickChk, setClickChk] = useState(0);

  useEffect(() => {
    if (!!chatroomId) {
      empIdInfo(chatroomId, setChatempinfo);
    }
    //chatroom에 들어갔을 때 기록남게
    chatRecord(chatroomId, setChatting);
    chatroomInfo(chatroomId, setChatroomName, setHeadCount);
  }, [chatroomId, input]);

  useEffect(() => {
    setChatRoomTitle(chatroomName);
  }, [chatroomName]);

  useEffect(() => {
    setClickChk(clickChk);
  }, [clickChk]);

  useEffect(() => {
    if (chatempinfo.length !== 0) {
      // empIdInfo(chatroomId, setChatempinfo);
    }
  }, [chatempinfo]);

  const onChangeTitle = (event) => {
    setChatRoomTitle(event.target.value);
  };

  const onClickChatRoomTitle = () => {
    setClickChk(clickChk + 1);
    console.log(clickChk);
    if (clickChk > 1) {
      setClickChk(0);
    }
  };

  //엔터키
  const chatEnter = (e) => {
    if (e.key === 'Enter') {
      send();
      inputRef.current.value = '';
    }
  };

  //////////////////////////////////////////////////
  // 채팅내용 검색 - 지우지마세요!!!!!!!!!!!!! 추후구현
  // const [chatSearch, setChatSearch] = useState('');
  // const onChangeSearch = (e) => {
  //   setChatSearch(e.target.value);
  // };
  // const filterChatting = () => {
  //   chatting.filter((chat) => chat.chatContent.includes(chatSearch));
  // };

  return (
    <div className={styles.chatconvimeline}>
      <div className={styles.chatroomname}>
        {chatroomName ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '33px',
              justifyContent: 'center',
            }}>
            <TextField
              id="outlined-multiline-flexible"
              multiline
              sx={{
                '& .MuiInputBase-root': {
                  height: 20,
                },
              }}
              value={chatRoomTitle}
              onChange={onChangeTitle}
              onClick={onClickChatRoomTitle}
            />
            {clickChk == 2 ? (
              <Button
                variant="contained"
                sx={{ height: 30 }}
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
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={data.empId.empName} />
                  </ListItemButton>
                </List>
              );
            })}
          {/* 채팅방 나가기 */}
          <div className={styles.logoutBtn}>
            <Button
              onClick={() => {
                setModalOpen(true);
              }}>
              <PersonAddAlt1Icon />
            </Button>
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

      {modalOpen && (
        <InviteEmp
          style={styleBox}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setChatempinfo={setChatempinfo}
        />
      )}
      <ScrollToBottom className={styles.scrollbar} id="scroller">
        {/* 채팅기록을 가져옴 */}
        {chatting.map((msg, index) => {
          const chatTime = msg.chatTime.substr(11, 5);
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
            onKeyPress={chatEnter}
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
            }}>
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ChatCopy;
