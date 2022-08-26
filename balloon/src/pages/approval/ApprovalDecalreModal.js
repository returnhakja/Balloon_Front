import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../../css/Report.module.css';
import { TextField } from '@mui/material';
import {
  insertApproval,
  updateApproval,
  updateApvlBizRpt,
} from '../../context/ApprovalAxios';
import { Link } from 'react-router-dom';

export default function ApprovalDeclareModal({
  style,
  openModal,
  setOpenModal,
  // docId,
  approver,
  // inputData,
  // empInfo,
  apvl,
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            결재 내용
          </Typography>
          <TextField
            id="apvlContent"
            fullWidth
            multiline
            rows={10}
            placeholder="내용을 입력해주세요."
          />
          <Box sx={{ '& button': { m: 1 } }}>
            <Button
              variant="contained"
              size="large"
              sx={{ my: 0.5 }}
              onClick={handleClose}>
              뒤로가기
            </Button>
            <Link
              to={'/'}
              onClick={async () => {
                approver.map((apvl) => {
                  updateApvlBizRpt(apvl, 4);
                  updateApproval(apvl, 4);
                });
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                반려하기
              </Button>
            </Link>
            <Link
              to={'/'}
              onClick={async () => {
                approver.map((apvl) => {
                  updateApvlBizRpt(apvl, 2);
                  updateApproval(apvl, 3);
                });
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                결재하기
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
