import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import ModalApproval from './ModalApproval';
import SideNavigation from '../../components/SideNavigation';
import { DfCard, ApCard } from './approvalCards/DrafterApproverCard';
import {
  deleteApvlByDocIdAndEmpId,
  deleteBizRpt,
  getApvlByDocId,
  getBizRptByBizRptId,
  insertApproval,
  insertBizRpt,
} from '../../context/ApprovalAxios';
import ChatStomp from '../chat/ChatStomp';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import { FcDocument } from 'react-icons/fc';
import { Button, Card, Container, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { getEmpByEmpId } from '../../context/EmployeeAxios';
import { botApvlChatroom, onApvlCreateChatroom } from '../../context/ChatAxios';
import BusinessReportForm from '../chat/BusinessReportForm';
import axios from 'axios';

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

function SavedBusinessReportInfo() {
  // 사원 정보 context
  const [empInfo] = useOutletContext();
  const [openapprovalModal, setOpenapprovalModal] = useState(false);
  const [inputData, setInputData] = useState({});
  const [approver, setApprover] = useState([]);
  const [noApprover, setNoApprover] = useState([]);
  const [svApprover, setSvApprover] = useState([]);
  const [approvalList, setApprovalList] = useState([]);
  const [botInfo, setBotInfo] = useState([]);
  // 이미 결재봇과 채팅방이 존재하는 사원 찾기
  const [botApvlRoom, setBotApvlRoom] = useState([]);
  //결재선설정empId
  const apvlPeople = [];
  const approverBot = 'Y0000002';
  const empName = empInfo.empName;
  const position = empInfo.position;
  const approvalForm = '업무기안';
  const botroomExist = [];
  const botroomId = [];
  const params = useParams();
  let rmApprover = [];

  //기안제목
  const approvalTitle =
    document.getElementById('bizRptTitle') &&
    document.getElementById('bizRptTitle').value;

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

  //채팅방이 존재하는지 확인
  botApvlRoom.map((data) => {
    botroomExist.push(data.empId.empId);
    botroomId.push(data.chatroomId.chatroomId);
  });

  // 채팅방이 생성되어야할 사람들
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

  //처음 생성될 채팅방에 알림보내기
  const botroomMsg = (add, client) => {
    let chatApprovalList = [];
    add.map((add) => {
      const chatApproval = BusinessReportForm(
        add.chatroomId,
        botInfo,
        approvalTitle,
        approvalForm,
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

      const chatApprovalSave = (chatApprovalList) => {
        axios.post('/chat/messages', chatApprovalList);
      };
      chatApprovalSave(chatApprovalList);
    });
  };

  // 이미생성된 채팅방에 알림보내기
  const AlreadyBotroomMsg = (client) => {
    let AlreadyChatApproval = [];
    botroomId.map((id) => {
      const chatApproval = BusinessReportForm(
        id,
        botInfo,
        approvalTitle,
        approvalForm,
        empName,
        position
      );

      const chatNewApproval = {
        chatroomId: id,
        writer: botInfo,
        chatContent: '새로운 결재가 생성되었습니다. 확인하세요',
      };

      client.send('/app/chat/schedulemsg', {}, JSON.stringify(chatApproval));
      client.send('/app/chat/schedulemsg', {}, JSON.stringify(chatNewApproval));

      AlreadyChatApproval.push(chatApproval);
      AlreadyChatApproval.push(chatNewApproval);

      const chatScheduleSave = (AlreadyChatApproval) => {
        axios.post('/chat/messages', AlreadyChatApproval);
      };
      chatScheduleSave(AlreadyChatApproval);
    });
  };

  useEffect(() => {
    getApvlByDocId(params.docId, setApprover, setApprovalList, setSvApprover);
  }, []);
  useEffect(() => {
    if (!!params) {
      if (Object.keys(inputData).length === 0) {
        getBizRptByBizRptId(params.docId, setInputData);
        if (noApprover.length === 0) {
          setNoApprover(noApprover);
        }
      }
    }
    let arr = [];
    approver.map((data) => {
      arr.push(data.empId);
    });
    rmApprover = svApprover.filter((element) => !arr.includes(element.empId));
  }, [params, inputData, approver]);

  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>
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
        </div>
        <div style={{ border: '1px solid black' }} />
        <br />
        <div className={styles.approvalCard}>
          <Card
            variant="outlined"
            sx={{ maxWidth: 150 }}
            style={{ backgroundColor: '#F1F9FF' }}>
            <DfCard drafterName={empInfo.empName} />
          </Card>
          {approver.map((empData, index) => {
            return (
              <Card
                variant="outlined"
                sx={{ maxWidth: 150 }}
                style={{ backgroundColor: '#F1F9FF' }}
                key={index}>
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
              <Link to={'/boxes/ds'}>
                <Button variant="outlined" size="large">
                  목록으로
                </Button>
              </Link>
              <Link to={'/boxes/ds'}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={async () => {
                    await deleteBizRpt(params.docId);
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
                    await insertBizRpt(
                      params.docId,
                      3,
                      inputData,
                      empInfo,
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
                to={'/boxes/dd'}
                onClick={async (e) => {
                  if (approver.length !== 0) {
                    svApprover.map((data) =>
                      deleteApvlByDocIdAndEmpId(params.docId, data.empId)
                    );
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
                  }
                  {
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

export default SavedBusinessReportInfo;
