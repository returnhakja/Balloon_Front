import React, { useEffect, useState } from 'react';
import styles from '../../css/Component.module.css';
import { Avatar, Button, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Box, CardContent, Modal } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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

export default function ProfileUpdateModal({ open, setOpen, empId, photo }) {
  const handleClose = () => setOpen(false);
  console.log(photo);
  const onSubmit = () => {
    console.log(empId);
  }; // your form submit function which will invoke after successful validation

  return (
    <div>
      {empId && (
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
                  <AddPhotoAlternateIcon className={styles.icon} />
                  <span>사진 수정</span>
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
                }}>
                {!!photo ? (
                  <div>
                    <Avatar
                      style={{
                        margin: '10px 10px 20px 10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        // textAlign: 'center',
                        borderRadius: '100px',
                      }}
                      size={100}
                      src={
                        <img
                          src={`${photo}`}
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '100px',
                          }}
                        />
                      }
                    />
                    <p>사진을 변경해주세요</p>
                  </div>
                ) : (
                  <div>
                    <Avatar
                      style={{
                        margin: '10px 10px 20px 10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        // textAlign: 'center',

                        // background: '#bdbdbd',
                        // color: '#fff',
                      }}
                      // size={100}
                      src={
                        <img
                          src={`${process.env.PUBLIC_URL}/asset/none_profile.png`}
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '100px',
                          }}
                        />
                      }
                    />
                    <p>사진을 추가해주세요</p>
                  </div>
                )}
              </CardContent>

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
