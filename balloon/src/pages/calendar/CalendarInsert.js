import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { insertSchedule, insertSchedulList } from '../../context/CalendarAxios';
import styles from '../../css/Component.module.css';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/esm/locale';
import {
  getEmpListInSameUnit,
  selectEmployeeByEmpId,
} from '../../context/EmployeeAxios';
import { BsCalendarWeek } from 'react-icons/bs';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from 'axios';

function CalendarInsert({ style, openInsert, setOpenInsert, empInfo }) {
  const handleClose = () => setOpenInsert(false);
  const [startValue, setStartValue] = useState(new Date());
  const [endvalue, setEndValue] = useState(new Date());
  const [eList, setCEList] = useState([]);
  const [inviteSchedule, setInviteSchedule] = useState([]);
  const empId = empInfo.empId;
  const scheduleListAdd = [];
  //일정보내기
  const sock = new SockJS('http://localhost:8080/chatstart');
  const client = Stomp.over(sock);
  const [input, setInput] = useState([]);

  client.connect({}, () => {
    client.subscribe(`/topic/message`, (data) => {
      const chat = JSON.parse(data.body);
      setInput([...input, chat]);
      disconnect();
    });
  });

  const disconnect = () => {
    client.disconnect();
  };

  const onInviteSchedule = (checked, data) => {
    if (checked) {
      setInviteSchedule([...inviteSchedule, data]);
      console.log(inviteSchedule);
    } else {
      setInviteSchedule(inviteSchedule.filter((button) => button !== data));
    }
  };

  //채팅방 만들기

  const onSchCreateChatroom = (inviteSchedule) => {
    inviteSchedule.pop(empId);
    console.log(inviteSchedule);
    let arr = [];
    inviteSchedule.map(() => {
      arr.push({
        chatroomName: '일정봇',
        headCount: 2,
      });
    });
    axios
      .post('http://localhost:8080/createSchChatroom', arr)
      .then((response) => {
        console.log(response.data);
        onSchUserInvite(response.data, inviteSchedule);
      });
    return arr;
  };

  //chatroomEmployee T에 값넣고 채팅보내는 부분

  const onSchUserInvite = (add, inviteSchedule) => {
    add.sort();
    console.log(add);
    // add.map((data, index) => {
    // data.then((test) => {
    //   console.log(test[index]);
    add.map((data, index) => {
      console.log(data);
      inviteSchedule &&
        axios
          .post(
            `http://localhost:8080/insertSch/${data.chatroomId}`,
            {
              empId: {
                empId: inviteSchedule[index],
              },
            },
            // inviteSchedule.map((data) => {
            // const sendSchedule = () => {

            //
            client.send(
              '/app/chat/message',
              {},
              JSON.stringify({
                chatroomId: data.chatroomId,
                writer: inviteSchedule[index],
                chatContent: '새로운 일정이 등록되었습니다. 확인하세요',
              })
            )

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
    });
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
    // const inputData = invite.map(input=>)
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

    console.log(scheduleListAdd);

    insertSchedulList(scheduleListAdd, setOpenInsert);

    //일정등록 후 알림보내기
    onSchCreateChatroom(inviteSchedule);

    // add.map((data) => {
    //   data.then((test) => {
    //     console.log(test);
    //   });
    // });
  };

  useEffect(() => {
    getEmpListInSameUnit(empId, setCEList);
    // setInvite();
    console.log(eList);
    // console.log(empId);
  }, []);
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* <DateTimePicker
            label="시작일"
            value={startValue + 1}
            type="datetime-local"
            inputFormat={'yyyy/MM/dd  HH:mm'}
            locale={ko}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          /> */}
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
        </LocalizationProvider>
        <span className={styles.centerfont}> : </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* <DateTimePicker
            label="끝나는일"
            type="datetime-local"
            value={endvalue}
            inputFormat={'yyyy/MM/dd  HH:mm'}
            locale={ko}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          /> */}
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
        </LocalizationProvider>
        {eList.map((emp, index) => {
          return (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <input
                type="checkbox"
                onChange={(e) => {
                  onInviteSchedule(e.currentTarget.checked, emp.empId);
                }}
                checked={inviteSchedule.includes(emp.empId) ? true : false}
              />
              <p>{emp.empName}</p>
              {emp.position}
            </Typography>
          );
        })}

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
