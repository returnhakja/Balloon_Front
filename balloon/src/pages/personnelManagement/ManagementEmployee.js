import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  selectEmployees,
  minusPage,
  plusPage,
} from '../../context/EmployeeAxios';

//ant Desing table
import { Space, Table, Button, Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Container } from '@mui/system';

import 'antd/dist/antd.css';
import './Test.css';

// 여기까지
const PaginationSpan = styled.span`
  &[aria-current] {
    background-color: black;
    color: white;
  }
`;
function ManagementEmployee() {
  const [empList, setEmpList] = useState([]);
  const [totalPages, settotalPage] = useState();
  const [loading, setLoading] = useState(false);

  console.log(empList);

  // setLoading(true);
  useEffect(() => {
    selectEmployees(setEmpList);
    // settotalPage(empList.totalPages);
  }, []);
  const [bottomcenter, setBottomCenter] = useState('bottomcenter');
  const data = [
    {
      title: '사원번호',
      dataIndex: 'empId',
      key: 'empId',
    },
    {
      title: '이름',
      dataIndex: 'empName',
      key: 'empName',
    },
    {
      title: '직위',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '직책',
      key: 'responsibility',
      dataIndex: 'responsibility',
    },
    {
      title: '월급',
      key: 'salary',
      dataIndex: 'salary',
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: '상여금',
      key: 'commission',
      dataIndex: 'commission',
    },
    {
      title: '고용일자',
      key: 'hiredate',
      dataIndex: 'hiredate',
    },
    {
      title: '부서 이름',
      key: 'unitName',
      dataIndex: ['unit', 'unitName'],
    },
    {
      title: '사내전화번호',
      key: 'empBell',
      dataIndex: 'empBell',
    },
    {
      title: '개인 이메일',
      key: 'empMail',
      dataIndex: 'empMail',
    },
    {
      title: '전화번호',
      key: 'mobile',
      dataIndex: 'mobile',
    },
    {
      title: '사원 권한',
      key: 'userRoleGrade',
      dataIndex: 'userRoleGrade',
    },
    {
      title: '생일',
      key: 'birthday',
      dataIndex: 'birthday',
    },
    {
      title: '집주소',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: '차량 번호',
      key: 'licensePlate',
      dataIndex: 'licensePlate',
    },
    {
      title: '사진',
      key: 'photo',
      dataIndex: 'photo',
    },
    {
      title: '수정',
      render: () => {
        return <Button>수정</Button>;
      },
    },
    {
      title: '삭제',
      render: () => {
        return <Button>삭제</Button>;
      },
    },
  ];
  return (
    <Container maxWidth="xl">
      <Space>
        <Button type="primary" dataIndex="Update">
          추가
        </Button>
      </Space>
      <Table
        columns={data}
        dataSource={empList}
        pagination={{
          position: [bottomcenter],
          pageSize: 10,
          total: totalPages,
        }}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
      />
    </Container>

    //  </div>
  );
}

export default ManagementEmployee;
