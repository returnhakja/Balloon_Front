import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import {
  getApvlByApvrIdAnddocStatus,
  getApvlByDocId,
} from '../../context/ApprovalAxios';
import styles from '../../css/Component.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { DataGrid, GridToolbar, koKR } from '@mui/x-data-grid';
import { Container } from '@mui/system';

import CustomToolbar from '../personnelManagement/CustomToolbar';

import moment from 'moment';

function ApprovalBefore() {
  const [empInfo] = useOutletContext();
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    getApvlByApvrIdAnddocStatus(empInfo.empId, 1, setDocList);
  }, []);

  function getdocId(params) {
    let documentId = params.row.docId;
    if (documentId.includes('업무기안')) {
      return (
        <Link to={`/apvl/abbr/${params.row.docId}`}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('출장계획')) {
      return (
        <Link to={`/apvl/abtp/${params.row.docId}`}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('인사명령')) {
      return (
        <Link to={`/apvl/abpa/${params.row.docId}`}>
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
          <p className={styles.sasinfont}>결재전</p>
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

export default ApprovalBefore;
