import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { insertSchedule } from '../../context/CalendarAxios';
import styles from '../../css/Component.module.css';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
<<<<<<< HEAD:balloon/src/pages/CelendarInsert.js
import styles from '../css/Component.module.css';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';

function CelendarInsert({ style, open, setOpen }) {
  const [empInfo, setEmpInfo] = useOutletContext();
=======
import { ko } from 'date-fns/esm/locale';
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarInsert.js

function CalendarInsert({ style, open, setOpen, empInfo }) {
  const handleClose = () => setOpen(false);
  const [startValue, setStartValue] = useState(new Date());
  const [endvalue, setEndValue] = useState(new Date());

  const insertHandle = () => {
    const scheduletitle = document.getElementById('scheduletitle').value;
    const CalendarContent = document.getElementById('CalendarContent').value;
    const CalendarLocation = document.getElementById('CalendarLocation').value;

    const inputdata = {
      scheduleTitle: scheduletitle,
      scheduleStart: startValue,
      scheduleEnd: endvalue,
      empName: empInfo.empName,
      scheduleMemo: CalendarContent,
      scheduleLocation: CalendarLocation,
      employee: { empId: empInfo.empId },
    };

<<<<<<< HEAD:balloon/src/pages/CelendarInsert.js
    const data = async () => {
      const response = await axios.post(
        `http://localhost:8080/api/cal/insert`,
        inputdata,
        {
          headers,
        }
      );
      setOpen(false);
      window.location.href = '/calendar';
    };
    data();
=======
    insertSchedule(inputdata, setOpen);
    window.location.href = '/calendar';
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarInsert.js
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{ mb: 2, mt: 2, color: 'red' }}>
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
          variant="h4"
          component="h2"
          sx={{ mb: 2, mt: 2 }}>
          일정
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="시작일"
            value={startValue + 1}
            type=" date"
            inputFormat={'yyyy-MM-dd'}
            locale={ko}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <span className={styles.centerfont}> : </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="끝나는일"
            value={endvalue}
            inputFormat={'yyyy-MM-dd'}
            locale={ko}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          같은부서 사원을 찾을 수 있는 그걸 만들어야하는데 몰라서 일딴 텍스트
        </Typography>

        <Typography
          id="modal-modal-description"
          variant="h4"
          sx={{ mt: 2, mb: 2 }}>
          MEMO
        </Typography>

        <TextField
          required
          id="CalendarContent"
          label="메모 입력"
          sx={{ width: '100%' }}
        />

        <Typography
          id="modal-modal-description"
          variant="h4"
          sx={{ mt: 2, mb: 2 }}>
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
