import React, { useEffect, useState } from 'react';
import {
  selectEmployees,
  updateCheck,
  updateEmployee,
  deleteCheck,
  deleteEmployee,
} from '../../context/EmployeeAxios';
import {
  DataGrid,
  GridEditSingleSelectCell,
  GridActionsCellItem,
  useGridApiContext,
  GridToolbar,
} from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Delete from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link } from 'react-router-dom';

const CustomTypeEditComponent = (props) => {
  const apiRef = useGridApiContext();

  const handleValueChange = async () => {
    await apiRef.current.setEditCellValue({
      id: props.id,
      field: 'account',
      value: '',
    });
  };

  return (
    <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />
  );
};

CustomTypeEditComponent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

function ManagementEmployee() {
  const [empList, setEmpList] = useState([]);
  const [rowData, setRowData] = useState({});
  const [deleteChk, setDeleteChk] = useState(false);
  const [updateChk, setUpdateChk] = useState(false);

  const handleClick = (data) => {
    setRowData(data.row);
  };

  const handleUpdate = (setUpdateChk) => {
    updateCheck(setUpdateChk);
  };

  const handleDelete = (setDeleteChk) => {
    deleteCheck(setDeleteChk);
  };

  useEffect(() => {
    selectEmployees(setEmpList);
  }, []);

  useEffect(() => {}, [rowData]);

  useEffect(() => {
    if (updateChk === true) {
      updateEmployee(rowData);
      setUpdateChk(false);
    }
  }, [updateChk]);

  useEffect(() => {
    if (deleteChk === true) {
      deleteEmployee(rowData);
      setDeleteChk(false);
    }
  }, [deleteChk]);

  const columns = [
    { field: 'empId', headerName: '사원번호', width: 100 },
    { field: 'empName', headerName: '이름', width: 80, editable: true },
    {
      field: 'position',
      headerName: '직위',
      type: 'singleSelect',
      valueOptions: ({ empList }) => {
        if (!empList) {
          return [
            '인턴',
            '사원',
            '주임',
            '대리',
            '과장',
            '차장',
            '부장',
            '이사',
            '상무',
            '전무',
            '부사장',
            '사장',
            '부회장',
            '이사회 의장',
            '회장',
          ];
        }
      },
      width: 90,
      editable: true,
    },
    {
      field: 'responsibility',
      headerName: '직책',
      type: 'singleSelect',
      valueOptions: ({ empList }) => {
        if (!empList) {
          return [
            '없음',
            '파트장',
            '팀장',
            '지점장',
            '본부장',
            '그룹장',
            '부서장',
            '사업부장',
            '부문장',
            '센터장',
            '실장',
            '임원',
            '상근고문',
            '고문',
            'CIO',
            'COO',
            'CMO',
            'CFO',
            'CTO',
            'CEO',
          ];
        }
      },
      width: 90,
      editable: true,
    },
    { field: 'salary', headerName: '월급', width: 80, editable: true },
    { field: 'commission', headerName: '상여금', width: 80, editable: true },
    { field: 'hiredate', headerName: '고용일자', width: 100 },
    { field: 'unitName', headerName: '조직이름', width: 100, editable: true },
    {
      field: 'empBell',
      headerName: '사내전화번호',
      width: 120,
      editable: true,
    },
    { field: 'empMail', headerName: '개인이메일', width: 130, editable: true },
    { field: 'mobile', headerName: '전화번호', width: 130, editable: true },
    {
      field: 'userRoleGrade',
      headerName: '사원권한',
      type: 'singleSelect',
      valueOptions: ({ empList }) => {
        if (!empList) {
          return ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'];
        }
      },
      width: 130,
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
        <GridActionsCellItem
          icon={<SettingsIcon />}
          label="update"
          onClick={() => {
            handleUpdate(setUpdateChk);
          }}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => {
            handleDelete(setDeleteChk);
          }}
        />,
      ],
    },
  ];

  return (
    <div style={{ marginTop: 70, marginBottom: 50 }}>
      <Container maxWidth="maxWidth">
        <Link to={'/add/employee'}>
          <PersonAddIcon fontSize="large" color="action" />
        </Link>
        <Box sx={{ width: '100%', height: 700 }}>
          <DataGrid
            sx={{
              '	.MuiDataGrid-filterForm': {
                color: 'red',
              },
            }}
            rows={empList}
            columns={columns}
            editMode="row"
            experimentalFeatures={{ newEditingApi: true }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            onCellClick={(data) => {
              handleClick(data);
            }}

            sx={{
              '	.MuiDataGrid-filterForm': {
                color: 'red',
              },
            }}

          />
        </Box>
      </Container>
    </div>
  );
}

export default ManagementEmployee;
