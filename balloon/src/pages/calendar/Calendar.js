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
  const [openInsert, setOpenInsert] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [list, setList] = useState([]);

  const [setEmpId, empInfo, setEmpInfo] = useOutletContext();

  useEffect(() => {
    console.log(empInfo);
    if (!!empInfo.empId) {
      getScheduleByEmp(empInfo.empId, list, setList);
    }
  }, [openInsert]);

  //모달
  return (
    <div className="container">
      <Container maxWidth="xl">
        {/* 모달 */}

        <Button
          onClick={() => {
            setOpenInsert(!openInsert);
          }}
          sx={{ fontSize: 30 }}>
          일정 등록
        </Button>

        {/* 등록 */}
        {openInsert && (
          <CalendarInsert
            style={style}
            open={openInsert}
            setOpen={setOpenInsert}
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
              left: 'title',
              right: 'prevYear prev next nextYear',
            }}
            plugins={[dayGridPlugin, interaction]}
            dateClick={handleDateClick}
            height="70vh"
            locale="ko"
            events={list}
            eventClick={() => setOpenUpdate(true)}
          />
        </div>
      </Container>
    </div>
  );
}

export default Calendar;
