import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UnitUpdate from './UnitUpdate';
import { updateCheck, deleteCheck } from '../../context/MuiRenderFunc';
import { findUnitList, updateUnit, deleteUnit } from '../../context/UnitAxios';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import SettingsIcon from '@mui/icons-material/Settings';
import Delete from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QueueIcon from '@mui/icons-material/Queue';

function ManagementUnit() {
  const [unitList, setUnitList] = useState([]);
  const [rowData, setRowData] = useState({});
  const [deleteChk, setDeleteChk] = useState(false);
  const [updateChk, setUpdateChk] = useState(false);
  const [openUpdate, setOpenUpdate] = useState({
    state: false,
    unitCode: null,
  });

  const handleClick = (data) => {
    setRowData(data.row);
    console.log(data.row);
  };

  const handleUpdate = (setUpdateChk) => {
    updateCheck(setUpdateChk);
  };

  const handleDelete = (setDeleteChk) => {
    deleteCheck(setDeleteChk);
  };

  useEffect(() => {
    if (unitList.length === 0) {
      findUnitList(setUnitList);
    } else {
      if (updateChk === true) {
        // <UnitUpdate
        //   unitCode={rowData.unitCode}
        //   setOpenUpdate={setOpenUpdate}
        // />;
        // updateUnit(rowData);
        // setUpdateChk(false);
      }
      if (deleteChk === true) {
        deleteUnit(rowData);
        setDeleteChk(false);
      }
    }
  }, [unitList, rowData, updateChk, deleteChk]);

  function GetParentUnit(data) {
    return data.row.parentUnit ? data.row.parentUnit.id : data.row.parentUnit;
  }

  const columns = [
    { field: 'unitCode', headerName: '조직번호', width: 200 },
    {
      field: 'unitName',
      headerName: '조직명',
      width: 180,
      //  editable: true
    },
    {
      field: 'bell',
      headerName: '조직 전화번호',
      width: 250,
      // editable: true,
    },
    {
      field: 'parentUnit',
      headerName: '상위조직',
      width: 300,
      // editable: true,
      valueGetter: GetParentUnit,
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
      <Container maxWidth="maxwidth">
        <Link to={'/add/unit'}>
          <AddBoxIcon fontSize="large" color="action" />
        </Link>
        <Link to={'/add/units'}>
          <QueueIcon fontSize="large" color="action" />
        </Link>

        <Box sx={{ width: '100%', height: 700, display: 'flex' }}>
          <DataGrid
            sx={{
              '	.MuiDataGrid-filterForm': {
                color: 'red',
              },
              justifyContent: 'center',
              alignContent: 'center',
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
