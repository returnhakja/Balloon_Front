import axios from 'axios';

//ChatRoom.js
//마지막으로 보낸 채팅list가져오기
export const onChatroom = async (setChatroom, empId) => {
  axios.get(`http://localhost:8080/allChat/${empId}`).then((response) => {
    setChatroom(response.data);
    console.log(response.data);
  });
};

//채팅방 나가기
export const onDeleteRoom = async (chatroomId) => {
  axios
    .delete(`http://localhost:8080/deleteChatroom/${chatroomId}`)
    .then((response) => console.log(response.data));
};

//////////////////////////////////////////////////////
//CreateRoom.js
//채팅방 만들기
export const onCreateChatroom = async (
  empInfo,
  setRoomId,
  invite,
  chatroomName
) => {
  invite.push(empInfo);
  axios
    .post('http://localhost:8080/createChatroom', {
      chatroomName: chatroomName.value,
      headCount: invite.length,
    })
    .then((response) => {
      console.log(response.data);
      setRoomId(response.data);
    });
};

//chatroomEmployee T에 초대할 사람과 초대한 사람 넣어주기
export const onUserInvite = async (chatroomId, invite, client) => {
  invite &&
    axios
      .post(
        `http://localhost:8080/insertChatEmp/${chatroomId}`,
        invite.map((data) => {
          const inviteEnter = () => {
            client.send(
              '/app/chat/message',
              {},
              JSON.stringify({
                chatroomId: chatroomId,
                writer: data.empId,
                chatContent: data.empName + '님이 입장하셨습니다',
              })
            );
          };
          inviteEnter();
          return {
            empId: {
              empId: data.empId,
            },
          };
        })
      )
      .then((response) => {
        console.log(response.data);
      });
};

//////////////////////////////////////////////////////
//Chat.js
//chatroomEmployee T에 chatroomId로 사원정보 가져오기
export const empIdInfo = async (chatroomId, setChatempinfo) => {
  axios
    .get(`http://localhost:8080/oneChatEmp/${chatroomId}`)
    .then((response) => {
      setChatempinfo(response.data);
    });
};

//이전에 채팅했던 기록보이게
export const chatRecord = async (chatroomId, setChatting) => {
  axios
    .get(`http://localhost:8080/chatRecord/${chatroomId}`)
    .then((response) => {
      setChatting(response.data);
    });
};

//채팅방에 있는 사원들의 이름과 인원수 가져오기
export const chatroomInfo = async (
  chatroomId,
  setChatroomName,
  setHeadCount
) => {
  axios
    .get(`http://localhost:8080/oneChatroom/${chatroomId}`)
    .then((response) => {
      console.log(response.data.chatroomName);
      setChatroomName(response.data.chatroomName);
      setHeadCount(response.data.headCount);
    });
};

//채팅방이름 수정
export const onUserUpdate = async (chatroomId, chatroomName, headCount) => {
  axios
    .put(`http://localhost:8080/updateroom/${chatroomId}`, {
      chatroomName: chatroomName.value,
      headCount: headCount,
    })
    .then((response) => {
      console.log(response.data);
    });
};

//채팅방에서 혼자나가기
export const onExitRoom = async (chatroomId, empId, sendExit) => {
  axios
    .delete(`http://localhost:8080/deleteroom/${chatroomId}/${empId}`)
    .then((response) => {
      console.log(response.data);
    });
  sendExit();
};
