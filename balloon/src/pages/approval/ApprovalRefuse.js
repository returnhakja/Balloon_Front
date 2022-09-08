import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../css/Component.module.css';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getApvlByApvrIdAnddocStatus } from '../../context/ApprovalAxios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom';

function ApprovalRefuse() {
  const [empInfo] = useOutletContext();
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);
  const [docList, setDocList] = useState([]);
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  useEffect(() => {
    getApvlByApvrIdAnddocStatus(empInfo.empId, 4, setDocList);
  }, []);

  const columns = [
    { field: 'docId', headerName: '문서번호', width: 160 },
    {
      field: 'documentTitle',
      headerName: '문서제목',
      width: 350,
      // renderCell: getdocId,
    },
    { field: 'updateTime', headerName: '처리일자', width: 160 },
  ];

  return (
    <>
      <SideNavigation>
        <Container>
          <p className={styles.sasinfont}>반려된</p>
          <br />
          <hr />

          <div style={{ height: 500, width: '100%', marginBottom: 70 }}>
            <DataGrid
              getRowId={(docList) => docList.docId}
              rows={docList}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{ Toolbar: GridToolbar }}
              initialState={{
                sorting: {
                  sortModel: [{ field: 'updateTime', sort: 'desc' }],
                },
              }}
            />
          </div>
        </Container>
      </SideNavigation>{' '}
    </>
  );
}

export default ApprovalRefuse;
