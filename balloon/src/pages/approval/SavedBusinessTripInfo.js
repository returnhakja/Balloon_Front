import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import ModalApproval from './ModalApproval';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import {
  deleteApvlByDocId,
  deleteApvlByDocIdAndEmpId,
  deleteBizTp,
  getApvlByDocId,
  getApvlId,
  getBizTpByBizTpId,
  insertApproval,
  insertBizTp,
} from '../../context/ApprovalAxios';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import { FcDocument } from 'react-icons/fc';
import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { blue } from '@mui/material/colors';
import { Typography } from 'antd';

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

function SavedBusinessTripInfo() {
  const [empInfo] = useOutletContext();
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [inputData, setInputData] = useState({});
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [approver, setApprover] = useState([]);
  const [noApprover, setNoApprover] = useState([]);
  const [svApprover, setSvApprover] = useState([]);

  const params = useParams();
  let rmApprover = [];

  useEffect(() => {
    getApvlByDocId(params.docId, setApprover, setSvApprover);
  }, []);

  useEffect(() => {
    if (!!params) {
      if (Object.keys(inputData).length === 0) {
        getBizTpByBizTpId(params.docId, setInputData);
        // getApvlByDocId(params.docId, setApprover);
      } else {
        setStartValue(inputData.startDate);
        setEndValue(inputData.endDate);
        approver.length !== 0 && console.log(approver);
      }
      if (noApprover.length === 0) {
        setNoApprover(noApprover);
      }
    }
    console.log(svApprover);
    let arr = [];
    approver.map((data) => {
      arr.push(data.empId);
      console.log(arr);
    });
    rmApprover = svApprover.filter((element) => !arr.includes(element.empId));
    console.log(rmApprover);
  }, [params, inputData, startValue, endValue, approver.length]);

  console.log(params.docId);
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
              <th className={styles.th}>{inputData.businessTripId}</th>
            </tr>
          </thead>

          <tbody>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>보존연한</td>
              <td className={styles.td}>5년</td>
              <td className={styles.tdleft}>기안자</td>
              <th className={styles.th}>
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
          <ModalApproval
            openapprovalModal={openapprovalModal}
            setOpenapprovalModal={setOpenapprovalModal}
            setApprover={setApprover}
            approver={approver}
            setNoApprover={setNoApprover}
            noApprover={noApprover}
          />
        )}
        <hr />
        <br />
        <div className={styles.approvalCard}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 150 }}
            style={{ backgroundColor: '#F1F9FF' }}>
            {!!empInfo && <DfCard drafterName={empInfo.empName} />}
          </Card>
          {approver.map((empData, index) => {
            console.log(empData);

            // if (apvl.length === 0) {
            //   setApvl(empData);
            // }

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
              <td className={styles.tdleft}>기안제목</td>
              <td colSpan={2} className={styles.tdright}>
                <form>
                  <input
                    id="bizTpTitle"
                    type="text"
                    name="title"
                    defaultValue={inputData.documentTitle}
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
              <td className={styles.titlename}>신청자 정보</td>
              <td className={styles.titlename} colSpan={2}>
                {empInfo.empName} ({empInfo.empId})
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
                    value={endValue}
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
                    id="destination"
                    type="text"
                    name="destination"
                    defaultValue={inputData.destination}
                    className={styles.inputtext}
                  />
                </form>
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <input
                    id="visitingPurpose"
                    type="text"
                    name="visitingPurpose"
                    defaultValue={inputData.visitingPurpose}
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
              id="bizTpContent"
              fullWidth
              multiline
              rows={10}
              defaultValue={inputData.documentContent}
            />
          </Paper>

          <div className={styles.savebutton}>
            <Box sx={{ '& button': { m: 1 } }}>
              <Link to="/boxes/ds">
                <Button variant="outlined" size="large">
                  목록으로
                </Button>
              </Link>
              <Link to="/boxes/ds">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={async () => {
                    await deleteBizTp(params.docId);
                    alert('문서가 삭제되었습니다!');
                  }}>
                  삭제하기
                </Button>
              </Link>
              <Link to={'/boxes/ds'}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={async () => {
                    await insertBizTp(
                      params.docId,
                      3,
                      inputData,
                      empInfo,
                      startValue,
                      endValue,
                      setInputData
                    );
                    {
                      if (rmApprover.length !== 0) {
                        rmApprover.map((data) =>
                          deleteApvlByDocIdAndEmpId(params.docId, data.empId)
                        );
                      }
                      approver.map((data, index) => {
                        console.log(data);
                        const approvalId = getApvlId(params.docId, data.empId);

                        if (approvalId !== null) {
                          approvalId.then((apvlId) => {
                            console.log(data);
                            insertApproval(
                              params.docId,
                              0,
                              data,
                              inputData,
                              empInfo,
                              apvlId
                            );
                          });
                        } else {
                          insertApproval(
                            params.docId,
                            0,
                            data,
                            inputData,
                            empInfo
                          );
                        }
                      });
                    }
                    alert('문서가 임시저장되었습니다!');
                  }}>
                  임시저장
                </Button>
              </Link>

              <Link
                to="/boxes"
                onClick={async (e) => {
                  console.log(startValue);
                  console.log(endValue);
                  if (approver.length !== 0) {
                    await insertBizTp(
                      params.docId,
                      1,
                      inputData,
                      empInfo,
                      startValue,
                      endValue,
                      setInputData
                    );
                    alert('문서가 상신되었습니다!');
                  } else {
                    alert('결재선을 설정해주세요 !');
                    e.preventDefault();
                  }
                  {
                    approver.map((data, index) => {
                      console.log(data);
                      const approvalId = getApvlId(params.docId, data.empId);
                      insertApproval(
                        params.docId,
                        1,
                        data,
                        inputData,
                        empInfo,
                        approvalId
                      );
                    });
                  }
                }}>
                <SaveButton variant="contained" color="success" size="large">
                  상신하기
                </SaveButton>
              </Link>
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default SavedBusinessTripInfo;
