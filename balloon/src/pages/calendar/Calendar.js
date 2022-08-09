import React from 'react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getScheduleByEmp } from '../../context/CalendarAxios';
import '../../css/Calender.scss';
import '../../css/Celendar.css';
import { Button, Container } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import CalendarInsert from './CalendarInsert';
import CalendarUpdate from './CalendarUpdate';

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
  const [list, setList] = useState([]);
  const handleOpen1 = () => setOpenUpdate(true);

  const [setEmpId, empInfo, setEmpInfo] = useOutletContext();

  useEffect(() => {
    if (!!empInfo.empId) {
      getScheduleByEmp(empInfo.empId, list, setList);
    }
  }, [list]);

  //모달
  return (
    <div className="container">
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
        {open && (
          <CalendarInsert
            style={style}
            open={open}
            setOpen={setOpen}
            empInfo={empInfo}
          />
        )}
        {/* 수정 */}
        {openUpdate && (
          <CalendarUpdate
            style={style}
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            empInfo={empInfo}
            list={list}
            setList={setList}
          />
        )}
        <div>
          <FullCalendar
            handleWindowResize="50vw"
            headerToolbar={{
              left: 'title', // will normally be on the left. if RTL, will be on the right
              right: 'prevYear prev next nextYear',
              // right: 'today prev,next', // will normally be on the right. if RTL, will be on the left
            }}
            plugins={[dayGridPlugin, interaction]}
            dateClick={handleDateClick}
            height="70vh"
            locale="ko"
            events={list}
            eventClick={handleOpen1}
          />
        </div>
      </Container>
    </div>
  );
}

export default Calendar;
