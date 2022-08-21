import React, { useEffect, useState } from 'react';
import {
  signupValidation,
  signup,
  insertSignupList,
} from '../../context/AuthFunc';
import { findUnitList } from '../../context/UnitAxios';
import { selectEmpByEmpId } from '../../context/EmployeeAxios';
import { Container, Button, TextField, Typography, Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import readXlsxFile from 'read-excel-file';

function EmpListAddPage() {
  const [signupList, setsignupList] = useState([]);

  const eventHhandle = (event) => {
    event.preventDefault();
    const empList = document.getElementById('empList');
    console.log(empList);

    readXlsxFile(empList.files[0]).then((rows) => {
      setsignupList(rows);
    });
  };

  useEffect(() => {
    if (signupList.length !== 0) {
      const rows = signupList.filter((row) => row[0] !== 'empId');
      console.log('sssss');

      insertSignupList(rows);
    } else {
      console.log('dddddd');
    }
  }, [signupList]);

  return (
    <Container component="main" sx={{ marginBottom: 25 }}>
      <Box
        sx={{
          marginTop: 9,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          사원리스트 추가
        </Typography>
        <br />
        <br />
        <InputLabel id="label-empList">엑셀</InputLabel>
        <TextField
          margin="normal"
          type="file"
          required
          fullWidth
          id="empList"
          autoComplete="empList"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
          onClick={eventHhandle}>
          사원리스트 추가{' '}
        </Button>
      </Box>
    </Container>
  );
}

export default EmpListAddPage;
