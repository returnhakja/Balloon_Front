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
  const [list, setList] = useState([]);
  const handleOpen1 = () => setOpenUpdate(true);

  const empInfo = useOutletContext();
  const setEmpInfo = useOutletContext();
  //

  useEffect(() => {
    // console.log(list[1].scheduleTitle);
    // const data = () => {
    axios
      .get(`/api/cal/` + empInfo.empId)
      .then((response) => {
        console.log(response.data);
        const arr = [];
        // response.data;
        response.data.map((data) => {
          arr.push({
            title: data.scheduleTitle,
            start: data.scheduleStart,
            end: data.scheduleEnd,
            allDay: true,
          });
        });
        setList(arr);
      })
      .catch((err) => console.log(err));
    // .then((data) => {
    //   // data &&
    //   //   data.map((data) => {
    //   //     return list.push(data);
    //   //   });
    //   console.log(data);
    //   setList(data);
    // });
    // };
    // data();
  }, [empInfo]);
  // console.log(list);
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
        <div>
          <FullCalendar
            handleWindowResize="50vw"
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
