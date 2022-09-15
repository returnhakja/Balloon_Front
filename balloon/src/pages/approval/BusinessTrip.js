import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import ModalApproval from './ModalApproval';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import {
  getLatestBizTP,
  insertApproval,
  insertBizTp,
  insertBizTpEmp,
} from '../../context/ApprovalAxios';
import axios from 'axios';
import ChatStomp from '../chat/ChatStomp';
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

import { getEmpByEmpId } from '../../context/EmployeeAxios';
import { botApvlChatroom, onApvlCreateChatroom } from '../../context/ChatAxios';
import BusinessTripForm from '../chat/BusinessTripForm';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';

//socket연결
const client = ChatStomp();

const SaveButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  },
}));

function BusinessTrip() {
  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endValue, setEndValue] = useState(null);
  const [inputData, setInputData] = useState({});
  const [docNum, setDocNum] = useState(0);
  const [docId, setDocId] = useState('');
  const [approver, setApprover] = useState([]);
  const [noApprover, setNoApprover] = useState([]);
  const [mEmpInfo, setMEmpInfo] = useState('');
  const [mEmp, setMEmp] = useState('');
  const [apvlInfo, setApvlInfo] = useState([]);
  const [botInfo, setBotInfo] = useState([]);

  // 모달
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  // 사원 정보 context
  const [empInfo] = useOutletContext();

  //이미 존재하는 사람들
  const [botApvlRoom, setBotApvlRoom] = useState([]);
  //결재선설정empId
  const apvlPeople = [];
  const approverBot = 'Y0000002';
  const empName = empInfo.empName;
  const position = empInfo.position;
  const approvalForm = '출장계획서';

  //기안제목
  const approvalTitle =
    document.getElementById('bizTpTitle') &&
    document.getElementById('bizTpTitle').value;
  //방문처
  const visitPlace =
    document.getElementById('destination') &&
    document.getElementById('destination').value;
  //방문목적
  const visitPurpose =
    document.getElementById('visitingPurpose') &&
    document.getElementById('visitingPurpose').value;

  //결재선설정empIdList
  {
    approver.map((empId) => apvlPeople.push(empId.empId));
  }

  //결재봇정보가져오기
  useEffect(() => {
    getEmpByEmpId(approverBot, setBotInfo);
    botApvlChatroom(apvlPeople, setBotApvlRoom);
  }, [apvlPeople.length]);

  const botroomExist = [];
  const botroomId = [];
  botApvlRoom.map((data) => {
    botroomExist.push(data.empId.empId);
    botroomId.push(data.chatroomId.chatroomId);
  });

  //새로운 채팅방이 생성되어야할 사람들
  let newApvlPeople;
  newApvlPeople = apvlPeople.filter((people) => !botroomExist.includes(people));

  const sendChatHandle = () => {
    onApvlCreateChatroom(
      newApvlPeople,
      client,
      approverBot,
      AlreadyBotroomMsg,
      botroomMsg
    );
  };

  //생성될 채팅방에 알림보내기
  const botroomMsg = (add, client) => {
    let chatApprovalList = [];
    add.map((add) => {
      const chatApproval = BusinessTripForm(
        add.chatroomId,
        botInfo,
        approvalTitle,
        approvalForm,
        visitPlace,
        visitPurpose,
        empName,
        position
      );
      const approvalChat = {
        chatroomId: add.chatroomId,
        writer: botInfo,
        chatContent: '결재가 등록되었습니다.',
      };

      //실시간으로 chat이 오기위해
      client.send('/app/chat/schedulemsg', {}, JSON.stringify(chatApproval));
      client.send('/app/chat/schedulemsg', {}, JSON.stringify(approvalChat));

      chatApprovalList.push(chatApproval);
      chatApprovalList.push(approvalChat);
    });

    const chatApprovalSave = (chatApprovalList) => {
      axios.post('/chat/messages', chatApprovalList);
    };
    chatApprovalSave(chatApprovalList);
  };

  // 이미생성된 채팅방에 알림보내기
  const AlreadyBotroomMsg = (client) => {
    let AlreadyChatApproval = [];
    botroomId.map((id) => {
      const AchatApproval = BusinessTripForm(
        id,
        botInfo,
        approvalTitle,
        approvalForm,
        visitPlace,
        visitPurpose,
        empName,
        position
      );

      const chatNewApproval = {
        chatroomId: id,
        writer: botInfo,
        chatContent: '새로운 결재가 등록되었습니다. 확인하세요',
      };

      client.send('/app/chat/schedulemsg', {}, JSON.stringify(AchatApproval));
      client.send('/app/chat/schedulemsg', {}, JSON.stringify(chatNewApproval));

      AlreadyChatApproval.push(AchatApproval);
      AlreadyChatApproval.push(chatNewApproval);
    });
    const chatScheduleSave = (AlreadyChatApproval) => {
      axios.post('/chat/messages', AlreadyChatApproval);
    };

    chatScheduleSave(AlreadyChatApproval);
  };

  let startDate = startValue && document.getElementById('startValue').value;
  let endDate = endValue && document.getElementById('endValue').value;

  useEffect(() => {
    if (mEmpInfo.length === 0) {
      getEmpListInSameUnit(empInfo.empId, setMEmpInfo);
    }
    if (docNum === 0) {
      getLatestBizTP(setDocNum);
      setDocId('출장계획-22-0000001');
    } else {
      setDocId('출장계획' + '-22-' + ('0000000' + (docNum + 1)).slice(-7));
    }

    if (noApprover.length === 0) {
      setNoApprover(noApprover);
    }
  }, [docNum, noApprover]);

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
              <th className={styles.th}>{docId}</th>
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
          </tbody>
        </table>

        <div className={styles.body1}>
          <span className={styles.subtitle}>결재선</span>
          <button
            type="button"
            className={styles.btnnav}
            onClick={() => {
              setOpenapprovalModal(true);
            }}
            id="cancelBtn">
            결재선설정
          </button>
        </div>

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
                <FormControl fullWidth>
                  <InputLabel>구성원을 설정해주세요</InputLabel>
                  <Select
                    id="mEmp"
                    label="구성원을 선택하세요"
                    value={mEmp}
                    placeholder="구성원을 선택하세요"
                    onChange={(e) => {
                      setMEmp(e.target.value);
                    }}

                    // className={styles.inputtext}
                  >
                    {mEmpInfo.length !== 0 &&
                      mEmpInfo.map((mEmps, index) => (
                        <MenuItem key={index} value={mEmps}>
                          {mEmps.empName} ({mEmps.empId})
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
                  <TextField
                    id="startValue"
                    label="시작일"
                    type="date"
                    defaultValue={startValue}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {/* <DatePicker
                    label="시작일"
                    value={startValue}
                    type=" date"
                    inputFormat={'yyyy-MM-dd'}
                    onChange={(newValue) => {
                      setStartValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  /> */}
                </LocalizationProvider>

                <span className={styles.centerfont}> : </span>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TextField
                    id="endValue"
                    label="종료일"
                    type="date"
                    defaultValue={endValue}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {/* <DatePicker
                    label="끝나는일"
                    value={endValue}
                    inputFormat={'yyyy-MM-dd'}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  /> */}
                </LocalizationProvider>
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <input
                    id="destination"
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
                    id="visitingPurpose"
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
              id="bizTpContent"
              fullWidth
              multiline
              rows={10}
              placeholder="내용을 입력해주세요."
            />
          </Paper>

          <div className={styles.savebutton}>
            <Box sx={{ '& button': { m: 1 } }}>
              <Link to={'/boxes/ds'}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={async () => {
                    await insertBizTp(
                      docId,
                      3,
                      inputData,
                      empInfo,
                      startDate,
                      endDate,
                      setInputData
                    );

                    // approver.map((data, index) => {
                    //   return insertApproval(docId, 0, data, inputData, empInfo);
                    // });
                    insertApproval(docId, 0, approver, inputData, empInfo);
                    insertBizTpEmp(docId, mEmp);
                    alert('문서가 임시저장되었습니다!');
                  }}>
                  임시저장
                </Button>
              </Link>
              <Link
                to={'/boxes/dd'}
                onClick={async (e) => {
                  if (approver.length !== 0) {
                    await insertBizTp(
                      docId,
                      1,
                      inputData,
                      empInfo,
                      startDate,
                      endDate,
                      setInputData
                    );
                    sendChatHandle();
                    alert('문서가 상신되었습니다!');
                  } else {
                    alert('결재선을 설정해주세요 !');
                    e.preventDefault();
                  }
                  // approver.map((data, index) => {
                  //   return insertApproval(docId, 1, data, inputData, empInfo);
                  // });
                  insertApproval(docId, 1, approver, inputData, empInfo);
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

export default BusinessTrip;
