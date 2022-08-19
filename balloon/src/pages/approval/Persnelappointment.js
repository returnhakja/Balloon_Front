import React, { useEffect, useState } from 'react';
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

function Pointment() {
  const positionArr = [
    '인턴',
    '사원',
    '주임',
    '대리',
    '과장',
    '차장',
    '부장',
    '이사',
    '상무',
    '전무',
    '부사장',
    '사장',
    '부회장',
    '이사회 의장',
    '회장',
  ];
  const [posi, setPosi] = useState('');
  const [units, setUnits] = useState('');
  const [unit, setUnit] = useState('');

  // 날짜 관련
  const [startValue, setStartValue] = useState(null);

  // 모달
  // const [openModal, setOpenModal] = useState(false);
  const [openapprovalModal, setOpenapprovalModal] = useState(false);

  // 사원 정보 context
  const [empInfo, setEmpInfo] = useOutletContext();
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    findUnitList(setUnits);
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
          인사명령
        </p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>인사명령</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>
                <input id="PAId"></input>
              </th>
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
          <Modalapproval
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
                    id="PATitle"
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
              <td className={styles.titlename}>인사명령일</td>
              <td className={styles.titlename} colSpan={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="일자 선택"
                    value={startValue}
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
                <input
                  id="movedEmpName"
                  type="text"
                  name="title"
                  placeholder="구성원명을 입력하세요."
                  className={styles.inputtext}
                />
              </td>
              <td className={styles.tdreaui}>
                <FormControl fullWidth>
                  <InputLabel>부서를 설정해주세요</InputLabel>
                  <Select
                    id="unit"
                    label="발령부서를 선택하세요"
                    value={unit}
                    placeholder=" 발령부서를 선택하세요"
                    onChange={(e) => {
                      setUnit(e.target.value);
                      console.log(unit);
                    }}

                    // className={styles.inputtext}
                  >
                    {units &&
                      units.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </td>
              <td className={styles.tdreaui}>
                <FormControl fullWidth>
                  <InputLabel>직위를 설정해주세요</InputLabel>
                  <Select
                    id="position"
                    label="발령직위를 선택하세요"
                    value={posi}
                    placeholder=" 발령직위를 선택하세요"
                    onChange={(e) => {
                      setPosi(e.target.value);
                      console.log(posi);
                    }}

                    // className={styles.inputtext}
                  >
                    {positionArr.map((position) => (
                      <MenuItem key={position} value={position}>
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

export default Pointment;
