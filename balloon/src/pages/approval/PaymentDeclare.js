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
import { getBizRptByBizRptId } from '../../context/ApprovalAxios';
import PaymentDeclareModal from './PaymentDecalreModal';

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

function PaymentDeclare() {
  // 사원 정보 context
  const [empInfo, setEmpInfo] = useOutletContext();
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [bizRptInfo, setBizRptInfo] = useState({});

  const params = useParams();
  console.log(params);
  console.log(empInfo);
  console.log(bizRptInfo);

  useEffect(() => {
    getBizRptByBizRptId(params.docId, setBizRptInfo);
  }, []);

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
          {bizRptInfo.empName}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  const [openModal, setOpenModal] = useState(false);

  console.log(empInfo);
  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>
          {' '}
          <FcDocument /> 결재전
        </p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>업무기안</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>{bizRptInfo.businessReportId}</th>
            </tr>
          </thead>

          <tbody>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>보존연한</td>
              <td className={styles.td}>5년</td>
              <td className={styles.tdleft}>기안자</td>
              <th className={styles.th}>
                {' '}
                {bizRptInfo.empName}({bizRptInfo.emp && bizRptInfo.emp.empId})
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
              <td className={styles.tdleftpadding}>기안제목</td>
              <td colSpan={2} className={styles.tdright}>
                {' '}
                {bizRptInfo.documentTitle}
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
              value={bizRptInfo.documentContent}
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

              {/* <Link to="/boxes/ab"> */}
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
                <PaymentDeclareModal
                  style={style}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}
              {/* </Link> */}
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default PaymentDeclare;
