import { useEffect, useState } from 'react';
<<<<<<< HEAD:balloon/src/pages/CelendarUpdate.js
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import styles from '../css/Component.module.css';
import axios from 'axios';
function CelendarUpdate({ style, openUpdate, setOpenUpdate }) {
=======
import styles from '../../css/Component.module.css';
import axios from 'axios';
import { deletehandle } from '../../context/CalendarAxios';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function CalendarUpdate({ style, openUpdate, setOpenUpdate, list, setList }) {
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarUpdate.js
  const handleClose = () => setOpenUpdate(false);

  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);
<<<<<<< HEAD:balloon/src/pages/CelendarUpdate.js
  const [list, setList] = useState([]);

=======
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarUpdate.js
  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
    };
<<<<<<< HEAD:balloon/src/pages/CelendarUpdate.js
    const data = async (scheduleId) => {
      const response = await axios
        .get(`http://localhost:8080/api/calall/` + scheduleId, headers)
=======
    const data = async (list) => {
      console.log(list);
      const response = await axios
        .get(`http://localhost:8080/api/calall/` + list[0], headers)
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarUpdate.js
        .then((response) => {
          setList(response.data);
        });
    };
<<<<<<< HEAD:balloon/src/pages/CelendarUpdate.js
    data();
  }, []);
  console.log(list.data);
=======

    data();
  }, [list]);

>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarUpdate.js
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
<<<<<<< HEAD:balloon/src/pages/CelendarUpdate.js

  //삭제
  const deletehandle = (scheduleId) => {
    const data = async () => {
      const response = await axios
        .delete(`http://localhost:8080/cal/delete/${scheduleId}`)

        .then(() => {
          handleClose(false);
          window.location.href = '/calendar';
        });
    };
    data();
  };
=======
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarUpdate.js

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
<<<<<<< HEAD:balloon/src/pages/CelendarUpdate.js
        <Button onClick={deletehandle} sx={{ fontSize: 30, border: 1, mt: 1 }}>
=======
        <Button
          onClick={() => deletehandle('scheduleId', handleClose)}
          sx={{ fontSize: 30, border: 1, mt: 1 }}>
>>>>>>> c6e9db9dcd634db5d561f82409229ed25a2e8a13:balloon/src/pages/calendar/CalendarUpdate.js
          삭제
        </Button>
      </Box>
    </Modal>
  );
}

export default CalendarUpdate;
