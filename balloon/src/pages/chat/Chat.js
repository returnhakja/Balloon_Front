import { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  chatRecord,
  chatroomInfo,
  empIdInfo,
  onUserUpdate,
} from '../../context/ChatAxios';
import styles from '../../css/chat/Chat.module.css';
import {
  Avatar,
  Button,
  Collapse,
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
import ExitChatroom from './ExitChatroom';
import InviteEmp from './InviteEmp';

import ChatStomp from './ChatStomp';

export default function Chat({ empInfo, roomId, setChatStatus }) {
  const empId = empInfo.empId;
  const chatroomId = roomId;
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  // socket

  const client = ChatStomp();

  // client.debug = null;

  //채팅방 사람 확인 state
  const [open, setOpen] = useState(false);

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

  //채팅방 나가기 모달
  const [openExitChat, setOpenExitChat] = useState(false);

  //삭제확인알림창
  const eventClickHandle = () => {
    setOpenExitChat(true);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const styleBox = {
    position: 'absolute',
    top: '90%',
    left: '97%',
    transform: 'translate(-90%, -90%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
  };

  client.connect({}, () => {
    client.subscribe(`/topic/message/${chatroomId}`, (data) => {
      const chat = JSON.parse(data.body);
      setInput([...input, chat]);
      client.disconnect();
    });
  });

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

  //엔터키
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
      inputRef.current.value = '';
    }
  };

  //chatroom에 들어갔을 때 기록남게
  useEffect(() => {
    if (!!chatroomId) {
      empIdInfo(chatroomId, setChatempinfo);
    }
    chatRecord(chatroomId, setChatting, empId);
    chatroomInfo(chatroomId, setChatroomName, setHeadCount);
  }, [input, chatroomId, chatting.length]);

  //채팅방 이름수정
  const onChangeTitle = (event) => {
    setChatRoomTitle(event.target.value);
  };
  useEffect(() => {
    setChatRoomTitle(chatroomName);
    setClickChk(clickChk);
  }, [chatroomName, clickChk]);

  const onClickChatRoomTitle = () => {
    setClickChk(clickChk + 1);
    if (clickChk > 1) {
      setClickChk(0);
    }
  };

  useEffect(() => {
    setModalOpen();
  }, []);

  const keyEnter = (e) => {
    if (e.key == 'Enter') {
      setClickChk(0);
      onChangeTitle();
    }
  };

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
              onKeyPress={keyEnter}
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
            {/* 사원추가 */}
            <Button
              onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }}>
              <PersonAddAlt1Icon />
            </Button>
            <Button
              variant="text"
              disableElevation
              onClick={(e) => {
                const eventExit = () => {
                  e.preventDefault();
                  eventClickHandle();
                };
                return eventExit();
              }}>
              <LogoutIcon />
            </Button>
            {openExitChat && (
              <ExitChatroom
                openExitChat={openExitChat}
                setOpenExitChat={setOpenExitChat}
                chatroomId={chatroomId}
                chatroomName={chatroomName}
                headCount={headCount}
                empInfo={empInfo}
                setChatStatus={setChatStatus}
              />
            )}
          </div>
        </Collapse>
      </List>
      {modalOpen && (
        <InviteEmp
          style={styleBox}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setChatempinfo={setChatempinfo}
          empInfo={empInfo}
          chatroomId={chatroomId}
        />
      )}

      <ScrollToBottom className={styles.scrollbar} id="scroller">
        {/* 채팅기록을 가져옴 */}
        {chatting.map((msg, index) => {
          const chatTime = msg.chatTime.substr(11, 5);
          if (msg.status === 1) {
            return (
              <div key={index}>
                {msg.employee && msg.employee.empId === empInfo.empId ? (
                  <div className={styles.message}>
                    <div className={styles.mytime}>{chatTime}</div>
                    <div className={styles.mycontent}>{msg.chatContent}</div>
                  </div>
                ) : (
                  <div key={index} className={styles.othermessage}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        marginRight: 1,
                      }}
                      src={
                        !!msg.employee.photo
                          ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${msg.employee.photo}`
                          : ''
                      }
                    />
                    <div>
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
          } else if (msg.status === 2) {
            const scheduleContent = JSON.parse(msg.chatContent);
            let startValue = scheduleContent.Startvalue.replace('T', ' ');
            let endValue = scheduleContent.endvalue.replace('T', ' ');
            return (
              <>
                <div key={index} className={styles.othermessage}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: 1,
                    }}
                    src={
                      !!msg.employee.photo
                        ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${msg.employee.photo}`
                        : ''
                    }
                  />
                  <div>
                    <div>{msg.employee.empName}</div>
                    <div className={styles.contentContan}>
                      <div className={styles.scheduleContent}>
                        <p>일정제목 : {scheduleContent.scheduletitle}</p>
                        <p>일정내용 : {scheduleContent.CalendarContent}</p>
                        <p>장소 : {scheduleContent.CalendarLocation}</p>
                        <p>시작일자 :{startValue}</p>
                        <p>종료일자 :{endValue}</p>
                        <div>
                          보낸사람 : {scheduleContent.empName}
                          {scheduleContent.position}
                        </div>
                      </div>
                      <div className={styles.time}>{chatTime}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (msg.status === 3) {
            const approvalContent = JSON.parse(msg.chatContent);
            return (
              <>
                <div key={index} className={styles.othermessage}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: 1,
                    }}
                    src={
                      !!msg.employee.photo
                        ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${msg.employee.photo}`
                        : ''
                    }
                  />
                  <div>
                    <div>{msg.employee.empName}</div>
                    <div className={styles.contentContan}>
                      <div className={styles.scheduleContent}>
                        <div>기안양식 : {approvalContent.approvalForm}</div>
                        <div>기안제목 : {approvalContent.approvalTitle}</div>
                        <div>
                          기안자 : {approvalContent.empName}
                          {approvalContent.position}
                        </div>
                      </div>
                      <div className={styles.time}>{chatTime}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (msg.status === 4) {
            const approvalTripContent = JSON.parse(msg.chatContent);
            return (
              <>
                <div key={index} className={styles.othermessage}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: 1,
                    }}
                    src={
                      !!msg.employee.photo
                        ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${msg.employee.photo}`
                        : ''
                    }
                  />
                  <div>
                    <div>{msg.employee.empName}</div>
                    <div className={styles.contentContan}>
                      <div className={styles.scheduleContent}>
                        <div>기안양식 : {approvalTripContent.approvalForm}</div>
                        <div>
                          기안제목 : {approvalTripContent.approvalTitle}
                        </div>
                        <div>
                          기안자 : {approvalTripContent.empName}
                          {approvalTripContent.position}
                        </div>
                        <div>방문처 : {approvalTripContent.visitPlace}</div>
                        <div>방문목적 : {approvalTripContent.visitPurpose}</div>
                      </div>
                      <div className={styles.time}>{chatTime}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          } else if (msg.status === 5) {
            const approvalApmtContent = JSON.parse(msg.chatContent);
            return (
              <>
                <div key={index} className={styles.othermessage}>
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      marginRight: 1,
                    }}
                    src={
                      !!msg.employee.photo
                        ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${msg.employee.photo}`
                        : ''
                    }
                  />
                  <div>
                    <div>{msg.employee.empName}</div>
                    <div className={styles.contentContan}>
                      <div className={styles.scheduleContent}>
                        <div>기안양식 : {approvalApmtContent.approvalForm}</div>
                        <div>
                          기안제목 : {approvalApmtContent.approvalTitle}
                        </div>
                        <div>
                          기안자 : {approvalApmtContent.empName}
                          {approvalApmtContent.position}
                        </div>
                        <div>구성원명 : {approvalApmtContent.member}</div>
                        <div>
                          발령부서 : {approvalApmtContent.appointDepartment}
                        </div>
                        <div>
                          발령직위 : {approvalApmtContent.appointPosition}
                        </div>
                      </div>
                      <div className={styles.time}>{chatTime}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          }
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
            }}>
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}
