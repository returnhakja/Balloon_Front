import React, { useEffect, useState } from 'react';
import { insertUnitList } from '../../context/UnitAxios';
import { Container, Button, TextField, Typography, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import readXlsxFile from 'read-excel-file';

function UnitListAddPage() {
  const [unitList, setUnitList] = useState([]);

  const eventHhandle = (event) => {
    event.preventDefault();

    const unitList = document.getElementById('unitList');

    if (unitList.files.length !== 0) {
      readXlsxFile(unitList.files[0]).then((rows) => {
        setUnitList(rows);
      });
    }
  };

  useEffect(() => {
    if (unitList.length !== 0) {
      const rows = unitList.filter((row) => row[0] !== 'unitCode');
      insertUnitList(rows);
    } else {
    }
  }, [unitList]);

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
          조직리스트 추가
        </Typography>
        <br />
        <br />
        <InputLabel id="label-unitList">엑셀</InputLabel>
        <TextField
          margin="normal"
          type="file"
          required
          fullWidth
          id="unitList"
          autoComplete="unitList"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
          onClick={eventHhandle}>
          조직리스트 추가{' '}
        </Button>
      </Box>
    </Container>
  );
}

export default UnitListAddPage;
