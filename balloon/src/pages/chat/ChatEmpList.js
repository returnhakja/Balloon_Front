import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { getEmpListInSameUnit } from '../../context/EmployeeAxios';
function ChatEmpList() {
  const [chatEmpList, setCEList] = useState([]);
  const [setEmpId, empInfo, setEmpInfo] = useOutletContext();

  useEffect(() => {
    getEmpListInSameUnit(empInfo.empId, setCEList);
    console.log(chatEmpList);
  }, []);

  return (
    <div>
      <Link to={'/chatroom'}>채팅목록 이동</Link>
      <br />
      <br />
      <ol>
        {chatEmpList.map((ce, index) => {
          return (
            <div key={index} style={{ border: '1px solid black' }}>
              <img src={ce.photo} alt="사원 이미지" />
              <a>
                {'  '}
                <span>{ce.empName}</span> {'  '}
                <span>{ce.position}</span>
              </a>
            </div>
          );
        })}
      </ol>
    </div>
  );
}

export default ChatEmpList;
