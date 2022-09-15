import * as React from 'react';
import { Link } from 'react-router-dom';
import { updateApproval, updateApvlDoc } from '../../context/ApprovalAxios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Col } from 'antd';

export default function ApprovalDeclareModal({
  style,
  openModal,
  setOpenModal,
  approver,
  apvlList,
  approvalList,
  paInfo,
}) {
  const handleClose = () => {
    setOpenModal(false);
  };
  console.log(apvlList);
  console.log(approvalList);

  const myIndex = approvalList.findIndex(
    (apvl) => apvl.approvalId === apvlList[0].approvalId
  );
  console.log(myIndex);
  let approvedList = [];

  for (let index = myIndex; index > -1; index--) {
    console.log(approvalList[index]);
    approvedList.push(approvalList[index]);
  }

  console.log(approvedList);

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
              to={'/boxes/ar'}
              onClick={async () => {
                updateApvlDoc([apvlList[0]], 4, paInfo);
                updateApproval(approvedList, 4);

                alert('문서를 반려 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                반려하기
              </Button>
            </Link>
            <Link
              to={'/boxes/ac'}
              onClick={async () => {
                if (!apvlList[1]) {
                  updateApvlDoc([apvlList[0]], 2, paInfo);
                  updateApproval(approvalList, 3);
                } else {
                  updateApvlDoc(apvlList, 5, paInfo);
                  updateApproval(apvlList, 2);
                }
                alert('문서를 결재 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                결재하기
              </Button>
            </Link>
            {/* <Link
              to={'/boxes/ar'}
              onClick={async () => {
                approver.map((apvl) => {
                  updateApvlDoc(apvl, 4, paInfo);
                  updateApproval(apvl, 4);
                });
                alert('문서를 반려 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                반려하기
              </Button>
            </Link>
            <Link
              to={'/boxes/ac'}
              onClick={async () => {
                approver &&
                  approver.map((apvl) => {
                    updateApvlDoc(apvl, 2, paInfo);
                    updateApproval(apvl, 3);
                  });
                alert('문서를 결재 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                결재하기
              </Button>
            </Link> */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
