import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function MyPage() {
  const [empInfo] = useOutletContext();

  useEffect(() => {
    console.log(empInfo);
  }, []);

  return (
    <div>
      <h1>마이페이지</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ margin: '10px' }}>
          <img src={empInfo.photo} alt="회원 사진" />
        </div>
        <div style={{ margin: '10px' }}>
          <div>
            <span>사원명: </span>
            <span>{empInfo.empName}</span>
          </div>
          <div>
            <span>직위: </span>
            <span>{empInfo.position}</span>
          </div>
          <div>
            <span>직책: </span>
            <span>{empInfo.responsibility}</span>
          </div>
          <div>
            <span>입사 일자: </span>
            <span>{empInfo.hiredate}</span>
          </div>
          <div>
            <span>월급: </span>
            <span>{empInfo.salary}</span>
          </div>
          <div>
            <span>상여금: </span>
            <span>{empInfo.commission}</span>
          </div>
          <div>
            <span>전화번호: </span>
            <span>{empInfo.empBell}</span>
          </div>
          {/* <div>
            <span>주소: </span>
            <span>{empInfo.address}</span>
          </div>
          <div>
            <span>차량번호판: </span>
            <span>{empInfo.licensePlate }</span>
          </div> */}
          <div>
            <span>부서명: </span>
            <span>{empInfo.unit.unitName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
