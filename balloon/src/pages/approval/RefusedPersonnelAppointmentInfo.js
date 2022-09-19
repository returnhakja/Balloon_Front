import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import ModalApproval from './ModalApproval';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import { findUnitList } from '../../context/UnitAxios';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
import {
  deletePA,
  getApvlByDocId,
  getPAByPAId,
  insertPA,
} from '../../context/ApprovalAxios';
import { positionArr } from '../../context/EmpFunc';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import { FcDocument } from 'react-icons/fc';
import {
  Button,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { blue } from '@mui/material/colors';

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

function RefusedPersonnelAppointmentInfo() {
  const [posi, setPosi] = useState('');
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState({});
  const [unit2, setUnit2] = useState('');
  const [mEmpInfo, setMEmpInfo] = useState('');
  const [mEmp, setMEmp] = useState({});
  const [mEmp2, setMEmp2] = useState('');
  const [startValue, setStartValue] = useState(null);
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [empInfo] = useOutletContext();
  const [inputData, setInputData] = useState({});
  const [approver, setApprover] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (!inputData.personnelAppointmentId) {
      findUnitList(setUnits);
      getEmpListInSameUnit(empInfo.empId, setMEmpInfo);
      getPAByPAId(params.docId, setInputData);
    } else {
      setPosi(inputData.position);
    }
  }, [inputData.personnelAppointmentId]);

  useEffect(() => {
    if (Object.keys(inputData).length !== 0) {
      getApvlByDocId(params.docId, setApprover);
      setStartValue(inputData.personnelDate);
      setMEmp(inputData.movedEmpId);
      setUnit(inputData.unit);
    }
    if (startValue !== null) {
    }
  }, [inputData, startValue]);

  useEffect(() => {}, [mEmpInfo]);

  useEffect(() => {
    Object.keys(mEmp).length !== 0 &&
      setMEmp2(mEmp.empName + ' (' + mEmp.empId + ')');
  }, [mEmp]);

  useEffect(() => {
    Object.keys(unit).length !== 0 &&
      setUnit2(unit.unitName + ' (' + unit.unitCode + ')');
  }, [unit]);

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
              <th className={styles.th}>{inputData.personnelAppointmentId}</th>
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
        </div>
        <hr />
        <br />
        <div className={styles.approvalCard}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 150 }}
            style={{ backgroundColor: '#F1F9FF' }}>
            {!!inputData && <DfCard drafterName={inputData.empName} />}
          </Card>
          {approver.map((empData, index) => {
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
                {inputData.documentTitle}
              </td>
            </tr>
          </thead>
        </table>
        <br />

        <table className={styles.tableborder}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.titlename}>인사명령일</td>
              <td className={styles.titlename} colSpan={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disabled
                    label="일자 선택"
                    value={!!startValue && startValue}
                    type=" date"
                    inputFormat={'yyyy-MM-dd'}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
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
                <FormControl fullWidth>
                  <InputLabel>구성원을 설정해주세요</InputLabel>
                  {Object.keys(mEmp).length !== 0 && (
                    <Select
                      id="mEmp"
                      label="구성원을 선택하세요"
                      value={mEmp2}
                      // defaultValue={mEmp2}
                      placeholder="구성원을 선택하세요"
                      onChange={(e) => {
                        setMEmp2(e.target.value);
                      }}

                      // className={styles.inputtext}
                    >
                      {mEmpInfo &&
                        mEmpInfo.map((mEmps, index) => (
                          <MenuItem
                            key={index}
                            value={mEmps.empName + ' (' + mEmps.empId + ')'}>
                            {mEmps.empName} ({mEmps.empId})
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                </FormControl>
              </td>
              <td className={styles.tdreaui}>
                <FormControl fullWidth>
                  <InputLabel>부서를 설정해주세요</InputLabel>
                  {Object.keys(unit).length !== 0 && (
                    <Select
                      id="unit1"
                      label="발령부서를 선택하세요"
                      value={unit2}
                      placeholder=" 발령부서를 선택하세요"
                      onChange={(e) => {
                        setUnit2(e.target.value);
                      }}

                      // className={styles.inputtext}
                    >
                      {units &&
                        units.map((unitInfo, index) => (
                          <MenuItem
                            key={index}
                            value={
                              unitInfo.unitName + ' (' + unitInfo.unitCode + ')'
                            }>
                            {unitInfo.unitName} ({unitInfo.unitCode})
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                </FormControl>
              </td>
              <td className={styles.tdreaui}>
                <FormControl fullWidth>
                  <InputLabel defaultValue={inputData.position}>
                    직위를 설정해주세요
                  </InputLabel>
                  <Select
                    id="position"
                    label="발령직위를 선택하세요"
                    value={posi}
                    placeholder=" 발령직위를 선택하세요"
                    defaultValue={inputData.position}
                    onChange={(e) => {
                      setPosi(e.target.value);
                    }}

                    // className={styles.inputtext}
                  >
                    {positionArr.map((position, index) => (
                      <MenuItem key={index} value={position}>
                        {position}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              id="PAContent"
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
                    await deletePA(params.docId);
                  }}>
                  삭제하기
                </Button>
              </Link>

              <SaveButton
                variant="contained"
                color="success"
                size="large"
                onClick={async () => {
                  await insertPA(
                    params.docId,
                    1,
                    inputData,
                    empInfo,
                    startValue,
                    mEmp,
                    unit,
                    posi,
                    setInputData
                  );
                  window.location.href = '/boxes';
                }}>
                재상신하기
              </SaveButton>
            </Box>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default RefusedPersonnelAppointmentInfo;
