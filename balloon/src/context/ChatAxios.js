import axios from 'axios';

//ChatRoom.js
//마지막으로 보낸 채팅list가져오기
export const onChatroom = async (setChatroom, empId) => {
  axios.get(`/chat/allchat/${empId}`).then((response) => {
    setChatroom(response.data);
    // console.log(response.data);
    console.log('chatroom');
  });
};

//채팅방 삭제
export const onDeleteRoom = async (chatroomId) => {
  axios
    .delete(`/chatroom/deletechatroom/${chatroomId}`)
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
    .post('/chatroom/createchatroom', {
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
        `/cre/insertchatemp/${chatroomId}`,
        invite.map((data) => {
          const inviteEnter = () => {
            client.send(
              '/app/chat/message',
              {},
              JSON.stringify({
                chatroomId: chatroomId,
                writer: data,
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

// 채팅방인원이 2명인 정보 가져오기
export const onAllChatEmp = async (setAllChatEmp) => {
  axios.get('/cre/allchatemp').then((response) => setAllChatEmp(response.data));
};

//////////////////////////////////////////////////////
//Chat.js
//chatroomEmployee T에 chatroomId로 사원정보 가져오기
export const empIdInfo = async (chatroomId, setChatempinfo) => {
  axios.get(`/cre/onechatemp/${chatroomId}`).then((response) => {
    setChatempinfo(response.data);
  });
};

//이전에 채팅했던 기록보이게
export const chatRecord = async (chatroomId, setChatting) => {
  axios.get(`/chat/chatrecord/${chatroomId}`).then((response) => {
    setChatting(response.data);
  });
};

//채팅방에 있는 사원들의 이름과 인원수 가져오기
export const chatroomInfo = async (
  chatroomId,
  setChatroomName,
  setHeadCount
) => {
  axios.get(`/chatroom/onechatroom/${chatroomId}`).then((response) => {
    console.log(response.data.chatroomName);
    setChatroomName(response.data.chatroomName);
    setHeadCount(response.data.headCount);
  });
};

//채팅방이름 수정
export const onUserUpdate = async (chatroomId, chatroomName, headCount) => {
  console.log(chatroomId, chatroomName, headCount);
  await axios
    .put(`/chatroom/updatechatroom/${chatroomId}`, {
      chatroomName: chatroomName,
      headCount: headCount,
    })
    .then((response) => {
      console.log(response.data);
    });
};

//채팅방인원수 -
export const onHCupdate = async (chatroomId, chatroomName, headCount) => {
  axios.put(`/chatroom/updatechatroom/${chatroomId}`, {
    chatroomName: chatroomName,
    headCount: headCount - 1,
  });
  if (headCount - 1 === 0) {
    onDeleteRoom(chatroomId);
  }
};
//이미 생성된 채팅방에서 인원수 +
export const onHCInvite = async (
  chatroomId,
  chatroomName,
  headCount,
  invite
) => {
  axios.put(`/chatroom/updatechatroom/${chatroomId}`, {
    chatroomName: chatroomName,
    headCount: headCount + invite.length,
  });
};

//채팅방에서 혼자나가기
export const onExitRoom = async (chatroomId, empId) => {
  axios.delete(`/cre/deleteroom/${chatroomId}/${empId}`).then((response) => {
    console.log(response.data);
  });
};
