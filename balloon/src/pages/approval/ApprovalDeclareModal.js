import * as React from 'react';
import { Link } from 'react-router-dom';
import { updateApproval, updateApvlDoc } from '../../context/ApprovalAxios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { getEmpByEmpId } from '../../context/EmployeeAxios';
import {
  botApvlChatroom2,
  onApvlCreateChatroom,
} from '../../context/ChatAxios';
import ChatStomp from '../chat/ChatStomp';
import axios from 'axios';
import BusinessReportForm from '../chat/BusinessReportForm';
import BusinessTripForm from '../chat/BusinessTripForm';
import PersonnelAppointmentForm from '../chat/PersonnelAppointmentForm';

//socket연결
const client = ChatStomp();

export default function ApprovalDeclareModal({
  style,
  openModal,
  setOpenModal,
  approver,
  apvlList,
  approvalList,
  paInfo,
}) {
  const [botInfo, setBotInfo] = useState([]);
  // 이미 결재봇과 채팅방이 존재하는 사원 찾기
  const [botApvl, setBotApvl] = useState([]);
  const approverBot = 'Y0000002';

  //////////////
  const handleClose = () => {
    setOpenModal(false);
  };

  const myIndex = approvalList.findIndex(
    (apvl) => apvl.approvalId === apvlList[0].approvalId
  );
  let approvedList = [];

  for (let index = myIndex; index > -1; index--) {
    approvedList.push(approvalList[index]);
  }

  const botroomExist = [];
  const botroomId = [];
  let apvlId = [];
  let apvlForm = [];
  let apvlTitle = [];
  let empName = [];
  let position = [];
  let apvlvisitPlace = [];
  let apvlvisitPurpose = [];
  let apvlMember = [];
  let apvlAppointDepart = [];
  let apvlAppointPosi = [];
  {
    apvlList.map((data) => {
      if (data && data.businessReport) {
        apvlId.push(data.approverEmp.id);
        apvlForm.push(data.businessReport.businessReportId);
        apvlTitle.push(data.businessReport.documentTitle);
        empName.push(data.businessReport.empName);
        position.push(data.businessReport.position);
      } else if (data && data.businessTrip) {
        apvlId.push(data.approverEmp.id);
        apvlForm.push(data.businessTrip.businessTripId);
        apvlTitle.push(data.businessTrip.documentTitle);
        apvlvisitPlace.push(data.businessTrip.destination);
        apvlvisitPurpose.push(data.businessTrip.documentContent);
        empName.push(data.businessTrip.empName);
        position.push(data.businessTrip.position);
      } else if (data && data.personnelAppointment) {
        apvlId.push(data.approverEmp.id);
        apvlForm.push(data.personnelAppointment.personnelAppointmentId);
        apvlTitle.push(data.personnelAppointment.documentTitle);
        apvlMember.push(data.personnelAppointment.movedEmpName);
        apvlAppointDepart.push(data.personnelAppointment.unitName);
        apvlAppointPosi.push(data.personnelAppointment.position);
        empName.push(data.drafterEmp.empName);
        position.push(data.drafterEmp.position);
      }
    });
  }

  let ApvlPeople = [apvlId[1]];
  console.log(ApvlPeople);

  let apvlFormName = [];
  {
    apvlForm.map((data) => apvlFormName.push(data.slice(0, 4)));
  }

  //결재봇정보가져오기
  useEffect(() => {
    getEmpByEmpId(approverBot, setBotInfo);
    botApvlChatroom2(ApvlPeople, setBotApvl);
  }, [apvlList.length]);

  //채팅방이 존재하는지 확인

  botApvl.map((data) => {
    botroomExist.push(data.empId.empId);
    botroomId.push(data.chatroomId.chatroomId);
  });

  console.log(botroomId);

  // 채팅방이 생성되어야할 사람들
  let newApvlPeople;
  newApvlPeople = ApvlPeople.filter((people) => !botroomExist.includes(people));

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
    let chatApproval = [];
    add.map((add) => {
      apvlList.map((data) => {
        if (data.businessReport !== undefined) {
          chatApproval = BusinessReportForm(
            add.chatroomId,
            botInfo,
            apvlTitle[0],
            apvlFormName[0],
            empName[0],
            position[0]
          );
          return chatApproval;
        } else if (data.businessTrip !== undefined) {
          chatApproval = BusinessTripForm(
            add.chatroomId,
            botInfo,
            apvlTitle[0],
            apvlFormName[0],
            apvlvisitPlace[0],
            apvlvisitPurpose[0],
            empName[0],
            position[0]
          );
          return chatApproval;
        } else if (data && data.personnelAppointment !== undefined) {
          chatApproval = PersonnelAppointmentForm(
            add.chatroomId,
            botInfo,
            apvlTitle[0],
            apvlFormName[0],
            apvlMember[0],
            apvlAppointDepart[0],
            apvlAppointPosi[0],
            empName[0],
            position[0]
          );
          return chatApproval;
        }
      });

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
    let chatApproval = [];
    botroomId.map((id) => {
      apvlList.map((data) => {
        if (data && data.businessReport !== undefined) {
          chatApproval = BusinessReportForm(
            id,
            botInfo,
            apvlTitle[0],
            apvlFormName[0],
            empName[0],
            position[0]
          );
          return chatApproval;
        } else if (data && data.businessTrip !== undefined) {
          chatApproval = BusinessTripForm(
            id,
            botInfo,
            apvlTitle[0],
            apvlFormName[0],
            apvlvisitPlace[0],
            apvlvisitPurpose[0],
            empName[0],
            position[0]
          );
          return chatApproval;
        } else if (data && data.personnelAppointment !== undefined) {
          chatApproval = PersonnelAppointmentForm(
            id,
            botInfo,
            apvlTitle[0],
            apvlFormName[0],
            apvlMember[0],
            apvlAppointDepart[0],
            apvlAppointPosi[0],
            empName[0],
            position[0]
          );
          return chatApproval;
        }
      });

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

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            결재 내용
          </Typography>
          <TextField
            id="apvlContent"
            fullWidth
            multiline
            rows={10}
            placeholder="내용을 입력해주세요."
          />
          <Box sx={{ '& button': { m: 1 } }}>
            <Button
              variant="contained"
              size="large"
              sx={{ my: 0.5 }}
              onClick={handleClose}>
              뒤로가기
            </Button>
            <Link
              to={'/boxes/ar'}
              onClick={async () => {
                updateApvlDoc([apvlList[0]], 4, paInfo);
                updateApproval(approvedList, 4);

                alert('문서를 반려 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                반려하기
              </Button>
            </Link>
            <Link
              to={'/boxes/ac'}
              onClick={async () => {
                if (!apvlList[1]) {
                  updateApvlDoc([apvlList[0]], 2, paInfo);
                  updateApproval(approvalList, 3);
                } else {
                  updateApvlDoc(apvlList, 5, paInfo);
                  updateApproval(apvlList, 2);
                  sendChatHandle();
                }
                alert('문서를 결재 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                결재하기
              </Button>
            </Link>
            {/* <Link
              to={'/boxes/ar'}
              onClick={async () => {
                approver.map((apvl) => {
                  updateApvlDoc(apvl, 4, paInfo);
                  updateApproval(apvl, 4);
                });
                alert('문서를 반려 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                반려하기
              </Button>
            </Link>
            <Link
              to={'/boxes/ac'}
              onClick={async () => {
                approver &&
                  approver.map((apvl) => {
                    updateApvlDoc(apvl, 2, paInfo);
                    updateApproval(apvl, 3);
                  });
                alert('문서를 결재 하였습니다!');
              }}>
              <Button variant="contained" size="large" sx={{ my: 0.5 }}>
                결재하기
              </Button>
            </Link> */}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
