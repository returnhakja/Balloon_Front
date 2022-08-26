import React, { useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Component.module.css';
import { Container } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import 'react-datepicker/dist/react-datepicker.css';

function ApprovalComplete() {
  const [docList, setDocList] = useState([]);
  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);

  //기안양식
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

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
          <p className={styles.sasinfont}>완료된</p>
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
      </SideNavigation>
    </>
  );
}

export default ApprovalComplete;
