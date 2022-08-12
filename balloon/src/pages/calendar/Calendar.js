import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getScheduleByEmp } from '../../context/CalendarAxios';
import '../../css/Celendar.css';
import { Button, Container } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import CalendarInsert from './CalendarInsert';
import CalendarUpdate from './CalendarUpdate';
import axios from 'axios';
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
  const [openInsert, setOpenInsert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState({
    state: false,
    scheduleId: null,
  });
  const handleDateClick = (e) => {
    console.log(e);
  };
  const handleEventClick = (e) => {
    const scheduleId = e.event._def.extendedProps.scheduleId;
    setOpenInsert(false);
    setOpenUpdate({
      state: true,
      scheduleId: scheduleId,
    });
    console.log(scheduleId);
  };

  const [empInfo, setEmpInfo] = useOutletContext();

  const list = getScheduleByEmp(empInfo.empId);

  //모달
  return (
    <div className="container">
      <Container maxWidth="xl">
        {/* 모달 */}

        <Button
          onClick={() => {
            setOpenInsert(true);
          }}
          sx={{ fontSize: 30 }}>
          일정 등록
        </Button>

        {/* 등록 */}
        {openInsert && (
          <CalendarInsert
            style={style}
            openInsert={openInsert}
            setOpenInsert={setOpenInsert}
            empInfo={empInfo}
          />
        )}
        {/* 수정 */}
        {openUpdate.state && (
          <CalendarUpdate
            style={style}
            openUpdate={openUpdate}
            setOpenUpdate={setOpenUpdate}
            empInfo={empInfo}
          />
        )}

        <FullCalendar
          locale="ko"
          height="70vh"
          handleWindowResize="50vw"
          plugins={[dayGridPlugin, interaction, googleCalendarPlugin]}
          headerToolbar={{
            left: 'title',
            center: 'dayGridDay dayGridWeek dayGridMonth',
            right: 'today prevYear prev next nextYear',
          }}
          googleCalendarApiKey={process.env.REACT_APP_CALENDAR_API}
          eventSources={{
            googleCalendarId:
              'ko.south_korea#holiday@group.v.calendar.google.com',
            className: '대한민국 휴일',
            color: 'orange',
          }}
          eventBackgroundColor={'black'}
          eventSourceSuccess={() => console.log('Success EventSource')}
          eventSourceFailure={() => console.log('Failure EventSource')}
          dateClick={(e) => handleDateClick(e)}
          events={() => list}
          eventClick={(e) => handleEventClick(e)}
          event
        />
      </Container>
    </div>
  );
}

export default Calendar;
