import { useEffect, useState } from 'react';
import styles from '../../css/Component.module.css';
import axios from 'axios';
import { deletehandle } from '../../context/CalendarAxios';
import {
  Box,
  Button,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useOutletContext } from 'react-router-dom';
import { BsCalendarWeek } from 'react-icons/bs';
import { ko } from 'date-fns/esm/locale';

function CalendarUpdate({ style, openUpdate, setOpenUpdate }) {
  console.log('sssss');
  console.log(style);
  console.log(openUpdate);
  console.log(setOpenUpdate);
  const handleClose = () => setOpenUpdate(false);

  const [list, setList] = useState([]);
  const [startValue, setStartValue] = useState(list.scheduleStart);
  const [endvalue, setEndValue] = useState(list.scheduleEnd);
  console.log(list.scheduleStart);
  const [empInfo, setEmpInfo] = useOutletContext();

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = async (list) => {
      const response = await axios
        .get(`/api/cal/all/${openUpdate.scheduleId}`, headers)

        .then((response) => {
          setList(response.data);
        });
    };

    data();
    console.log();
    console.log(empInfo);
  }, []);

  useEffect(() => {
    setStartValue(list.scheduleStart);
    setEndValue(list.scheduleEnd);
  }, [list]);

  //업데이트
  const updateHandle = () => {
    const scheduletitle = document.getElementById('scheduletitle').value;
    const CalendarContent = document.getElementById('CalendarContent').value;
    const CalendarLocation = document.getElementById('CalendarLocation').value;

    const inputdata = {
      scheduleId: list.scheduleId,
      scheduleTitle: scheduletitle,
      scheduleStart: startValue,
      scheduleEnd: endvalue,
      empName: empInfo.empName,
      scheduleMemo: CalendarContent,
      scheduleLocation: CalendarLocation,
      empId: { empId: empInfo.empId },
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = async (inputdata) => {
      await axios
        .put('/api/cal/update', inputdata, {
          headers,
        })
        .catch((err) => console.log(err));
      setOpenUpdate(false);
      window.location.href = '/calendar';
    };
    data(inputdata);
  };

  const deletehandle1 = async () => {
    console.log(openUpdate.scheduleId);

    await axios
      .delete(`http://localhost:8080/api/cal/delete/${openUpdate.scheduleId}`)

      .then(() => {
        handleClose(false);
      })
      .catch((err) => console.log(err));

    // window.location.href = '/calendar';
  };

  console.log(list);
  return (
    <Modal
      open={openUpdate}
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
          <span>일정 보기</span>
          <hr />
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          sx={{ mb: 2, mt: 2, color: 'red' }}>
          일정 제목
        </Typography>
        <input
          required
          defaultValue={list.scheduleTitle}
          className={styles.input}
          id="scheduletitle"
        />
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          sx={{ mb: 2, mt: 2 }}>
          일정
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            locale={ko}
            label="시작일"
            value={startValue}
            inputFormat={'yyyy/MM/dd  HH:mm'}
            renderInput={(params) => <TextField {...params} />}
            onChange={(newValue) => {
              setStartValue(newValue);
            }}
          />
        </LocalizationProvider>
        <span className={styles.centerfont}> : </span>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            locale={ko}
            label="끝나는일"
            value={endvalue}
            inputFormat={'yyyy/MM/dd  HH:mm'}
            onChange={(newValue) => {
              setEndValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Typography
          id="modal-modal-description"
          variant="h6"
          sx={{ mt: 2, mb: 2 }}>
          MEMO
        </Typography>
        <input
          defaultValue={list.scheduleMemo}
          className={styles.input}
          id="CalendarContent"></input>
        <Typography
          id="modal-modal-description"
          variant="h6"
          sx={{ mt: 2, mb: 2 }}>
          장소
        </Typography>
        <input
          defaultValue={list.scheduleLocation}
          className={styles.input}
          id="CalendarLocation"
        />
        <br />
        <Button
          onClick={handleClose}
          sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
          취소
        </Button>
        <Button
          onClick={updateHandle}
          sx={{ fontSize: 30, border: 1, mr: 3, mt: 1 }}>
          수정
        </Button>
        <Button
          onClick={() => deletehandle1()}
          sx={{ fontSize: 30, border: 1, mt: 1 }}>
          삭제
        </Button>
      </Box>
    </Modal>
  );
}

export default CalendarUpdate;
