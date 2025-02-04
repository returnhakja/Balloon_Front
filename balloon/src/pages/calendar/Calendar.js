import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CalendarInsert from './CalendarInsert';
import CalendarUpdate from './CalendarUpdate';
import { getScheduleByEmp } from '../../context/CalendarAxios';
import '../../css/Celendar.css';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

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

function Calendar({ clients, setClients }) {
  const [list, setList] = useState([]);
  const [openInsert, setOpenInsert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState({
    state: false,
    scheduleId: null,
  });
  const [eList] = useState([]);
  // dateClick
  const [dateStr, setdataStr] = useState([]);
  const [empInfo] = useOutletContext();
  const handleDateClick = (e) => {
    setOpenInsert(true);
    setdataStr(e.dateStr);
  };

  const handleEventClick = (e) => {
    e.jsEvent.preventDefault();

    const scheduleId = e.event._def.extendedProps.scheduleId;
    modalOpen(scheduleId);
  };

  const modalOpen = (scheduleId) => {
    if (!!scheduleId) {
      setOpenInsert(false);
      setOpenUpdate({
        state: true,
        scheduleId: scheduleId,
      });
    }
  };

  useEffect(() => {
    if (empInfo.length !== 0) {
      getScheduleByEmp(empInfo.empId, setList);
    }
  }, [empInfo, openInsert]);

  useEffect(() => {}, [openInsert, openUpdate, list]);

  // useEffect(() => {
  //   if (list.length === 0) {
  //     if (empInfo.length !== 0) {
  //       getScheduleByEmp(empInfo.empId, setList);
  //     }
  //   }
  // }, [empInfo, openInsert, openUpdate, list]);

  // 즐겨찾기 캘린더
  // useEffect(() => {
  //   getEmpListInSameUnit(empId, setCEList);
  //   console.log(eList);
  // }, []);

  //모달
  return (
    <div className="container">
      {eList.map((emp) => {
        return (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type="checkbox"
              onClick={() => {
                getScheduleByEmp(empInfo.empId);
              }}
            />
            {emp.empName}
            {emp.position}{' '}
          </Typography>
        );
      })}
      {/* <Container maxWidth="md" sx={{ zIndex: 2 }}> */}
      <Container maxWidth="lg" sx={{ zIndex: 2 }}>
        {/* 등록 */}
        {openInsert && (
          <CalendarInsert
            style={style}
            openInsert={openInsert}
            setOpenInsert={setOpenInsert}
            empInfo={empInfo}
            dateStr={dateStr}
            clients={clients}
            setClients={setClients}
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
        {list.length !== 0 ? (
          <>
            <Button
              onClick={() => {
                setOpenInsert(true);
              }}
              sx={{ fontSize: 30 }}>
              일정 등록
            </Button>
            <FullCalendar
              position="relative"
              initialView="dayGridMonth"
              height="70vh"
              handleWindowResize="50vw"
              plugins={[dayGridPlugin, interaction, googleCalendarPlugin]}
              headerToolbar={{
                left: 'today',
                center: 'prevYear prev title next nextYear',
                right: 'dayGridDay dayGridWeek dayGridMonth',
              }}
              googleCalendarApiKey={process.env.REACT_APP_CALENDAR_API}
              moreLinkContent={(e) => (e.text = ` +${e.num} 더보기`)}
              dayMaxEvents={2}
              eventSources={[
                list,
                {
                  googleCalendarId:
                    'ko.south_korea#holiday@group.v.calendar.google.com',
                  color: 'red',
                },
              ]}
              eventBackgroundColor={'#000000'}
              // eventSourceSuccess={() => console.log('Success EventSource')}
              // eventSourceFailure={() => console.log('Failure EventSource')}
              dateClick={(e) => handleDateClick(e)}
              eventClick={(e) => handleEventClick(e)}
              locale="ko"
            />
          </>
        ) : (
          <>
            <Container maxWidth="sm">
              <Box sx={{ display: 'flex', justifyContent: 'centerinp' }}>
                <CircularProgress
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </Box>
            </Container>
          </>
        )}
      </Container>
    </div>
  );
}

export default Calendar;
