import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { selectEmployees, deleteEmployee } from '../../context/EmployeeAxios';
import { deleteCheck } from '../../context/MuiRenderFunc';
import { positionArr, responseArr, gradeArr } from '../../context/EmpFunc';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  koKR,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Delete from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import EmployeeUpdate from './EmployeeUpdate';
import CustomToolbar from './CustomToolbar';

function ManagementEmployee() {
  const [empList, setEmpList] = useState([]);
  const [rowData, setRowData] = useState({});
  const [deleteChk, setDeleteChk] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = (data) => {
    setRowData(data.row);
  };

  const handleUpdate = () => {
    setOpen(true);
  };

  const handleDelete = (setDeleteChk) => {
    deleteCheck(setDeleteChk);
  };

  useEffect(() => {
    if (empList.length === 0) {
      selectEmployees(setEmpList);
    } else {
      if (deleteChk === true) {
        Object.keys(rowData).length !== 0 && deleteEmployee(rowData);
        setDeleteChk(false);
      }
    }
  }, [empList, deleteChk, rowData]);

  const columns = [
    { field: 'empId', headerName: '사원번호', width: 100 },
    { field: 'empName', headerName: '이름', width: 80, editable: true },
    {
      field: 'position',
      headerName: '직위',
      type: 'singleSelect',
      valueOptions: ({ empList }) => {
        if (!empList) {
          return positionArr;
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
          return responseArr;
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
          return gradeArr;
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
            handleUpdate();
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

        <Link to={'/add/employees'}>
          <GroupAddIcon
            fontSize="large"
            color="action"
            style={{ marginLeft: '20px' }}
          />
        </Link>

        <Box sx={{ width: '100%', height: 700 }}>
          <DataGrid
            localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              '	.MuiDataGrid-filterForm': {
                color: 'red',
              },
            }}
            rows={empList}
            columns={columns}
            getRowId={(row) => row.empId}
            editMode="row"
            experimentalFeatures={{ newEditingApi: true }}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{ Toolbar: CustomToolbar }}
            checkboxSelection
            onCellClick={(data) => {
              handleClick(data);
            }}
          />
        </Box>
        {open && (
          <EmployeeUpdate open={open} setOpen={setOpen} empId={rowData.empId} />
        )}
      </Container>
    </div>
  );
}

export default ManagementEmployee;
