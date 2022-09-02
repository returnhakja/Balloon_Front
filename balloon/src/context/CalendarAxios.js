import axios from 'axios';

export const getScheduleByEmp = async (empId, setList) => {
  const url = '/cal/';
  const str = url + empId;
  const list = await axios
    .get(str)
    .then((response) => {
      const arr = [];
      response.data.map((data) => {
        return arr.push({
          scheduleId: data.scheduleId,
          title: data.scheduleTitle,
          start: data.scheduleStart,
          end: data.scheduleEnd,
          // allDay: true,
          empId: data.employee.empId,
          backgroundColor: 'yellow',
          textColor: 'black',
        });
      });
      return arr;
    })
    .catch((error) => console.log(error));

  setList(list);
};

export const insertSchedule = async (inputdata, setOpen) => {
  const url = '/cal/insert';
  const headers = {
    'Content-Type': 'application/json',
  };
  await axios
    .post(url, inputdata, {
      headers,
    })
    .catch((error) => console.log(error));

  setOpen(false);
};

export const insertSchedulList = async (schduleListAdd, setOpen) => {
  const url = '/cal/schedule';
  const headers = {
    'Content-Type': 'application/json',
  };
  await axios
    .post(url, schduleListAdd, {
      headers,
    })
    .catch((error) => console.log(error));
  setOpen(false);

  // window.location.href = '/calendar';
};

// 일정 클릭 시 scheduleId 가져오기
export const getScheduleIdInModal = async (scheduleId, headers, setList) => {
  await axios
    .get(`/cal/all/${scheduleId}`, headers)
    .then((response) => {
      setList(response.data);
    })
    .catch((error) => console.log(error));
};

// 일정 수정
export const updateSchedule = async (inputdata, headers, setOpenUpdate) => {
  const url = '/cal/update';

  await axios
    .put(url, inputdata, {
      headers,
    })
    .catch((error) => console.log(error));
  setOpenUpdate(false);
  window.location.href = '/calendar';
};

// 일정 삭제
export const deleteSchedule = async (scheduleId, handleClose) => {
  await axios
    .delete(`/cal/delete/${scheduleId}`)

    .then(() => {
      handleClose(false);
    })
    .catch((error) => console.log(error));

  // window.location.href = '/calendar';
};
