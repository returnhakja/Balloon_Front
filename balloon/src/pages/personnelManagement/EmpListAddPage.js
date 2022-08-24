import React, { useEffect, useState } from 'react';
import { insertSignupList } from '../../context/AuthFunc';
import { Container, Button, TextField, Typography, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import readXlsxFile from 'read-excel-file';

function EmpListAddPage() {
  const [signupList, setsignupList] = useState([]);

  const eventHhandle = (event) => {
    event.preventDefault();
    const empList = document.getElementById('empList');

    readXlsxFile(empList.files[0]).then((rows) => {
      setsignupList(rows);
    });
  };

  useEffect(() => {
    if (signupList.length !== 0) {
      const rows = signupList.filter((row) => row[0] !== 'empId');
      insertSignupList(rows);
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
        <InputLabel id="label-empList" style={{ marginTop: '50px' }}>
          엑셀
        </InputLabel>
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
