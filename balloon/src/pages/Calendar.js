import { useState } from 'react';
import moment from 'moment';
import '../css/Calender.scss';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import '../css/Celendar.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import styles from '../css/Component.module.css';
import ModalInsert from './ModalInsert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};
const Calendar = () => {
  const handleDateClick = (e) => {
    console.log(e);
  };
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);
  return (
    <div class="container">
      <Container maxWidth="xl">
        {/* 모달 */}

        <Button onClick={handleOpen} sx={{ fontSize: 30 }}>
          일정 등록
        </Button>
        <Button onClick={handleOpen1} sx={{ fontSize: 30 }}>
          일정 수정
        </Button>
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
              id="outlined-required"
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
              같은부서 사원을 찾을 수 있는 그걸 만들어야하는데 몰라서 일딴
              텍스트
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
              onClick={handleClose}
              sx={{ fontSize: 30, border: 1, mt: 1 }}>
              등록
            </Button>
          </Box>
        </Modal>
        <Modal
          open={open1}
          onClose={handleClose1}
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
              같은부서 사원을 찾을 수 있는 그걸 만들어야하는데 몰라서 일딴
              텍스트
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
              onClick={handleClose1}
              sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
              취소
            </Button>
            <Button
              onClick={handleClose1}
              sx={{ fontSize: 30, border: 1, mt: 1 }}>
              수정
            </Button>
          </Box>
        </Modal>
        <FullCalendar
          handleWindowResize="50vw"
          plugins={[dayGridPlugin, interaction]}
          dateClick={handleDateClick}
          height="70vh"
          locale="ko"
        />
      </Container>
    </div>
  );
  //얘는 기존 코드인데 안쓸꺼같음 근데 혹시 모르니까 일딴 남겨놨음
  // 안쓰는 이유 : 코드가 너무 길어질꺼같아서 별로 보기 안좋음 ㅠㅠ
  //   const [getMoment, setMoment] = useState(moment());

  //   const today = getMoment;
  //   const firstWeek = today.clone().startOf('month').week();
  //   const lastWeek =
  //     today.clone().endOf('month').week() === 1
  //       ? 53
  //       : today.clone().endOf('month').week();

  //   const calendarArr = () => {
  //     let result = [];
  //     let week = firstWeek;
  //     for (week; week <= lastWeek; week++) {
  //       result = result.concat(
  //         <div className="calendar_body_line" key={week}>
  //           {Array(7)
  //             .fill(0)
  //             .map((data, index) => {
  //               let days = today
  //                 .clone()
  //                 .startOf('year')
  //                 .week(week)
  //                 .startOf('week')
  //                 .add(index, 'day');
  //               if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
  //                 return (
  //                   <div
  //                     className="calendar_body_days"
  //                     onClick={() => console.log(days.format('YYYYMMDD'))}
  //                     key={index}>
  //                     <span style={{ color: 'red' }}>{days.format('D')}</span>
  //                   </div>
  //                 );
  //               } else if (days.format('MM') !== today.format('MM')) {
  //                 return (
  //                   <div
  //                     className="calendar_body_days"
  //                     onClick={() => console.log(days.format('YYYYMMDD'))}
  //                     key={index}>
  //                     <span style={{ color: 'gray' }}>{days.format('D')}</span>
  //                   </div>
  //                 );
  //               } else {
  //                 return (
  //                   <div
  //                     className="calendar_body_days"
  //                     onClick={() => console.log(days.format('YYYYMMDD'))}
  //                     key={index}>
  //                     <span>{days.format('D')}</span>
  //                   </div>
  //                 );
  //               }
  //             })}
  //         </div>
  //       );
  //     }
  //     return result;
  //   };

  //   return (
  //     <div className="App">
  //       <div className="calendar_head">
  //         <button
  //           className="calendar_button"
  //           onClick={() => {
  //             setMoment(getMoment.clone().subtract(1, 'month'));
  //           }}>
  //           이전달
  //         </button>
  //         <div className="calendar_head_text">
  //           {today.format('YYYY 년 MM 월')}
  //         </div>
  //         <button
  //           className="calendar_button"
  //           onClick={() => {
  //             setMoment(getMoment.clone().add(1, 'month'));
  //           }}>
  //           다음달
  //         </button>
  //       </div>
  //       <div className="calendar_body">
  //         <div className="calendar_body_box">
  //           <Daykor />
  //           {calendarArr()}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // function Daykor() {
  //   return (
  //     <>
  //       <div className="calendar_body_head">
  //         <div className="calendar_body_head_days">일</div>
  //         <div className="calendar_body_head_days">월</div>
  //         <div className="calendar_body_head_days">화</div>
  //         <div className="calendar_body_head_days">수</div>
  //         <div className="calendar_body_head_days">목</div>
  //         <div className="calendar_body_head_days">금</div>
  //         <div className="calendar_body_head_days">토</div>
  //       </div>
  //     </>
  //   );
};

export default Calendar;
