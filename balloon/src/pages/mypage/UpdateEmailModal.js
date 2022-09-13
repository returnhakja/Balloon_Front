import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Typography } from 'antd';
import { Box, CardContent, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  marginTop: '1%',
  maxWidth: 'lg',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  margin: '30px 0px 30px 0px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateEmailModal({ open, setOpen, empId, email }) {
  const handleClose = () => setOpen(false);

  const onSubmit = () => {
    console.log('dd');
  };

  return (
    <div>
      {email && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box component="form" onSubmit={onSubmit()} sx={style}>
            <Card>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  color: '#00AAFF',
                  fontFamily: '"Roboto","Helvetica","Arial","sans-serif"',
                  fontSize: '2rem',
                  fontWeight: 100,
                }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h4"
                  sx={{ mb: 2, mt: 2, color: '#00AAFF' }}>
                  {/* <AddPhotoAlternateIcon className={styles.icon} /> */}
                  <span>이메일 인증</span>
                  <hr />
                </Typography>
              </div>
              <CardContent
                sx={{
                  margin: '15px',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}></CardContent>

              <input type="file" />
              <div>
                <Button
                  onClick={handleClose}
                  sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
                  취소
                </Button>
                <Button type="submit" sx={{ fontSize: 30, border: 1, mt: 1 }}>
                  수정
                </Button>
              </div>
            </Card>
          </Box>
        </Modal>
      )}
    </div>
  );
}
