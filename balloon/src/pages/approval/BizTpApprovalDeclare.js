import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import ApprovalDeclareModal from './ApprovalDeclareModal';
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
import {
  getApvlByApvrIdAnddocStatus,
  getApvlByDocId,
  getBizRptByBizRptId,
  getBizTpByBizTpId,
} from '../../context/ApprovalAxios';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ApCard, DfCard } from './approvalCards/DrafterApproverCard';

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

function BizTpApprovalDeclare() {
  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [inputData, setInputData] = useState({});
  const [docNum, setDocNum] = useState(0);
  const [docId, setDocId] = useState('');
  const [approver, setApprover] = useState([]);
  const [noApprover, setNoApprover] = useState([]);
  const [apvl, setApvl] = useState({});

  // 사원 정보 context
  const [empInfo] = useOutletContext();
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [bizTpInfo, setBizTpInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [approvalList, setApprovalList] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (!!params) {
      if (Object.keys(inputData).length === 0) {
        getBizTpByBizTpId(params.docId, setBizTpInfo);
        getApvlByDocId(params.docId, setApprover, setApprovalList);
      } else {
        setStartValue(inputData.startDate);
        setEndValue(inputData.endDate);
      }
    }
  }, [params, inputData, startValue, endValue, approver.length]);

  const myIndex = approvalList.findIndex(
    (apvl) => apvl.approverEmp.empId === empInfo.empId
  );
  let apvlList = [];

  apvlList.push(approvalList[myIndex], approvalList[myIndex + 1]);

  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>
          <FcDocument /> 결재전
        </p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>출장계획서</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>{bizTpInfo.businessTripId}</th>
            </tr>
          </thead>

          <tbody>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>보존연한</td>
              <td className={styles.td}>5년</td>
              <td className={styles.tdleft}>기안자</td>
              <th className={styles.th}>
                {bizTpInfo.empName}({bizTpInfo.emp && bizTpInfo.emp.empId})
              </th>
            </tr>
            <tr align="center" bgcolor="white"></tr>
          </tbody>
        </table>

        <div className={styles.body1}>
          <span className={styles.subtitle}>결재선</span>
        </div>
        <hr />
        <br />
        <div className={styles.approvalCard}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 150 }}
            style={{ backgroundColor: '#F1F9FF' }}>
            {!!empInfo && <DfCard drafterName={bizTpInfo.empName} />}
          </Card>
          {approver.map((empData, index) => {
            if (apvl.length === 0) {
              setApvl(empData);
            }

            return (
              <Card
                key={index}
                variant="outlined"
                sx={{ maxWidth: 150 }}
                style={{ backgroundColor: '#F1F9FF' }}>
                <ApCard approverName={empData.empName} />
              </Card>
            );
          })}
        </div>
        <hr className={styles.hrmargins} />

        <p className={styles.giantitle}>기안내용</p>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.tdleftpadding}>기안제목</td>
              <td colSpan={2} className={styles.tdright}>
                {bizTpInfo.documentTitle}
              </td>
            </tr>
          </thead>
        </table>
        <table className={styles.tableborder}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.titlename}>신청자 정보</td>
              <td className={styles.titlename} colSpan={2}>
                {bizTpInfo.empName} ({bizTpInfo.emp && bizTpInfo.emp.empId})
              </td>
            </tr>
          </thead>
          <tbody className={styles.tbodyin}>
            <tr align="center">
              <td className={styles.titlename}>동반 출장자</td>
              <td className={styles.titlename} colSpan={2}>
                이거 일단 없음
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
                    value={bizTpInfo.startValue && bizTpInfo.startValue}
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
                    value={bizTpInfo.endvalue && bizTpInfo.endvalue}
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
                  <TextField
                    focused={false}
                    type="text"
                    name="title"
                    value={bizTpInfo.destination}
                    className={styles.inputtext}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </form>
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <TextField
                    focused={false}
                    type="text"
                    name="title"
                    value={bizTpInfo.visitingPurpose}
                    className={styles.inputtext}
                    InputProps={{
                      readOnly: true,
                    }}
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
              value={bizTpInfo.documentContent}
              InputProps={{
                readOnly: true,
              }}
              focused={false}
            />
          </Paper>

          <div className={styles.savebutton}>
            <Box sx={{ button: { m: 1 } }}>
              <Link to="/boxes/ab">
                <SaveButton variant="contained" color="success" size="large">
                  목록으로
                </SaveButton>
              </Link>

              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={() => {
                  setOpenModal(true);
                }}>
                결재하기
              </Button>
              {openModal && (
                <ApprovalDeclareModal
                  style={style}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  approver={approver}
                  apvlList={apvlList}
                  approvalList={approvalList}
                />
              )}
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default BizTpApprovalDeclare;
