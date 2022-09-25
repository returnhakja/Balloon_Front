import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import ModalApproval from './ModalApproval';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import {
  deleteApvlByDocIdAndEmpId,
  deleteBizTp,
  deleteBizTpEmp,
  getApvlByDocId,
  getBizTpByBizTpId,
  getBizTpEmpByBizTpId,
  insertApproval,
  insertBizTp,
  insertBizTpEmp,
} from '../../context/ApprovalAxios';
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
import { blue } from '@mui/material/colors';
import {
  getEmpByEmpId,
  getEmpListInSameUnit,
} from '../../context/EmployeeAxios';
import { botApvlChatroom, onApvlCreateChatroom } from '../../context/ChatAxios';
import BusinessTripForm from '../chat/BusinessTripForm';
import axios from 'axios';
import ChatStomp from '../chat/ChatStomp';

//socket연결
const client = ChatStomp();
client.debug = null;

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
  const [startValue, setStartValue] = useState(inputData.startDate);
  const [endValue, setEndValue] = useState(inputData.endDate);
  const [approver, setApprover] = useState([]);
  const [noApprover, setNoApprover] = useState([]);
  const [svApprover, setSvApprover] = useState([]);
  const [approvalList, setApprovalList] = useState([]);
  const [bizTpEmp, setBizTpEmp] = useState({});
  const [mEmpInfo, setMEmpInfo] = useState('');
  const [mEmp, setMEmp] = useState({});
  const [mEmp2, setMEmp2] = useState('');

  //이미 존재하는 사람들
  const [botApvlRoom, setBotApvlRoom] = useState([]);
  //결재선설정empId
  const [botInfo, setBotInfo] = useState([]);
  const apvlPeople = [];
  const approverBot = 'Y0000002';
  const empName = empInfo.empName;
  const position = empInfo.position;
  const approvalForm = '출장계획';
  const params = useParams();
  let rmApprover = [];
  const botroomExist = [];
  const botroomId = [];

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

  let firstApvlPeople;
  firstApvlPeople = apvlPeople.filter(
    (data, index) => data.indexOf(data[0]) === index
  );

  //결재봇정보가져오기
  useEffect(() => {
    getEmpByEmpId(approverBot, setBotInfo);
    botApvlChatroom(firstApvlPeople, setBotApvlRoom);
  }, [apvlPeople.length]);

  botApvlRoom.map((data) => {
    botroomExist.push(data.empId.empId);
    botroomId.push(data.chatroomId.chatroomId);
  });

  //새로운 채팅방이 생성되어야할 사람들
  let newApvlPeople;
  newApvlPeople = firstApvlPeople.filter(
    (people) => !botroomExist.includes(people)
  );

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

  //////////////////////////////
  useEffect(() => {
    getEmpListInSameUnit(empInfo.empId, setMEmpInfo);
    getApvlByDocId(params.docId, setApprover, setApprovalList, setSvApprover);

    getBizTpEmpByBizTpId(params.docId, setBizTpEmp);

    setStartValue(inputData.startDate);
    setEndValue(inputData.endDate);
    if (bizTpEmp[0]) {
      setMEmp2(bizTpEmp[0].emp.empName + ' (' + bizTpEmp[0].emp.empId + ')');
    }
  }, [inputData, bizTpEmp.length]);

  useEffect(() => {
    if (!!params) {
      if (Object.keys(inputData).length === 0) {
        getBizTpByBizTpId(params.docId, setInputData);
      }
      if (noApprover.length === 0) {
        setNoApprover(noApprover);
      }
    }
    let arr = [];
    approver.map((data) => {
      arr.push(data.empId);
    });
    rmApprover = svApprover.filter((element) => !arr.includes(element.empId));
  }, [params, inputData, startValue, endValue, approver]);

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
        <div style={{ border: '1px solid black' }} />
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
                    defaultValue={inputData.documentTitle}
                    className={styles.inputtext1}
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
                    value={mEmp2}
                    placeholder="구성원을 선택하세요"
                    onChange={(e) => {
                      setMEmp2(e.target.value);
                    }}

                    // className={styles.inputtext}
                  >
                    {mEmpInfo.length !== 0 &&
                      mEmpInfo.map((mEmps, index) => (
                        <MenuItem
                          key={index}
                          value={mEmps.empName + ' (' + mEmps.empId + ')'}>
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
                <TextField
                  id="startValue"
                  label="시작일"
                  type="date"
                  value={!!startValue && startValue}
                  sx={{ width: 250 }}
                  onChange={(e) => {
                    setStartValue(e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <span className={styles.centerfont}> : </span>
                <TextField
                  id="endValue"
                  label="종료일"
                  type="date"
                  value={!!endValue && endValue}
                  onChange={(e) => {
                    setEndValue(e.target.value);
                  }}
                  sx={{ width: 250 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </td>
              <td className={styles.tdreaui}>
                <form>
                  <input
                    id="destination"
                    type="text"
                    name="destination"
                    defaultValue={inputData.destination}
                    className={styles.inputtext1}
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
                    className={styles.inputtext1}
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
                    svApprover.map((data) =>
                      deleteApvlByDocIdAndEmpId(params.docId, data.empId)
                    );
                    deleteBizTpEmp(params.docId);
                    if (mEmp2) {
                      insertBizTpEmp(params.docId, mEmp2);
                    }
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
                      insertApproval(
                        params.docId,
                        0,
                        approver,
                        inputData,
                        empInfo,
                        approvalList
                      );
                    }
                    alert('문서가 임시저장되었습니다!');
                  }}>
                  임시저장
                </Button>
              </Link>

              <Link
                to="/boxes/dd"
                onClick={async (e) => {
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
                    deleteBizTpEmp(params.docId);
                    if (mEmp2) {
                      insertBizTpEmp(params.docId, mEmp2);
                    }
                    {
                      svApprover.map((data) =>
                        deleteApvlByDocIdAndEmpId(params.docId, data.empId)
                      );
                      insertApproval(
                        params.docId,
                        1,
                        approver,
                        inputData,
                        empInfo,
                        approvalList
                      );
                      sendChatHandle();
                    }
                    alert('문서가 상신되었습니다!');
                  } else {
                    alert('결재선을 설정해주세요 !');
                    e.preventDefault();
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
