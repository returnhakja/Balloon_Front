import { useEffect, useState } from 'react';
import styles from '../../css/Component.module.css';
import axios from 'axios';
import { deletehandle } from '../../context/CalendarAxios';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function CalendarUpdate({ style, openUpdate, setOpenUpdate }) {
  console.log('sssss');
  console.log(style);
  console.log(openUpdate);
  console.log(setOpenUpdate);
  const handleClose = () => setOpenUpdate(false);

  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);

  useEffect(
    () => {
      const headers = {
        'Content-Type': 'application/json',
      };

      // console.log(list);
      // const data = async (list) => {
      //   console.log(list);
      //   const response = await axios
      //     .get(`http://localhost:8080/api/calall/` + list[0], headers)

      //     .then((response) => {
      //       setList(response.data);
      //     });
      // };

      // data();
    },
    []
    //  [list]
  );

  //업데이트
  const updateHandle = () => {
    const scheduletitle = document.getElementById('scheduletitle').value;
    const CalendarContent = document.getElementById('CalendarContent').value;
    const CalendarLocation = document.getElementById('CalendarLocation').value;

    const inputdata = {
      scheduleTitle: scheduletitle,
      scheduleStart: startValue,
      scheduleEnd: endvalue,
      scheduleMemo: CalendarContent,
      scheduleLocation: CalendarLocation,
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = async () => {
      const response = await axios.put(
        `http://localhost:8080/api/cal/update`,
        inputdata,
        {
          headers,
        }
      );
      setOpenUpdate(false);
      window.location.href = '/calendar';
    };
    data();
  };

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
          component="h2"
          sx={{ mb: 2, mt: 2, color: 'red' }}>
          일정 제목
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="일정 제목을 입력하세요"
          // defaultValue={}
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
            value={startValue}
            type=" date"
            inputFormat={'yyyy-MM-dd'}
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
          id="outlined-required1"
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
          id="outlined-required2"
          label="장소 입력"
          sx={{ mt: 1, width: '100%' }}
        />
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
          onClick={() => deletehandle('scheduleId', handleClose)}
          sx={{ fontSize: 30, border: 1, mt: 1 }}>
          삭제
        </Button>
      </Box>
    </Modal>
  );
}

export default CalendarUpdate;
