import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';

import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Component.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useOutletContext, Link } from 'react-router-dom';
import { getDocsByUnit } from '../../context/ApprovalAxios';
import { Space, Table, Pagination } from 'antd';
import { DataGrid } from '@mui/x-data-grid';


function DocList() {
  const [empInfo, setEmpInfo] = useOutletContext();

  const [docList, setDocList] = useState([]);

  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);

  //기안양식
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  useEffect(() => {
    console.log(empInfo);
    getDocsByUnit(empInfo.unit && empInfo.unit.unitCode, setDocList);
    console.log(docList);
  }, []);

  const [bottomcenter, setBottomCenter] = useState('bottomcenter');
  // const data = [
  //   // 기안 제목 , 상신일 , 문서번호
  //   {
  //     title: '문서번호',
  //     dataIndex: 'docId',
  //     key: 'docId',
  //   },
  //   {
  //     title: '문서제목',
  //     dataIndex: 'documentTitle',
  //     key: 'documentTitle',
  //     render: (id, index) => <Link to={`/`}>{id}</Link>,
  //   },
  //   {
  //     title: '처리일자',
  //     dataIndex: 'updateTime',
  //     key: 'upDateTime',
  //   },
  // ];

  // --------------------------------------- test
  // function getdocId(params) {
  //   return (
  //     <Link to={`/doc/${params.row.docId}`}>
  //       {params.row && params.row.documentTitle}
  //     </Link>
  //   );
  // }

  // function getdocId(params) {
  //   let documentId = params.row.docId;
  //   switch (documentId && documentId.split(0, 8)) {
  //     case '업무기안':
  //       return (
  //         <Link to={`/doc/br/${params.row.docId}`}>
  //           {params.row && params.row.documentTitle}
  //         </Link>
  //       );

  //     case '출장계획':
  //       return (
  //         <Link to={`/doc/tp/${params.row.docId}`}>
  //           {params.row && params.row.documentTitle}
  //         </Link>
  //       );

  //     case '인사명령':
  //       return (
  //         <Link to={`/doc/pa/${params.row.docId}`}>
  //           {params.row && params.row.documentTitle}
  //         </Link>
  //       );

  //     // default:
  //     //   return alert('똑바로 보고좀 넣어라');
  //   }
  // }

  function getdocId(params) {
    let documentId = params.row.docId;
    if (documentId.includes('업무기안')) {
      return (
        <Link to={`/doc/br/${params.row.docId}`}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('출장계획')) {
      return (
        <Link to={`/doc/tp/${params.row.docId}`}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else if (documentId.includes('인사명령')) {
      return (
        <Link to={`/doc/pa/${params.row.docId}`}>
          {params.row && params.row.documentTitle}
        </Link>
      );
    } else {
      alert('fuck you');
    }
  }
  // --------------------------------------- test

  const columns = [
    {
      field: 'docId',
      headerName: '문서번호',
      width: 200,
    },
    {
      field: 'documentTitle',
      headerName: '문서제목',
      width: 350,
      renderCell: getdocId,
    },
    { field: 'updateTime', headerName: '처리일자', width: 200 },
  ];

  // console.log(columns[0].valueGetter.params);
  return (
    <>
      <SideNavigation>
        <Container>
          <p className={styles.sasinfont}>문서대장</p>
          <br />
          <hr />
          {/* 
          <div className={styles.maintitle}>
            <span className={styles.mainfont}> 상신일 </span>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="시작일"
                value={startValue}
                type=" date"
                inputFormat={'yyyy-MM-dd'}
                onChange={(newValue) => {
                  setStartValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <span className={styles.centerfont}> : </span>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="끝나는일"
                value={endvalue}
                inputFormat={'yyyy-MM-dd'}
                onChange={(newValue) => {
                  setEndValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />

            <div className={styles.divform}>
              <span className={styles.gianfont}> 기안양식 </span>
              <Box sx={{ minWidth: 250, marginLeft: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    기안양식
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form}
                    label="기안양식"
                    onChange={handleChange}>
                    <MenuItem value={10}>업무기안</MenuItem>
                    <MenuItem value={20}>출장기획서</MenuItem>
                    <MenuItem value={30}>인사명령</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <span className={styles.search}> 검색 </span>

              <TextField
                id="outlined-basic"
                label="기안제목 입력"
                variant="outlined"
              />
            </div>
          </div>
          <hr style={{ marginTop: '3vh' }} />
          <div style={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              style={{ marginTop: '2vh' }}>
              조회
            </Button> */}
          {/* <Table
              columns={data}
              dataSource={docList}
              pagination={{
                position: [bottomcenter],
                pageSize: 5,
              }}
            /> */}
          <div style={{ height: 500, width: '100%', marginBottom: 70 }}>
            <DataGrid
              getRowId={(docList) => docList.docId}
              rows={docList}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
          {/* </div> */}
        </Container>
      </SideNavigation>
    </>
  );
}

export default DocList;
