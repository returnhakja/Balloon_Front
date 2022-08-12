// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import {
//   selectEmployees,
//   minusPage,
//   plusPage,
// } from '../../context/EmployeeAxios';

// //ant Desing table
// import { Space, Table, Button, Pagination } from 'antd';
// import 'antd/dist/antd.css';
// import { Container } from '@mui/system';
// import { Link } from 'react-router-dom';

// // import './Test.css';

// // 여기까지
// const PaginationSpan = styled.span`
//   &[aria-current] {
//     background-color: black;
//     color: white;
//   }
// `;
// function ManagementEmployee() {
//   const [empList, setEmpList] = useState([]);
//   const [totalPages, settotalPage] = useState();
//   const [loading, setLoading] = useState(false);

//   console.log(empList);

//   // setLoading(true);
//   useEffect(() => {
//     selectEmployees(setEmpList);
//     // settotalPage(empList.totalPages);
//   }, []);
//   const [bottomcenter, setBottomCenter] = useState('bottomcenter');
//   const data = [
//     {
//       title: '사원번호',
//       dataIndex: 'empId',
//       key: '1',
//     },
//     {
//       title: '이름',
//       dataIndex: 'empName',
//       key: '2',
//     },
//     {
//       title: '직위',
//       dataIndex: 'position',
//       key: '3',
//     },
//     {
//       title: '직책',
//       key: '4',
//       dataIndex: 'responsibility',
//     },
//     {
//       title: '월급',
//       key: '5',
//       dataIndex: 'salary',
//       sorter: (a, b) => a.salary - b.salary,
//     },
//     {
//       title: '상여금',
//       key: '6',
//       dataIndex: 'commission',
//     },
//     {
//       title: '고용일자',
//       key: '7',
//       dataIndex: 'hiredate',
//     },
//     {
//       title: '부서 이름',
//       key: '8',
//       dataIndex: ['unit', 'unitName'],
//     },
//     {
//       title: '사내전화번호',
//       key: '9',
//       dataIndex: 'empBell',
//     },
//     {
//       title: '개인 이메일',
//       key: '10',
//       dataIndex: 'empMail',
//     },
//     {
//       title: '전화번호',
//       key: '11',
//       dataIndex: 'mobile',
//     },
//     {
//       title: '사원 권한',
//       key: '12',
//       dataIndex: 'userRoleGrade',
//     },
//     {
//       title: '생일',
//       key: '13',
//       dataIndex: 'birthday',
//     },
//     {
//       title: '집주소',
//       key: '14',
//       dataIndex: 'address',
//     },
//     {
//       title: '차량 번호',
//       key: '15',
//       dataIndex: 'licensePlate',
//     },
//     {
//       title: '사진',
//       key: '16',
//       dataIndex: 'photo',
//     },
//     {
//       title: '수정',
//       key: '17',
//       render: () => {
//         return <Button>수정</Button>;
//       },
//     },
//     {
//       title: '삭제',
//       key: 'delete',
//       render: () => {
//         return <Button>삭제</Button>;
//       },
//     },
//   ];
//   return (
//     <Container maxWidth>
//       <br />
//       <Space>
//         <Button type="primary">추가</Button>
//       </Space>
//       <Table
//         // loading={{ indicator: <div>loading...</div> }}
//         columns={data}
//         dataSource={empList}
//         pagination={{
//           position: [bottomcenter],
//           pageSize: 10,
//           total: totalPages,
//         }}
//         // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
//       />
//     </Container>
//   );
// }

// export default ManagementEmployee;

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  selectEmployees,
  minusPage,
  plusPage,
  selectEmployeeByEmpId,
} from '../../context/EmployeeAxios';
import { Container } from '@mui/system';

function ManagementEmployee() {
  const [empList, setEmpList] = useState([]);

  // console.log(empList);

  const columns = [
    { field: 'empId', headerName: '사원번호', width: 130 },
    { field: 'empName', headerName: '이름', width: 130 },
    { field: 'position', headerName: '직위', width: 130 },
    { field: 'responsibility', headerName: '직책', width: 130 },
    { field: 'salary', headerName: '월급', width: 130 },
    { field: 'commission', headerName: '상여금', width: 130 },
    { field: 'hiredate', headerName: '고용일자', width: 130 },
    { field: 'unitName', headerName: '부서이름', width: 130 },
    { field: 'empBell', headerName: '사내전화번호', width: 130 },
    { field: 'empMail', headerName: '개인이메일', width: 130 },
    { field: 'mobile', headerName: '전화번호', width: 130 },
    { field: 'userRoleGrade', headerName: '사원권한', width: 130 },
    { field: 'birthday', headerName: '생일', width: 130 },
    { field: 'address', headerName: '집주소', width: 130 },
    { field: 'licensePlate', headerName: '차량번호', width: 130 },
    { field: 'photo', headerName: '사진', width: 130 },
  ];
  console.log('aaa');

  // setLoading(true);
  useEffect(() => {
    selectEmployees(setEmpList);
    console.log(empList);
  }, []);
  return (
    <Container maxWidth="maxWidth">
      {console.log('ddd')}
      <div style={{ height: 1000, width: '100%' }}>
        {console.log('ddd')}
        <DataGrid
          rows={empList}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
}

export default ManagementEmployee;
