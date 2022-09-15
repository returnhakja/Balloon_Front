import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import ModalApproval from './ModalApproval';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { FcDocument } from 'react-icons/fc';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { blue } from '@mui/material/colors';
import { findUnitList } from '../../context/UnitAxios';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import {
  getApvlByDocId,
  getLatestPA,
  getPAByPAId,
  insertApproval,
  insertPA,
} from '../../context/ApprovalAxios';
import ApprovalDeclareModal from './ApprovalDeclareModal';
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

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

function PAApprovalDeclare() {
  const [empInfo] = useOutletContext();
  const [paInfo, setPaInfo] = useState({});
  const [approver, setApprover] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [apvl, setApvl] = useState({});
  const [approvalList, setApprovalList] = useState([]);

  const params = useParams();

  useEffect(() => {
    !!params && getPAByPAId(params.docId, setPaInfo);
    getApvlByDocId(params.docId, setApprover, setApprovalList);
  }, [params]);

  const myIndex = approvalList.findIndex(
    (apvl) => apvl.approverEmp.empId === empInfo.empId
  );
  let apvlList = [];

  apvlList.push(approvalList[myIndex], approvalList[myIndex + 1]);

  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>
          <FcDocument />
          인사명령
        </p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>인사명령</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>{paInfo.personnelAppointmentId}</th>
            </tr>
          </thead>

          <tbody>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>보존연한</td>
              <td className={styles.td}>5년</td>
              <td className={styles.tdleft}>기안자</td>
              <th className={styles.th}>
                {' '}
                {paInfo.empName}({paInfo.emp && paInfo.emp.empId})
              </th>
            </tr>
            <tr align="center" bgcolor="white"></tr>
          </tbody>
        </table>
        <div className={styles.body1}>
          <span className={styles.subtitle}>결재선</span>
        </div>
        {/* {openModal && <Modal closeModal={setOpenModal} />} */}

        <hr />
        <br />
        <div className={styles.approvalCard}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 150 }}
            style={{ backgroundColor: '#F1F9FF' }}>
            {!!paInfo && <DfCard drafterName={paInfo.empName} />}
          </Card>
          {approver.map((empData, index) => {
            console.log(empData);
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
              <td className={styles.tdleft}>기안제목</td>
              <td colSpan={2} className={styles.tdright}>
                {' '}
                {paInfo.documentTitle}
              </td>
            </tr>
          </thead>
        </table>
        <br />
        {/* 여기부터는 상세내용 */}

        <table className={styles.tableborder}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.titlename}>인사명령일</td>
              <td className={styles.titlename} colSpan={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disabled
                    label="명령 일자"
                    value={paInfo.personnelDate && paInfo.personnelDate}
                    type=" date"
                    inputFormat={'yyyy-MM-dd'}
                    className={styles.datepicker}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </td>
            </tr>
          </thead>
          <tbody className={styles.tbodyin}>
            <tr className={styles.trcolor}>
              <td className={styles.tdreaui}>구성원명</td>
              <td className={styles.tdreaui}>발령부서</td>
              <td className={styles.tdreaui}>발령직위</td>
            </tr>

            <tr>
              <td className={styles.tdreaui}>
                <TextField
                  focused={false}
                  type="text"
                  name="title"
                  value={paInfo.movedEmpName}
                  className={styles.inputtext}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <TextField
                    focused={false}
                    type="text"
                    name="title"
                    value={paInfo.unit && paInfo.unit.unitName}
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
                    type="text"
                    name="title"
                    value={paInfo.position}
                    className={styles.inputtext}
                    focused={false}
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
              value={paInfo.documentContent}
              focused={false}
              InputProps={{
                readOnly: true,
              }}
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
                  paInfo={paInfo}
                />
              )}
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default PAApprovalDeclare;
