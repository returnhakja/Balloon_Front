import React, { useEffect, useState } from 'react';
import { updateCheck, deleteCheck } from '../../context/MuiRenderFunc';
import { findUnitList, updateUnit, deleteUnit } from '../../context/UnitAxios';
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
  const [unitList, setUnitList] = useState([]);
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
    findUnitList(setUnitList);
  }, []);

  useEffect(() => {
    if (unitList.length !== 0) {
      console.log(unitList);
      unitList.map((row) => {
        const wo = row.parentUnit;
        return console.log(wo);
        // return wo.map((row) => console.log(row));
        // return console.log( wo.unitCode)
      });
    }
  }, [unitList]);

  useEffect(() => {}, [rowData]);

  useEffect(() => {
    if (updateChk === true) {
      updateUnit(rowData);
      setUpdateChk(false);
    }
  }, [updateChk]);

  useEffect(() => {
    if (deleteChk === true) {
      deleteUnit(rowData);
      setDeleteChk(false);
    }
  }, [deleteChk]);

  const columns = [
    { field: 'unitCode', headerName: '조직번호', width: 200 },
    { field: 'unitName', headerName: '조직명', width: 180, editable: true },
    {
      field: 'bell',
      headerName: '조직 전화번호',
      width: 250,
      editable: true,
    },
    {
      field: 'parentUnit',
      headerName: '상위조직',
      width: 300,
      editable: true,
    },
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
        <Link to={'/add/unit'}>
          <PersonAddIcon fontSize="large" color="action" />
        </Link>

        <Link to={'/add/units'}>
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
            getRowId={(row) => row.unitCode}
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
