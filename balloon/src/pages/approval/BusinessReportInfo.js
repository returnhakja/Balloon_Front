import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import {
  getApvlByDocId,
  getBizRptByBizRptId,
} from '../../context/ApprovalAxios';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import { FcDocument } from 'react-icons/fc';
import { Button, Card, Container, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

function BizReportInfo() {
  // 사원 정보 context
  const [empInfo] = useOutletContext();
  // const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [bizRptInfo, setBizRptInfo] = useState({});
  const [approver, setApprover] = useState([]);
  const [apvl, setApvl] = useState({});

  const params = useParams();
  console.log(params);
  console.log(empInfo);
  console.log(bizRptInfo);

  useEffect(() => {
    if (!!params) {
      getBizRptByBizRptId(params.docId, setBizRptInfo);
      getApvlByDocId(params.docId, setApprover);
    }
  }, [params]);

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
        {/* {openModal && <Modal closeModal={setOpenModal} />} */}
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
            {bizRptInfo.length !== 0 && (
              <DfCard drafterName={bizRptInfo.empName} />
            )}
          </Card>
          {approver.map((empData, index) => {
            console.log(empData.approvalId);
            if (apvl.length === 0) {
              setApvl(empData);
            }
            return (
              <Card
                variant="outlined"
                sx={{ maxWidth: 150 }}
                style={{ backgroundColor: '#F1F9FF' }}
                key={index}>
                <ApCard approverName={empData.approverName} />
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
                {' '}
                {bizRptInfo.documentTitle}
                {/* <form>
                  <TextField
                    type="text"
                    name="title"
                    value={bizRptInfo.documentTitle}
                    className={styles.inputtext}
                    InputProps={{
                      readOnly: true,
                    }}
                    focused={false}
                  />
                </form> */}
                {/* <TextField />*/}
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
              <Link to="/boxes/dc">
                <SaveButton variant="contained" color="success" size="large">
                  목록으로
                </SaveButton>
              </Link>
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default BizReportInfo;
