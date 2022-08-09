import { useRef, useState } from 'react';
import './Header.css';
import SockJS from 'sockjs-client';
import Stomp, { client } from 'stompjs';
import './Chat.css';

function Chat() {
  const chatroomId = new URL(document.location).searchParams.get('room');
  // input에 저장해야하는것은 채팅내용과 작성자를 객체형태로 만들어서 배열로 저장

  const [input, setInput] = useState([]);
  const inputRef = useRef();
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (chatDTO) => {
      const chat = JSON.parse(chatDTO.body);
      setInput([...input, chat.chatContent]);
      disconnect();
    });
  });
  const disconnect = () => {
    client.disconnect();
  };

  const send = () => {
    console.log('sending');
    client.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        chatroomId: chatroomId,
        writer: 'A0000005',
        chatContent: inputRef.current.value,
      })
    );
  };

  return (
    <>
      <div className="header-title-container">
        <h3>balloon의 채팅앱</h3>
      </div>
      <div className="scroll">
        <div className="contain">
          {input.map((word, index) => {
            return (
              <>
                <span className="message" key={index}>
                  {word}
                </span>
                <br />
              </>
            );
          })}
        </div>
        <div className="input-main">
          <input className="input-form" ref={inputRef}></input>
          <button
            className="input-button"
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
