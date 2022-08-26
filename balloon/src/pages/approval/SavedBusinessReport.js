import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import ModalApproval from './ModalApproval';
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
  deleteBizRpt,
  getApvlByDocId,
  getBizRptByBizRptId,
  getLatestBizRpt,
  insertApproval,
  insertBizRpt,
} from '../../context/ApprovalAxios';

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

function SavedBusinessReport() {
  // 사원 정보 context
  const [empInfo, setEmpInfo] = useOutletContext();
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [inputData, setInputData] = useState({});
  const [approver, setApprover] = useState([]);

  const params = useParams();

  console.log(empInfo);

  useEffect(() => {
    getBizRptByBizRptId(params.docId, setInputData);
    getApvlByDocId(params.docId, setApprover);
    console.log(inputData);
  }, []);

  const DfCard = (
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

  const ApCard = (empName) => (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 25 }}
          color="#00AAFF"
          gutterBottom
          textAlign="center">
          결재자
        </Typography>
        <hr />
        <br />
        <Typography
          sx={{ fontSize: 20 }}
          variant="h5"
          component="div"
          textAlign="center">
          {empName}
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
              <th className={styles.th}>{inputData.businessReportId}</th>
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
            <ModalApproval
              openapprovalModal={openapprovalModal}
              setOpenapprovalModal={setOpenapprovalModal}
              style={style}
            />
          )}
        </div>
        <hr />
        <br />
        <div className={styles.approvalCard}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 150 }}
            style={{ backgroundColor: '#F1F9FF' }}>
            {DfCard}
          </Card>
          {approver.map((empData, index) => {
            console.log(empData);
            // if (apvl.length === 0) {
            //   setApvl(empData);
            // }

            return (
              <Card
                variant="outlined"
                sx={{ maxWidth: 150 }}
                style={{ backgroundColor: '#F1F9FF' }}
                key={index}>
                {ApCard(empData.approverName)}
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
                {' '}
                <form>
                  <input
                    id="bizRptTitle"
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
              id="bizRptContent"
              fullWidth
              multiline
              rows={10}
              defaultValue={inputData.documentContent}
            />
          </Paper>

          <div className={styles.savebutton}>
            <Box sx={{ button: { m: 1 } }}>
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
                    await deleteBizRpt(params.docId);
                  }}>
                  삭제하기
                </Button>
              </Link>
              <Link to={'/boxes/ds'}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={async () => {
                    await insertBizRpt(
                      params.docId,
                      3,
                      inputData,
                      empInfo,
                      setInputData
                    );
                    {
                      approver.map(async (data, index) => {
                        console.log(data);
                        console.log(index);
                        await insertApproval(
                          params.docId,
                          0,
                          data,
                          inputData,
                          empInfo
                        );
                      });
                    }
                    alert('문서가 임시저장되었습니다!');
                  }}>
                  임시저장
                </Button>
              </Link>
              <Link
                to={'/boxes'}
                onClick={async (e) => {
                  if (approver != 0) {
                    await insertBizRpt(
                      params.docId,
                      1,
                      inputData,
                      empInfo,
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
                      console.log(index);
                      insertApproval(params.docId, 1, data, inputData, empInfo);
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

export default SavedBusinessReport;
