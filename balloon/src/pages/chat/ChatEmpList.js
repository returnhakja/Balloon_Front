import React, { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';

import Button from '@mui/material/Button';
import { Checkbox, Grid } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

function ChatEmpList({ invite, setInvite }) {
  const [chatEmpList, setCEList] = useState([]);

  const [empInfo, setEmpInfo] = useOutletContext();

  const empId = empInfo.empId;

  // 사원list 출력하기
  useEffect(() => {
    getEmpListInSameUnit(empId, setCEList);
    console.log(chatEmpList);
  }, []);

  //초대할 사원을 담아두는 메소드
  // const [invite, setInvite] = useState([]);
  const onInvite = (checked, data) => {
    if (checked) {
      setInvite([...invite, data]);
      console.log(invite);
    } else {
      setInvite(invite.filter((button) => button !== data));
    }
  };

  return (
    <div>
      <Link to={'/chatroom'}>채팅목록 이동</Link>
      <Grid container justifyContent="flex-end">
        <Button className="chatIcon">
          <Link to={'/createroom'}>
            <ChatIcon />
          </Link>
        </Button>
      </Grid>
      <br />
      <br />
      <div></div>
      <ol>
        {chatEmpList.map((ce, index) => {
          // console.log(ce.empId);
          return (
            <div key={index} style={{ border: '1px solid black' }}>
              <img src={ce.photo} alt="사원 이미지" />
              {'  '}
              <span>{ce.empName}</span> {'  '}
              <span>{ce.position}</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  onInvite(e.currentTarget.checked, ce.empId);
                }}
                checked={invite.includes(ce.empId) ? true : false}
              />
            </div>
          );
        })}
      </ol>
    </div>
  );
}

export default ChatEmpList;
