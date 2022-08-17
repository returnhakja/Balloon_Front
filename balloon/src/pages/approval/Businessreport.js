import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import Modalapproval from './Modalapproval';
import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import { FcDocument } from 'react-icons/fc';

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

function Report() {
  // 사원 정보 context
  const [empInfo, setEmpInfo] = useOutletContext();
  const [openapprovalModal, setOpenapprovalModal] = useState(false);

  console.log(empInfo);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 25 }}
          color="#00AAFF"
          gutterBottom
          textAlign="center">
          기안자
        </Typography>
        <hr />
        <br />
        <Typography
          sx={{ fontSize: 20 }}
          variant="h5"
          component="div"
          textAlign="center">
          {empInfo.empName}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  // const [openModal, setOpenModal] = useState(false);
  console.log(empInfo);
  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>
          {' '}
          <FcDocument /> 업무기안
        </p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>업무기안</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>업무기안-</th>
            </tr>
          </thead>

          <tbody>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>보존연한</td>
              <td className={styles.td}>5년</td>
              <td className={styles.tdleft}>기안자</td>
              <th className={styles.th}>
                {' '}
                {empInfo.empName}({empInfo.empId})
              </th>
            </tr>
            <tr align="center" bgcolor="white"></tr>
          </tbody>
        </table>
        {/* {openModal && <Modal closeModal={setOpenModal} />} */}
        <div className={styles.body1}>
          <span className={styles.subtitle}>결재선</span>
          <button
            type="button"
            className={styles.btnnav}
            onClick={() => {
              // setOpenModal(true);
              setOpenapprovalModal(true);
            }}
            id="cancelBtn">
            결재선설정
          </button>
          {openapprovalModal && (
            <Modalapproval
              openapprovalModal={openapprovalModal}
              setOpenapprovalModal={setOpenapprovalModal}
              style={style}
            />
          )}
        </div>
        <hr />
        <br />
        <Card
          variant="outlined"
          sx={{ maxWidth: 150 }}
          style={{ backgroundColor: '#F1F9FF' }}>
          {card}
        </Card>
        <hr className={styles.hrmargins} />

        <p className={styles.giantitle}>기안내용</p>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.tdleft}>기안제목</td>
              <td colSpan={2} className={styles.tdright}>
                {' '}
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="기안제목을 입력하세요."
                    className={styles.inputtext}
                  />
                </form>
              </td>
            </tr>
          </thead>
        </table>

        <div className={styles.fonttext}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <TextField
              fullWidth
              multiline
              rows={10}
              placeholder="내용을 입력해주세요."
            />
          </Paper>

          <div className={styles.savebutton}>
            <Box sx={{ button: { m: 1 } }}>
              <Button variant="outlined" size="large">
                임시저장
              </Button>
              <SaveButton variant="contained" color="success" size="large">
                상신하기
              </SaveButton>
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default Report;
