import { useEffect, useRef, useState } from 'react';
import './Header.css';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import styles from './Chat.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

function Chat({ invite }) {
  // login할때 empId를 가져옴 -> 채팅방생성/채팅 시 사용가능
  const [setEmpId, empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;
  console.log(empId);
  console.log(empInfo.empName);

  //실시간 시간 가져오기
  const nowTime = moment().format('HH:mm');

  const chatroomId = new URL(document.location).searchParams.get('room');
  // input에 저장해야하는것은 채팅내용과 작성자를 객체형태로 만들어서 배열로 저장
  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

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
    // invite.pop(empId);
    // console.log(invite);
    client.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        chatroomId: chatroomId,
        writer: empId,
        chatContent: inputRef.current.value,
      })
    );
  };

  //채팅방 채팅기록
  const [chatting, setChatting] = useState([]);

  //채팅방 정보 불러오기
  const [chatroomName, setChatroomName] = useState('');
  const [headCount, setHeadCount] = useState(0);

  const chatroomInfo = () => {
    axios
      .get(`http://localhost:8080/oneChatroom/${chatroomId}`)
      .then((response) => {
        console.log(response.data.chatroomName);
        setChatroomName(response.data.chatroomName);
        setHeadCount(response.data.headCount);
      });
  };

  //chatroomEmployee T에 chatroomId로 사원정보 가져오기
  const [empinfo, setEmpinfo] = useState([]);

  useEffect(() => {
    const empIdInfo = () => {
      axios
        .get(`http://localhost:8080/oneChatEmp/${chatroomId}`)
        .then((response) => {
          console.log(response.data);
          setEmpinfo(response.data);
        });
    };
    empIdInfo(setEmpinfo);
  }, []);
  console.log(empinfo);

  {
    empinfo &&
      empinfo.map((data) => {
        console.log(data.empId.empName);
        return {};
      });
  }

  //chatroom에 들어갔을 때 기록남게
  useEffect(() => {
    const chatRecord = (setChatting) => {
      axios
        .get(`http://localhost:8080/chatRecord/${chatroomId}`)
        .then((response) => {
          console.log(response.data);
          setChatting(response.data);
        });
    };
    chatRecord(setChatting);
    chatroomInfo();
  }, []);

  console.log(chatroomName);
  console.log(headCount);

  //채팅방 이름수정
  const onUserUpdate = () => {
    const chatroomName = document.getElementById('chatroomName');

    axios
      .put(`http://localhost:8080/updateroom/${chatroomId}`, {
        chatroomName: chatroomName.value,
        headCount: headCount,
      })
      .then((response) => {
        console.log(response.data);
      });
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
  const onExitRoom = () => {
    console.log(chatroomId);
    console.log(empId);
    axios
      .delete(`http://localhost:8080/deleteroom/${chatroomId}/${empId}`)
      .then((response) => {
        console.log(response.data);
      });
  };

  {
    empinfo &&
      empinfo.map((data) => {
        console.log(data.empId.empName);
        return {};
      });
  }

  return (
    <>
      <div className="header-title-container">
        <h3>{chatroomName}</h3>
      </div>
      <div>
        {empinfo &&
          empinfo.map((data) => {
            console.log(data.empId.empName);
            return <div>{data.empId.empName}</div>;
          })}
      </div>

      <br />
      {/* 채팅방에서 사원초대하기 */}
      {/* <div>
        <input id="empId" placeholder="초대할 사원의 사번을 입력하세요" />
        <button onClick={onUserAdd}>사원초대하기</button>
      </div> */}
      {/* 채팅방 나가기 */}
      <div>
        <Link to={'/chatroom'} onClick={() => onExitRoom(chatroomId, empId)}>
          나가기
        </Link>
      </div>
      {/* 채팅방 인원수 & 이름수정 */}
      <div>
        <hr />
        <input
          id="chatroomName"
          placeholder="수정할 채팅방의 이름을 입력하세요"
          defaultValue={chatroomName}
        />
        <br />
        <button onClick={onUserUpdate}>수정하기</button>
      </div>

      <div>{/* <button onClick={onUserAdd}>수정하기</button> */}</div>
      <br />
      <Link to={'/chatroom'}>채팅목록 이동</Link>
      <br />
      <br />
      <div style={{ border: '1px solid black', margin: '5px' }}>
        {/* 채팅기록을 가져옴 */}
        {chatting.map((msg, index) => {
          return (
            <div key={index}>
              {msg.employee.empId === empInfo.empId ? (
                <div className={styles.message}>
                  {msg.chatTime}
                  {msg.chatContent}
                </div>
              ) : (
                <div className={styles.othermessage}>
                  {msg.employee.empName}
                  {msg.chatTime}
                  {msg.chatContent}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.scroll}>
        <div className={styles.contain}>
          {/* chatting내용 사용자에 따라 배치 */}
          {input.length !== 0 &&
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
                    <div className={styles.othermessage}>
                      {nowTime}
                      {chat.chatContent}
                    </div>
                  )}
                  <br />
                </div>
              );
            })}
        </div>

        <div className={styles.inputmain}>
          <input className={styles.inputform} ref={inputRef}></input>
          <button
            className={styles.inputbutton}
            onClick={() => {
              inputRef.current.value && send();
              inputRef.current.focus();
              inputRef.current.value = '';
            }}>
            보내기
          </button>
        </div>
      </div>
    </>
  );
}
export default Chat;
