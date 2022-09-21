import React, { useState } from 'react';
import { uploadProfile } from '../../context/EmployeeAxios';
import styles from '../../css/Component.module.css';
import {
  Box,
  CardContent,
  Modal,
  Avatar,
  Button,
  Card,
  Typography,
} from '@mui/material';
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

export default function UpdateProfileModal({ open, setOpen, empId, photo }) {
  const [preView, setPreView] = useState(photo);
  const [profile, setProfile] = useState('');
  const [profileName, setProfileName] = useState('첨부파일');
  const handleClose = () => setOpen(false);

  const upload = () => {
    console.log('file', profile);
    if (profile.length !== 0) {
      const pathPoint = profileName.lastIndexOf('.');
      const filePoint = profileName.substring(
        pathPoint + 1,
        profileName.length
      );
      const fileType = filePoint.toLowerCase();
      if (
        fileType === 'jpg' ||
        fileType === 'gif' ||
        fileType === 'png' ||
        fileType === 'jpeg' ||
        fileType === 'bmp'
      ) {
        uploadProfile(profile, empId);
        handleClose();
        window.location.href = '/mypage';
      } else {
        alert('이미지 파일만 선택할 수 있습니다!!');
        return false;
      }
    } else {
      alert('사진을 넣어주세요!!');
    }
  };

  const handleFileInput = (e) => {
    const fileStr = e.target?.files[0]?.name;
    if (!!fileStr) {
      setProfileName(e.target.files[0].name);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      setProfile(formData);

      // 이미지 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      return new Promise((resolve) => {
        reader.onload = () => {
          setPreView(reader.result);
          resolve();
        };
      });
    } else {
      alert('사진이 들어가지 않았습니다.');
    }
  };

  return (
    <div>
      {empId && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box component="form" encType="multipart/form-data" sx={style}>
            <Card sx={{ width: '1000px' }}>
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
                {!!photo && (
                  <div>
                    <Avatar
                      style={{
                        margin: '10px 10px 10px 10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        borderRadius: '100px',
                        width: '100px',
                        height: '100px',
                      }}
                      src={preView}
                    />
                    <p>사진을 변경해주세요</p>
                  </div>
                )}
              </CardContent>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '10px 0px 10px 0px',
                }}>
                <div className={styles.filebox}>
                  <input
                    className={styles.upload_name}
                    value={profileName}
                    readOnly
                  />
                  <Button variant="outlined">
                    <label htmlFor="file">파일찾기</label>
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileInput}
                      accept="image/gif, image/jpeg, image/png"
                    />
                  </Button>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                <Button
                  onClick={handleClose}
                  sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
                  취소
                </Button>
                <Button
                  // type="submit"
                  onClick={() => upload()}
                  sx={{ fontSize: 30, border: 1, mt: 1 }}>
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
