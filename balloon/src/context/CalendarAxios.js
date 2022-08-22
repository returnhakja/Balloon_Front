import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const getScheduleByEmp = async (empId, setList) => {
  console.log(empId);
  console.log(empId);
  const url = '/api/cal/';
  const str = url + empId;
  const list = await axios
    .get(str)
    .then((response) => {
      const arr = [];
      response.data.map((data) => {
        arr.push({
          scheduleId: data.scheduleId,
          title: data.scheduleTitle,
          start: data.scheduleStart,
          end: data.scheduleEnd,
          allDay: true,
          empId: data.employee.empId,
        });
      });
      return arr;
    })
    .catch((err) => console.log(err));

  console.log(list);

  setList(list);
};

export const insertSchedule = async (inputdata, setOpen) => {
  const url = '/api/cal/insert';
  const headers = {
    'Content-Type': 'application/json',
  };
  console.log(inputdata);
  await axios
    .post(url, inputdata, {
      headers,
    })
    .catch((err) => console.log(err));

  setOpen(false);
};

export const insertSchedulList = async (schduleListAdd, setOpen) => {
  const url = '/api/cal/schedule';
  const headers = {
    'Content-Type': 'application/json',
  };
  await axios
    .post(url, schduleListAdd, {
      headers,
    })
    .catch((err) => console.log(err));
  setOpen(false);
  // <Navigate to={'/calendar'} />;
};

// 수정

//삭제
export const deletehandle = async (scheduleId, openUpdate, handleClose) => {
  console.log(scheduleId);

  await axios
    .delete(`/api/cal/delete/${scheduleId}`)

    .then(() => {
      handleClose(false);
    })
    .catch((err) => console.log(err));
  console.log(openUpdate.scheduleId);
  // window.location.href = '/calendar';
};
