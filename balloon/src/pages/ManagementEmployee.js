import React, { useEffect, useState } from 'react';
import {
  selectEmployeeList,
  minusPage,
  plusPage,
} from '../context/EmployeeAxios';
import styled from 'styled-components';

const PaginationSpan = styled.span`
  &[aria-current] {
    background-color: black;
    color: white;
  }
`;

function ManagementEmployee() {
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    selectEmployeeList(setEmpList);
  }, []);

  return (
    <div>
      <h2>사원</h2>
      <br />
      <div id="empAllList">
        {empList.dtoList && empList.dtoList.length !== 0 ? (
          <table>
            <thead>
              <tr>
                <td>사원번호</td>
                <td>이 름</td>
                <td>직위</td>
                <td>직책</td>
                <td>월급</td>
                <td>상여금</td>
                <td>고용일자</td>
                <td>부서 이름</td>
                <td>사내번호</td>
                <td>개인 이메일</td>
                <td>전화번호</td>
                <td>사원 권한</td>
                <td>생일</td>
                <td>집 주소</td>
                <td>차량 번호</td>
                <td>사진</td>
                <td>UPDATE</td>
                <td>DELETE</td>
              </tr>
            </thead>
            <tbody>
              {empList.dtoList.map((data) => {
                console.log(data);
                return (
                  <tr key={data.empId}>
                    <td>{data.empId}</td>
                    <td>{data.empName}</td>
                    <td>{data.position}</td>
                    <td>{data.responsibility}</td>
                    <td>{data.salary}</td>
                    <td>{data.commission}</td>
                    <td>{data.hiredate}</td>
                    <td>{data.unit.unitName}</td>
                    <td>{data.empBell}</td>
                    <td>{data.empMail}</td>
                    <td>{data.mobile}</td>
                    <td>{data.userRoleGrade}</td>
                    <td>{data.birthday}</td>
                    <td>{data.licensePlate}</td>
                    <td>{data.photo}</td>
                    <td>
                      <input
                        type="button"
                        value="수정"
                        onClick={() => {
                          // moveUpdate(data.deptno);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="button"
                        value="삭제"
                        onClick={async () => {
                          // await deleteByDeptno(
                          //   data.deptno,
                          //   deleteCheck,
                          //   setDeleteCheck
                          // );
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>테이블이 없습니다.</p>
        )}
        <div>
          {empList.prev && (
            <button
              onClick={() => {
                minusPage(page, setPage);
              }}>
              prev
            </button>
          )}
          {empList.pageList &&
            empList.pageList.map((number) => {
              return (
                <PaginationSpan
                  key={number}
                  onClick={(e) => {
                    setPage(e.target.id);
                  }}
                  aria-current={page == number ? 'page' : null}>
                  {number} <span> </span>
                </PaginationSpan>
              );
            })}
          {empList.next && (
            <button onClick={() => plusPage(page, setPage)}>next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagementEmployee;
