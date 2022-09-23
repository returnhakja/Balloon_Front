import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../css/Component.module.css';
import { DataGrid, GridToolbar, koKR } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import { Link, useOutletContext } from 'react-router-dom';
import { getApvlByApvrIdAnddocStatus } from '../../context/ApprovalAxios';

import CustomToolbar from '../personnelManagement/CustomToolbar';

import moment from 'moment';

function ApprovalOngoing() {
  const [empInfo] = useOutletContext();
  const [docList, setDocList] = useState([]);

  // 날짜 관련
  // const [startValue, setStartValue] = useState(null);
  // const [endvalue, setEndValue] = useState(null);

  //기안양식
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  function getdocId(params) {
    let documentId = params.row.docId;
    if (documentId.includes('업무기안')) {
      return (
        <Link
          to={`/apvl/aobr/${params.row.docId}`}
          state={{ path: '/boxes/ao' }}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('출장계획')) {
      return (
        <Link
          to={`/apvl/aotp/${params.row.docId}`}
          state={{ path: '/boxes/ao' }}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('인사명령')) {
      return (
        <Link
          to={`/apvl/aopa/${params.row.docId}`}
          state={{ path: '/boxes/ao' }}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else {
      alert('있었는데 아니 없어요.');
    }
  }

  const columns = [
    { field: 'docId', headerName: '문서번호', width: 160 },
    {
      field: 'documentTitle',
      headerName: '문서제목',
      width: 350,
      renderCell: getdocId,
    },
    {
      field: 'updateTime',
      headerName: '처리일자',
      width: 160,
      valueFormatter: (params) =>
        moment(params?.value).format('YYYY/MM/DD HH:mm:ss'),
    },
  ];

  useEffect(() => {
    getApvlByApvrIdAnddocStatus(empInfo.empId, 2, setDocList);
  }, []);

  return (
    <>
      <SideNavigation>
        <Container>
          <p className={styles.sasinfont}>진행중</p>
          <br />
          <div style={{ border: '1px solid black' }} />

          <div style={{ height: 500, width: '100%', marginBottom: 70 }}>
            <DataGrid
              localeText={koKR.components.MuiDataGrid.defaultProps.localeText}
              getRowId={(docList) => docList.docId}
              rows={docList}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{ Toolbar: CustomToolbar }}
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

export default ApprovalOngoing;
