import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatStomp() {
//   const sock = new SockJS('http://localhost:8080/chatstart');
  const sock = new SockJS('http://54.180.148.125:8080/chatstart');
  const client = Stomp.over(sock);
//   client.debug = null;

  return client;
}
export default ChatStomp;
