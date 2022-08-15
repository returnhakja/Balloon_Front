import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { insertSchedule } from '../../context/CalendarAxios';
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
import { margin } from '@mui/system';

function CalendarInsert({ style, openInsert, setOpenInsert, empInfo }) {
  const handleClose = () => setOpenInsert(false);
  const [startValue, setStartValue] = useState(new Date());
  const [endvalue, setEndValue] = useState(new Date());
  const [eList, setCEList] = useState([]);
  const [invite, setInvite] = useState([]);
  const empId = empInfo.empId;

  const insertHandle = () => {
    const scheduletitle = document.getElementById('scheduletitle').value;
    const CalendarContent = document.getElementById('CalendarContent').value;
    const CalendarLocation = document.getElementById('CalendarLocation').value;
    invite.push(empId);
    console.log(invite);
    // const inputData = invite.map(input=>)
    const inputdata = {
      scheduleTitle: scheduletitle,
      scheduleStart: startValue,
      scheduleEnd: endvalue,
      empName: empInfo.empName,
      scheduleMemo: CalendarContent,
      scheduleLocation: CalendarLocation,
      employee: { empId: empInfo.empId },
      employeeIds: invite,
    };
    insertSchedule(inputdata, setOpenInsert);
    // invite(inputdata);
  };
  useEffect(() => {
    getEmpListInSameUnit(empId, setCEList);
    // setInvite();
    console.log(eList);
    // console.log(empId);
  }, []);

  const onInvite = (checked, data) => {
    if (checked) {
      setInvite([...invite, data]);
      console.log(invite);
    } else {
      setInvite(invite.filter((button) => button !== data));
    }
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="시작일"
            value={startValue + 1}
            type=" date"
            inputFormat={'yyyy/MM/dd  HH:mm'}
            locale={ko}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <span className={styles.centerfont}> : </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="끝나는일"
            value={endvalue}
            inputFormat={'yyyy/MM/dd  HH:mm'}
            locale={ko}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        {eList.map((emp, index) => {
          return (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <input
                type="checkbox"
                onChange={(e) => {
                  onInvite(e.currentTarget.checked, emp.empId);
                }}
                checked={invite.includes(emp.empId) ? true : false}
              />
              {emp.empName}
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
        <Button onClick={insertHandle} sx={{ fontSize: 30, border: 1, mt: 1 }}>
          등록
        </Button>
      </Box>
    </Modal>
  );
}

export default CalendarInsert;
