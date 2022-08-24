import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function PaymentDeclareModal({
  style,
  openModal,
  setOpenModal,
}) {
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            제목
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            여긴 내용
          </Typography>
          <Box sx={{ '& button': { m: 1 } }}>
            <Button
              variant="contained"
              size="large"
              sx={{ my: 0.5 }}
              onClick={handleClose}>
              뒤로가기
            </Button>
            <Button variant="contained" size="large" sx={{ my: 0.5 }}>
              반려하기
            </Button>
            <Button variant="contained" size="large" sx={{ my: 0.5 }}>
              결재하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
