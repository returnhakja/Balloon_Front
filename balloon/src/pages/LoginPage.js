import {
  Container,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import { login } from '../context/EmployeeAxios';

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  login(data.get('empId'), data.get('password'));
};

function LoginPage() {
  return (
    <div>
      <Container component="main" sx={{ marginBottom: 25 }}>
        <Box
          sx={{
            marginTop: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              label="사원번호"
              required
              fullWidth
              name="empId"
              autoComplete="empId"
              autoFocus
            />
            <TextField
              margin="normal"
              label="비밀번호"
              type="password"
              required
              fullWidth
              name="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="저장하기"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              // onClick={}
            >
              Login{' '}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
