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
import PersonAddIcon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
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

function ManagementUnit() {
  const [unitList, setEnitList] = useState([]);
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
    // selectEmployees(setEmpList);
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
    { field: 'unitCode', headerName: '조직번호', width: 100 },
    { field: 'unitName', headerName: '조직명', width: 80, editable: true },
    {
      field: 'bell',
      headerName: '조직 전화번호',
      width: 90,
      editable: true,
    },
    {
      field: 'parentUnit',
      headerName: '상위조직',
      width: 90,
      editable: true,
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
            sx={{
              '	.MuiDataGrid-filterForm': {
                color: 'red',
              },
            }}
            rows={unitList}
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
          />
        </Box>
      </Container>
    </div>
  );
}

export default ManagementUnit;
