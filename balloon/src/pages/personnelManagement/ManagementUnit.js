import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UnitUpdate from './UnitUpdate';
import { deleteCheck } from '../../context/MuiRenderFunc';
import { findUnitList, deleteUnit } from '../../context/UnitAxios';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import SettingsIcon from '@mui/icons-material/Settings';
import Delete from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import QueueIcon from '@mui/icons-material/Queue';
import UnitAddpage from './UnitAddpage';

function ManagementUnit() {
  const [unitList, setUnitList] = useState([]);
  const [rowData, setRowData] = useState({});
  const [deleteChk, setDeleteChk] = useState(false);
  const [open, setOpen] = useState(false);
  const [openInsert, setOpenInsert] = useState(false);

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
    if (unitList.length === 0) {
      findUnitList(setUnitList);
    } else {
      if (deleteChk === true) {
        deleteUnit(rowData);
        setDeleteChk(false);
      }
    }
  }, [unitList, rowData, deleteChk]);

  function GetParentUnit(data) {
    return data.row.parentUnit ? data.row.parentUnit.id : data.row.parentUnit;
  }

  const columns = [
    { field: 'unitCode', headerName: '조직번호', width: 200 },
    {
      field: 'unitName',
      headerName: '조직명',
      width: 180,
    },
    {
      field: 'bell',
      headerName: '조직 전화번호',
      width: 250,
    },
    {
      field: 'parentUnit',
      headerName: '상위조직',
      width: 300,
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
      <Container maxWidth="maxwidth">
        <AddBoxIcon
          fontSize="large"
          color="action"
          onClick={() => {
            setOpenInsert(true);
          }}
        />
        {openInsert && (
          <UnitAddpage openInsert={openInsert} setOpenInsert={setOpenInsert} />
        )}

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
        {open && (
          <UnitUpdate
            open={open}
            setOpen={setOpen}
            unitCode={rowData.unitCode}
          />
        )}
      </Container>
    </div>
  );
}

export default ManagementUnit;
