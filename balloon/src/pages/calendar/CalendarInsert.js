import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { insertSchedule, insertSchedulList } from '../../context/CalendarAxios';
import styles from '../../css/Component.module.css';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import {
  getEmpByEmpId,
  getEmpListInSameUnit,
  setEmpInfoByEmpId,
} from '../../context/EmployeeAxios';
import { BsCalendarWeek } from 'react-icons/bs';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

function CalendarInsert({ style, openInsert, setOpenInsert, empInfo }) {
  const [startValue, setStartValue] = useState();
  const [endvalue, setEndValue] = useState();
  const [eList, setCEList] = useState([]);
  const [botInfo, setBotInfo] = useState([]);
  const [inviteSchedule, setInviteSchedule] = useState([]);
  const empId = empInfo.empId;
  const scheduleListAdd = [];

  const handleClose = () => {
    setOpenInsert(false);
    window.location.href = '/calendar';
  };

  //사원추가 모달을 위한 open
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleListClose = () => {
    setInviteSchedule([]);
    setOpen(false);
  };

  const handleempAddClose = () => {
    if (inviteSchedule == 0) {
      alert('사원을 추가 해 주세요');
    } else {
      // console.log(inviteSchedule);
      botChatroom();
      setOpen(false);
    }
  };

  //일정보내기
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);
  // const [input, setInput] = useState([]);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      console.log(chat);
      // setInput([...input, chat]);
      // console.log(input);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  const onInviteSchedule = (checked, data) => {
    if (checked) {
      setInviteSchedule([...inviteSchedule, data]);
    } else {
      setInviteSchedule(inviteSchedule.filter((button) => button !== data));
    }
  };

  const insertHandle = () => {
    const scheduletitle = document.getElementById('scheduletitle').value;
    const CalendarContent = document.getElementById('CalendarContent').value;
    const CalendarLocation = document.getElementById('CalendarLocation').value;
    const Startvalue = document.getElementById('startvalue').value;
    const endvalue = document.getElementById('endvalue').value;

    inviteSchedule.push(empId);
    console.log(inviteSchedule);
    console.log(Startvalue);

    const inputdata = {
      scheduleTitle: scheduletitle,
      scheduleStart: Startvalue,
      scheduleEnd: endvalue,
      empName: empInfo.empName,
      scheduleMemo: CalendarContent,
      scheduleLocation: CalendarLocation,
      employee: { empId: empInfo.empId },
      employeeIds: inviteSchedule,
    };

    // insertSchedule(inputdata, setOpenInsert);

    const ids = inputdata.employeeIds;
    console.log(inputdata.employeeIds);
    ids.map((id) => {
      scheduleListAdd.push({
        scheduleTitle: inputdata.scheduleTitle,
        scheduleStart: inputdata.scheduleStart,
        scheduleEnd: inputdata.scheduleEnd,
        empName: inputdata.empName,
        scheduleMemo: inputdata.scheduleMemo,
        scheduleLocation: inputdata.scheduleLocation,
        employee: { empId: id },
      });
    });

    // console.log(scheduleListAdd);

    insertSchedulList(scheduleListAdd, setOpenInsert);

    //일정등록 후 알림보내기
    onSchCreateChatroom(invitepeople);
  };

  useEffect(() => {
    getEmpListInSameUnit(empId, setCEList);
    getEmpByEmpId(calendarBot, setBotInfo);
    // setInvite();
    // console.log(eList);
    // console.log(empId);
  }, []);

  const [botRoom, setBotRoom] = useState([]);
  const botChatroom = () => {
    axios.post(`/api/botChatroom`, inviteSchedule).then((response) => {
      console.log(response.data);
      setBotRoom(response.data);
    });
  };
  // console.log(inviteSchedule);
  // console.log(botRoom);

  const botroomExist = [];
  const botroomId = [];
  // let invitepeople = [];
  console.log(botRoom);
  botRoom.map((data) => {
    console.log(data.empId.empId);
    botroomExist.push(data.empId.empId);
    botroomId.push(data.chatroomId.chatroomId);
    // invitepeople = inviteSchedule.filter((people) => {
    //   if (people !== data.empId.empId) {
    //     return people;
    //   }
    // });
    // inviteSchedule.filter((result) => {
    //   if (result !== data.empId.empId) {
    //     return result;
    //   }
    //   console.log(result);
    // });
  });
  console.log(botroomExist);
  console.log(botroomId);
  // console.log(invitepeople);
  // let value;
  // value = inviteSchedule.filter((result, index) => {
  //   if (result === botroomExist[index]) {
  //     return result;
  //   }
  //   console.log(result);
  // });
  // console.log(value);

  // if (botRoom.length === 0) {
  //   value = inviteSchedule;
  // } else {
  //   botRoom.map((data) => {
  //     botroomExist.push(data.empId.empId);
  //     botroomId.push(data.chatroomId.chatroomId);
  //     value = inviteSchedule.filter((result) => {
  //       if (result !== data.empId.empId) {
  //         return result;
  //       }
  //     });
  //     console.log(value);
  //   });
  // }
  // console.log(value);

  // let invitepeople = inviteSchedule.filter((people, index) => {
  //   if (people !== botroomExist[index]) {
  //     return people;
  //   }
  // });
  // console.log(invitepeople);

  let invitepeople;
  invitepeople = inviteSchedule.filter(
    (people) => !botroomExist.includes(people)
  );
  console.log(invitepeople);

  //채팅방 만들기
  const calendarBot = 'Y0000001';
  // const [botExist, setBotExist] = useState([]);
  const onSchCreateChatroom = (invitepeople) => {
    // invitepeople.pop();
    // console.log(invitepeople);
    // console.log(value);

    // value = value.filter((valueData) => {
    //   if (valueData !== empId) {
    //     return valueData;
    //   }
    // });

    let arr = [];
    invitepeople.map(() => {
      arr.push({
        chatroomName: '일정봇',
        headCount: 2,
      });
    });
    axios.post('/api/createSchChatroom', arr).then((response) => {
      console.log(response.data);
      onSchUserInvite(response.data, invitepeople);
    });
    // botroomMsg();
    return arr;
  };

  //chatroomEmployee T에 값넣고 채팅보내는 부분

  const onSchUserInvite = (add, invitepeople) => {
    console.log(add);
    // add.map((data, index) => {
    // data.then((test) => {
    // console.log(test[index]);
    add.map((ad, index) => {
      console.log(ad);
      axios
        .post(
          `api/insertChatEmp/${ad.chatroomId}`,
          [
            {
              empId: {
                empId: invitepeople[index],
              },
            },
            {
              empId: {
                empId: calendarBot,
              },
            },
          ],

          client.send(
            '/app/chat/message',
            {},
            JSON.stringify({
              chatroomId: ad.chatroomId,
              writer: botInfo,
              chatContent: '새로운 일정이 등록되었습니다. 확인하세요',
            })
          )

          // inviteSchedule.map((data) => {
          // const sendSchedule = () => {

          //
          // };
          // sendSchedule();
          // return {
          //   empId: {
          //     empId: inviteSchedule[index],
          //   },
          // };
          // })
        )
        .then((response) => {
          console.log(response.data);
        });
      botroomMsg();
    });
  };

  console.log(botroomId);
  const botroomMsg = () => {
    botroomId.map((id) => {
      console.log(id);
      client.send(
        '/app/chat/message',
        {},
        JSON.stringify({
          chatroomId: id,
          writer: botInfo,
          chatContent: '새로운 일정이 등록되었습니다. 확인하세요',
        })
      );
    });

    console.log(scheduleListAdd);

    insertSchedulList(scheduleListAdd, setOpenInsert);

    //일정등록 후 알림보내기
    onSchCreateChatroom(inviteSchedule);

    window.location.href = '/calendar';
  };

  return (
    <Modal
      open={openInsert}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h4"
          sx={{ mb: 2, mt: 2, color: '#00AAFF' }}>
          <BsCalendarWeek className={styles.icon} />
          <span>일정 등록</span>
          <hr />
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          sx={{ mb: 2, mt: 2 }}>
          일정 제목
        </Typography>
        <TextField
          required
          id="scheduletitle"
          label="일정 제목을 입력하세요"
          sx={{ width: '100%' }}
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          sx={{ mb: 2, mt: 2 }}>
          날짜 선택
        </Typography>
        <TextField
          id="startvalue"
          label="시작일"
          type="datetime-local"
          defaultValue={startValue}
          onChange={(newValue) => {
            setStartValue(newValue);
          }}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <span className={styles.centerfont}> : </span>
        <TextField
          id="endvalue"
          label="끝나는 일"
          type="datetime-local"
          defaultValue={endvalue}
          sx={{ width: 250 }}
          onChange={(newValue) => {
            setEndValue(newValue);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <Button onClick={handleOpen}>사원추가</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description">
          <Box sx={{ ...style, width: 400 }}>
            {eList.map((emp, index) => {
              return (
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  key={index}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      console.log(e);
                      onInviteSchedule(e.currentTarget.checked, emp.empId);
                      // console.log(e);
                    }}
                    checked={inviteSchedule.includes(emp.empId) ? true : false}
                  />
                  {emp.empName}
                  {emp.position}{' '}
                </Typography>
              );
            })}
            <br />
            <Button onClick={handleListClose}>취소하기</Button>
            <Button onClick={handleempAddClose}>추가하기</Button>
            {/* <ChildModal /> */}
          </Box>
        </Modal>

        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          MEMO
        </Typography>
        <TextField
          required
          id="CalendarContent"
          label="메모 입력"
          sx={{ width: '100%' }}
        />
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          장소
        </Typography>
        <TextField
          required
          id="CalendarLocation"
          label="장소 입력"
          sx={{ mt: 1, width: '100%' }}
        />
        <Button
          onClick={handleClose}
          sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
          취소
        </Button>
        {/* 채팅방만드는 부분 */}
        <Button
          onClick={() => {
            insertHandle();
          }}
          sx={{ fontSize: 30, border: 1, mt: 1 }}>
          등록
        </Button>
      </Box>
    </Modal>
  );
}

export default CalendarInsert;
