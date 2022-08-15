import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import Modal from './Modal';
import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  TextField,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

function Trip() {
  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);

  // 모달
  // const [openModal, setOpenModal] = useState(false);
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  // 사원 정보 context
  const [empInfo, setEmpInfo] = useOutletContext();

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

  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>
          <FcDocument />
          출장계획서
        </p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>출장계획서</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>-</th>
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
        </div>
        {/* {openModal && <Modal closeModal={setOpenModal} />} */}
        {openapprovalModal && (
          <Modal
            openapprovalModal={openapprovalModal}
            setOpenapprovalModal={setOpenapprovalModal}
            style={style}
          />
        )}
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
        <br />
        {/* 여기부터는 상세내용 */}

        <table className={styles.tableborder}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.titlename}>기안제목</td>
              <td className={styles.titlename} colSpan={2}>
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
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.titlename}>신청자 정보</td>
              <td className={styles.titlename} colSpan={2}>
                검색어케함?
              </td>
            </tr>
          </thead>
          <tbody className={styles.tbodyin}>
            <tr align="center">
              <td className={styles.titlename}>동반 출장자</td>
              <td className={styles.titlename} colSpan={2}>
                {' '}
                위에꺼랑 똑같이하면 되는데
              </td>
              <td className={styles.titlename}></td>
            </tr>
            <tr align="center">
              <td colSpan={3} className={styles.tdmargin}>
                상세내용
              </td>
            </tr>

            <tr className={styles.trcolor}>
              <td className={styles.tdreaui}>방문기간</td>
              <td className={styles.tdreaui}>방문처</td>
              <td className={styles.tdreaui}>방문목적</td>
            </tr>

            <tr>
              <td className={styles.tdreaui}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="시작일"
                    value={startValue}
                    type=" date"
                    inputFormat={'yyyy-MM-dd'}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <span className={styles.centerfont}> : </span>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="끝나는일"
                    value={endvalue}
                    inputFormat={'yyyy-MM-dd'}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="방문처를 입력하세요"
                    className={styles.inputtext}
                  />
                </form>
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="방문 목적을 입력하세요"
                    className={styles.inputtext}
                  />
                </form>
              </td>
            </tr>
          </tbody>
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
            <Box sx={{ '& button': { m: 1 } }}>
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

export default Trip;
