import React, { useEffect } from 'react';
import { deleteEmployee } from '../context/EmployeeAxios';
import { deleteCheck } from '../context/MuiRenderFunc';
import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  padding: 4,
};

function DeleteModal({ open, setOpen, label, rowData, deleteFunc }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} close={handleClose}>
      <Box sx={styleBox}>
        <h3
          style={{
            marginTop: '15px',
            marginBottom: '20px',
          }}>
          정말 {label}을 삭제하시겠겠습니까?
        </h3>
        <Button
          variant="contained"
          onClick={() => {
            handleClose();
          }}>
          취소
        </Button>{' '}
        <Button
          variant="contained"
          onClick={() => {
            Object.keys(rowData).length !== 0 && deleteFunc(rowData);
            setOpen(false);
          }}>
          삭제
        </Button>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
