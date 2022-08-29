import { useEffect, useState } from 'react';
import { findUnitByUnitId } from '../../context/UnitAxios';
import styles from '../../css/Component.module.css';
import { BsCalendarWeek } from 'react-icons/bs';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Test1({ open, setOpen, unitCode }) {
  //   const [open, setOpen] = React.useState(false);
  console.log(unitCode);
  const handleClose = () => setOpen(false);

  const [unit, setUnit] = useState({});

  // const handleClose = () => {
  //   setOpenUpdate(false);

  // };

  const updateHandle = () => {
    const unitCode = document.getElementById('unitCode').value;
    const unitName = document.getElementById('unitName').value;
    const bell = document.getElementById('bell').value;
    const parentUnit = document.getElementById('parentUnit').value;

    const updatedata = {
      unitCode: unitCode,
      unitName: unitName,
      bell: bell,
      parentUnit: { unitCode: parentUnit },
    };
  };

  useEffect(() => {
    findUnitByUnitId(unitCode, setUnit);
  }, [Object.keys(unit).length]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h4"
            sx={{ mb: 2, mt: 2, color: '#00AAFF' }}>
            <ApartmentIcon className={styles.icon} />
            <span>조직 정보</span>
            <hr />
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{ mb: 2, mt: 2 }}>
            조직 번호
          </Typography>
          <TextField
            required
            id="unitCode"
            // label="일정 제목을 입력하세요"
            value={Object.keys(unit).length !== 0 && unit.unitCode}
            sx={{ width: '100%' }}
            inputProps={{ readOnly: true }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{ mb: 2, mt: 2 }}>
            조직 이름
          </Typography>
          <TextField
            id="unitName"
            // label="시작일"
            value={Object.keys(unit).length !== 0 && unit.unitName}
            // value="테스트"
            sx={{ width: 250 }}
            // inputProps={{ readOnly: true }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{ mb: 2, mt: 2 }}>
            전화번호
          </Typography>
          <TextField
            id="bell"
            // label="끝나는 일"
            // defaultValue={endvalue}
            value={Object.keys(unit).length !== 0 && unit.bell}
            sx={{ width: 250 }}
            // inputProps={{ readOnly: true }}
          />

          <Typography
            id="modal-modal-description"
            variant="h6"
            component="h6"
            sx={{ mt: 2 }}>
            상위 조직
          </Typography>
          <TextField
            required
            id="parentUnit"
            // label="메모 입력"
            sx={{ width: '100%' }}
            inputProps={{ readOnly: true }}
            value={
              Object.keys(unit).length !== 0 && unit.parentUnit
                ? unit.parentUnit
                : '없음'
            }
          />
          <Button
            onClick={handleClose}
            sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
            취소
          </Button>
          {/* 채팅방만드는 부분 */}
          <Button
            onClick={() => {
              // updateHandle();
            }}
            sx={{ fontSize: 30, border: 1, mt: 1 }}>
            수정
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
