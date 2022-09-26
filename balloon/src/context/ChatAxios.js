import axios from 'axios';
import moment from 'moment';

//채팅방 입장시간
const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
let data = 'T';
let inTime = [nowTime.slice(0, 10), data, nowTime.slice(10)].join('');
let inTime2 = inTime.replace(/(\s*)/g, '');

//ChatRoom.js
//마지막으로 보낸 채팅list가져오기
export const onChatroom = async (setChatroom, empId) => {
  axios
    .get(`/chat/allchat/${empId}`)
    .then((response) => {
      setChatroom(response.data);
    })
    .catch((error) => console.log(error));
};

//headCount가 0일 때 채팅방 삭제
export const onDeleteRoom = async (chatroomId) => {
  axios
    .delete(`/chatroom/deletechatroom/${chatroomId}`)
    .catch((error) => console.log(error));
};

//////////////////////////////////////////////////////
//CreateRoom.js
//채팅방 만들기
export const onCreateChatroom = async (
  empInfo,
  invite,
  chatroomName,
  client,
  setChatStatus,
  setRoomId
) => {
  invite.push(empInfo);
  axios
    .post('/chatroom/createchatroom', {
      chatroomName: chatroomName.value,
      headCount: invite.length,
    })
    .then((response) => {
      setRoomId(response.data);
      onUserInvite(response.data, invite, client);
      setChatStatus('chatList');
    })
    .catch((error) => console.log(error));
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
            inTime: inTime2,
          };
        })
      )
      .then(() => console.log('=================='))
      .catch((error) => console.log(error));
};

// 이미 일정봇과 채팅방이 존재하는 사원 찾기
export const botChatroom = async (inviteSchedule, setBotRoom) => {
  axios.post(`/cre/schbotchatroom`, inviteSchedule).then((response) => {
    setBotRoom(response.data);
  });
};

// 이미 결재봇과 채팅방이 존재하는 사원 찾기
export const botApvlChatroom = async (firstApvlPeople, setBotApvlRoom) => {
  axios.post(`/cre/apvlbotchatroom`, firstApvlPeople).then((response) => {
    setBotApvlRoom(response.data);
  });
};

// 이미 결재봇과 채팅방이 존재하는 사원 찾기
export const botApvlChatroom2 = async (ApvlPeople, setBotApvl) => {
  axios.post(`/cre/apvlbotchatroom`, ApvlPeople).then((response) => {
    setBotApvl(response.data);
  });
};

// 채팅방인원이 2명인 정보 가져오기
export const onAllChatEmp = async (setAllChatEmp, empId) => {
  axios
    .get(`/cre/allchatemp/${empId}`)
    .then((response) => setAllChatEmp(response.data));
};

//////////////////////////////////////////////////////
//Chat.js
//chatroomEmployee T에 chatroomId로 사원정보 가져오기
export const empIdInfo = async (chatroomId, setChatempinfo) => {
  axios
    .get(`/cre/onechatemp/${chatroomId}`)
    .then((response) => {
      setChatempinfo(response.data);
    })
    .catch((error) => console.log(error));
};

//이전에 채팅했던 기록보이게
export const chatRecord = async (chatroomId, setChatting, empId) => {
  await axios
    .get(`/chat/chatrecord/${chatroomId}/${empId}`)
    .then((response) => {
      setChatting(response.data);
    })
    .catch((error) => console.log(error));
};

//채팅방에 있는 사원들의 이름과 인원수 가져오기
export const chatroomInfo = async (
  chatroomId,
  setChatroomName,
  setHeadCount
) => {
  axios
    .get(`/chatroom/onechatroom/${chatroomId}`)
    .then((response) => {
      setChatroomName(response.data.chatroomName);
      setHeadCount(response.data.headCount);
    })
    .catch((error) => console.log(error));
};

//채팅방이름 수정
export const onUserUpdate = async (chatroomId, chatroomName, headCount) => {
  await axios
    .put(`/chatroom/updatechatroom/${chatroomId}`, {
      chatroomName: chatroomName,
      headCount: headCount,
    })
    .catch((error) => {
      console.log(error);
    });
};

//채팅방인원수 -
export const onHCupdate = async (chatroomId, chatroomName, headCount) => {
  axios
    .put(`/chatroom/updatechatroom/${chatroomId}`, {
      chatroomName: chatroomName,
      headCount: headCount - 1,
    })
    .catch((error) => console.log(error));
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
  axios
    .put(`/chatroom/updatechatroom/${chatroomId}`, {
      chatroomName: chatroomName,
      headCount: headCount + invite.length,
    })
    .catch((error) => console.log(error));
};

//채팅방에서 혼자나가기
export const onExitRoom = async (chatroomId, empId) => {
  axios.delete(`/cre/deleteroom/${chatroomId}/${empId}`).catch((error) => {
    console.log(error);
  });
};

//////////////////////////////////////////////////////
//CalendarInsert.js

//일정봇chatroomEmployee T에 새로운 값넣고 채팅보내는 부분
export const onSchUserInvite = async (
  add,
  invitepeople,
  client,
  calendarBot,
  newBotroomMsg,
  botroomMsg
) => {
  add.map((add, index) => {
    console.log(add.chatroomId);
    axios
      .post(`/cre/insertchatemp/${add.chatroomId}`, [
        {
          empId: {
            empId: invitepeople[index],
          },
          inTime: inTime2,
        },
        {
          empId: {
            empId: calendarBot,
          },
          inTime: inTime2,
        },
      ])
      .then((response) => {
        console.log(response.data);
      });
  });
  newBotroomMsg(client);
  botroomMsg(add, client);
};

//일정봇채팅방 만들기
export const onSchCreateChatroom = async (
  invitepeople,
  client,
  calendarBot,
  newBotroomMsg,
  botroomMsg
) => {
  let arr = [];
  invitepeople.map(() => {
    arr.push({
      chatroomName: '일정봇',
      headCount: 1,
    });
  });
  axios.post('/chatroom/createschchatroom', arr).then((response) => {
    onSchUserInvite(
      response.data,
      invitepeople,
      client,
      calendarBot,
      newBotroomMsg,
      botroomMsg
    );
  });
  return arr;
};

////////////////////////////////////
// BusinessRepost.js
// BusinessTrip.js
// PersonnelAppointment.js
export const onApvlUserInvite = async (
  add,
  newApvlPeople,
  client,
  approverBot,
  AlreadyBotroomMsg,
  botroomMsg
) => {
  add.map((add, index) => {
    axios
      .post(`/cre/insertchatemp/${add.chatroomId}`, [
        {
          empId: {
            empId: newApvlPeople[index],
          },
          inTime: inTime2,
        },
        {
          empId: {
            empId: approverBot,
          },
          inTime: inTime2,
        },
      ])
      .then((response) => {
        console.log(response.data);
      });
  });
  AlreadyBotroomMsg(client);
  botroomMsg(add, client);
};

export const onApvlCreateChatroom = async (
  newApvlPeople,
  client,
  approverBot,
  AlreadyBotroomMsg,
  botroomMsg
) => {
  let add = [];
  newApvlPeople.map(() => {
    add.push({
      chatroomName: '결재봇',
      headCount: 1,
    });
  });
  axios.post('/chatroom/createschchatroom', add).then((response) => {
    onApvlUserInvite(
      response.data,
      newApvlPeople,
      client,
      approverBot,
      AlreadyBotroomMsg,
      botroomMsg
    );
  });
  return add;
};
