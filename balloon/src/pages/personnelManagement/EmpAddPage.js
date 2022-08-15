import React from 'react';
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

function EmpAddPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // insert(data, authenticate);
  };

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
          사원추가
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          사원번호
          <TextField
            margin="normal"
            label="사원번호"
            required
            fullWidth
            name="empId"
            autoComplete="empId"
            autoFocus
          />
          비밀번호
          <TextField
            margin="normal"
            label="비밀번호"
            type="password"
            required
            fullWidth
            name="password"
            autoComplete="current-password"
          />
          이름
          <TextField
            margin="normal"
            label="이름"
            required
            fullWidth
            name="empName"
            autoComplete="empName"
          />
          직위
          <br />
          <select name="position">
            <option value="인턴">인턴</option>
            <option value="사원">사원</option>
            <option value="주임">주임</option>
            <option value="대리">대리</option>
            <option value="과장">과장</option>
            <option value="차장">차장</option>
            <option value="부장">부장</option>
            <option value="이사">이사</option>
            <option value="상무">상무</option>
            <option value="전무">전무</option>
            <option value="부사장">부사장</option>
            <option value="사장">사장</option>
            <option value="부회장">부회장</option>
            <option value="이사회 의장">이사회 의장</option>
            <option value="회장">회장</option>
          </select>
          <br />
          직책
          <br />
          <select name="responsibility">
            <option value="없음">없음</option>
            <option value="파트장">파트장</option>
            <option value="팀장">팀장</option>
            <option value="지점장">지점장</option>
            <option value="본부장">본부장</option>
            <option value="그룹장">그룹장</option>
            <option value="부서장">부서장</option>
            <option value="사업부장">사업부장</option>
            <option value="부문장">부문장</option>
            <option value="센터장">센터장</option>
            <option value="실장">실장</option>
            <option value="임원">임원</option>
            <option value="상근고문">상근고문</option>
            <option value="고문">고문</option>
            <option value="CIO">CIO</option>
            <option value="COO">COO</option>
            <option value="CMO">CMO</option>
            <option value="CFO">CFO</option>
            <option value="CTO">CTO</option>
            <option value="CEO">CEO</option>
          </select>
          <br />
          이름
          <TextField
            margin="normal"
            label="이름"
            required
            fullWidth
            name="empName"
            autoComplete="empName"
          />
          직위
          <TextField
            margin="normal"
            label="직위"
            required
            fullWidth
            name="position"
            autoComplete="position"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="저장하기"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2 }}>
            사원추가{' '}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EmpAddPage;
