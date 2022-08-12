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

import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import {
  selectEmployees,
  minusPage,
  plusPage,
  selectEmployeeByEmpId,
} from '../../context/EmployeeAxios';
import { Container } from '@mui/system';
import Delete from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';

function ManagementEmployee() {
  const [empList, setEmpList] = useState([]);
  const [rows, setRows] = useState(empList);

  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((rows) => rows.id !== id));
      });
    },
    []
  );
  // console.log(empList);

  const columns = [
    { field: 'empId', headerName: '사원번호', width: 130 },
    { field: 'empName', headerName: '이름', width: 90, editable: true },
    { field: 'position', headerName: '직위', width: 90, editable: true },
    { field: 'responsibility', headerName: '직책', width: 90 },
    { field: 'salary', headerName: '월급', width: 90, editable: true },
    { field: 'commission', headerName: '상여금', width: 90, editable: true },
    { field: 'hiredate', headerName: '고용일자', width: 100 },
    { field: 'unitName', headerName: '부서이름', width: 100, editable: true },
    {
      field: 'empBell',
      headerName: '사내전화번호',
      width: 130,
      editable: true,
    },
    { field: 'empMail', headerName: '개인이메일', width: 130, editable: true },
    { field: 'mobile', headerName: '전화번호', width: 130, editable: true },
    {
      field: 'userRoleGrade',
      headerName: '사원권한',
      width: 130,
      editable: true,
    },
    { field: 'birthday', headerName: '생일', width: 100 },
    { field: 'address', headerName: '집주소', width: 130, editable: true },
    {
      field: 'licensePlate',
      headerName: '차량번호',
      width: 90,
      editable: true,
    },
    { field: 'photo', headerName: '사진', width: 100, editable: true },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: () => [
        <GridActionsCellItem icon={<SettingsIcon />} label="update" />,
        <GridActionsCellItem icon={<Delete />} label="Delete" />,
      ],
    },
  ];

  useEffect(() => {
    selectEmployees(setEmpList);
    console.log(empList);
  }, []);
  return (
    <div style={{ marginTop: 70 }}>
      <Container maxWidth="maxWidth">
        <PersonAddIcon fontSize="large" color="action" />
        <div style={{ height: 500, width: '100%', marginBottom: 70 }}>
          <DataGrid
            rows={empList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      </Container>
    </div>
  );
}

export default ManagementEmployee;
