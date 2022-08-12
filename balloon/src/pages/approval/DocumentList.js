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
import { getDocsByUnit } from './ApprovalAxios';
import { Space, Table, Pagination } from 'antd';
import 'antd/dist/antd.css';

function DocList() {
  const [setEmpId, empInfo, setEmpInfo] = useOutletContext();

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
    getDocsByUnit(empInfo.unit.unitCode, setDocList);
    console.log(docList);
  }, []);

  const [bottomcenter, setBottomCenter] = useState('bottomcenter');
  const data = [
    // 기안 제목 , 상신일 , 문서번호
    {
      title: '문서번호',
      dataIndex: 'docId',
      key: 'docId',
    },
    {
      title: '문서제목',
      dataIndex: 'documentTitle',
      key: 'documentTitle',
      render: (id, index) => <Link to={`/`}>{id}</Link>,
    },
    {
      title: '처리일자',
      dataIndex: 'updateTime',
      key: 'upDateTime',
    },
  ];

  return (
    <>
      <SideNavigation>
        <Container>
          <p className={styles.sasinfont}>문서대장</p>
          <br />
          <hr />

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
              <Box sx={{ minWidth: 120, marginLeft: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    기안제목
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form}
                    label="기안양식"
                    onChange={handleChange}>
                    <MenuItem value={10}>기안부서</MenuItem>
                    <MenuItem value={20}>기안제목</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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
            </Button>
            <Table
              columns={data}
              dataSource={docList}
              pagination={{
                position: [bottomcenter],
                pageSize: 5,
              }}
            />
          </div>
        </Container>
      </SideNavigation>
    </>
  );
}

export default DocList;
