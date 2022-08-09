import { useEffect, useState } from 'react';
import moment from 'moment';
import '../css/Calender.scss';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import { Button, Container } from '@mui/material';
import '../css/Celendar.css';
import CelendarInsert from './CelendarInsert';
import CelendarUpdate from './CelendarUpdate';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

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
function Calendar() {
  const handleDateClick = (e) => {
    console.log(e);
  };
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpen1 = () => setOpenUpdate(true);

  const empInfo = useOutletContext();
  const setEmpInfo = useOutletContext();
  //

  useEffect(() => {
    console.log(empInfo);
    const data = async () => {
      const response = await axios
        .get(`http://localhost:8080/api/cal/` + empInfo.empId)
        .then((response) => {
          console.log(response.data);
        });
    };
    data();
  }, []);

  //모달
  return (
    <div class="container">
      <Container maxWidth="xl">
        {/* 모달 */}

        <Button
          onClick={() => {
            setOpen(!open);
          }}
          sx={{ fontSize: 30 }}>
          일정 등록
        </Button>
        <Button onClick={handleOpen1} sx={{ fontSize: 30 }}>
          일정 수정
        </Button>
        {/* 등록 */}
        {open && <CelendarInsert style={style} open={open} setOpen={setOpen} />}
        {/* 수정 */}
        {openUpdate && (
          <CelendarUpdate
            style={style}
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
          />
        )}

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
}

export default Calendar;
