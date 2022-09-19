import React, { useEffect, useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Component.module.css';
import { Container } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import 'react-datepicker/dist/react-datepicker.css';
import { getApvlByApvrIdAnddocStatus } from '../../context/ApprovalAxios';
import { Link, useOutletContext } from 'react-router-dom';
import moment from 'moment';

function ApprovalComplete() {
  const [empInfo] = useOutletContext();
  const [docList, setDocList] = useState([]);
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  useEffect(() => {
    getApvlByApvrIdAnddocStatus(empInfo.empId, 3, setDocList);
  }, []);

  function getdocId(params) {
    let documentId = params.row.docId;
    if (documentId.includes('업무기안')) {
      return (
        <Link
          to={`/apvl/acbr/${params.row.docId}`}
          state={{ path: '/boxes/ao' }}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('출장계획')) {
      return (
        <Link
          to={`/apvl/actp/${params.row.docId}`}
          state={{ path: '/boxes/ao' }}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('인사명령')) {
      return (
        <Link
          to={`/apvl/acpa/${params.row.docId}`}
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
