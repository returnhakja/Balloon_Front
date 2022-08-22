import { Container } from '@mui/system';
import React, { useState } from 'react';
import SideNavigation from '../../components/SideNavigation';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../../css/Component.module.css';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function ApprovalBefore() {
  // 날짜 관련
  const [startValue, setStartValue] = useState(null);
  const [endvalue, setEndValue] = useState(null);

  //기안양식
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  return (
    <>
      <SideNavigation>
        <Container>
          <p className={styles.sasinfont}>결재전</p>
          <br />
          <hr />
          <div style={{ height: 500, width: '100%', marginBottom: 70 }}>
            {/* <DataGrid /> */}
          </div>
        </Container>
      </SideNavigation>
    </>
  );
}

export default ApprovalBefore;
