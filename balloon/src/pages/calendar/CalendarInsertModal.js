import React from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

function CalendarInsertModal({
  open,
  handleClose,
  style,
  eList,
  inviteSchedule,
  handleListClose,
  handleempAddClose,
  setInviteSchedule,
}) {
  const onInviteSchedule = (checked, data) => {
    if (checked) {
      setInviteSchedule([...inviteSchedule, data]);
    } else {
      setInviteSchedule(inviteSchedule.filter((button) => button !== data));
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description">
      <Box sx={{ ...style, width: 400 }}>
        {eList.map((emp, index) => {
          return (
            <Typography id="modal-modal-description" sx={{ mt: 2 }} key={index}>
              <input
                type="checkbox"
                onChange={(e) => {
                  onInviteSchedule(e.currentTarget.checked, emp.empId);
                }}
                checked={inviteSchedule.includes(emp.empId) ? true : false}
              />
              {emp.empName}
              {emp.position}
            </Typography>
          );
        })}
        <br />
        <Button onClick={handleListClose}>취소하기</Button>
        <Button onClick={handleempAddClose}>추가하기</Button>
        {/* <ChildModal /> */}
      </Box>
    </Modal>
  );
}

export default CalendarInsertModal;
