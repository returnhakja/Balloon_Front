import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signupValidation, signup } from '../../context/AuthFunc';
import { findUnitList } from '../../context/UnitAxios';
import { selectEmpByEmpId } from '../../context/EmployeeAxios';
import { positionArr, responseArr, gradeArr } from '../../context/EmpFunc';
import { Container, Button, TextField, Typography, Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EmpAddPage() {
  const [unitArr, setUnitArr] = useState([]);
  const [posi, setPosi] = useState('인턴');
  const [responsi, setResponsi] = useState('없음');
  const [unit, setUnit] = useState('');
  const [urg, setUrg] = useState('ROLE_USER');
  // const [birth, setBirth] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [idChk, setIdChk] = useState(false);
  const [dataChk, setDataChk] = useState(false);

  const toggleHidePassword = (event) => {
    event.preventDefault();
    setHidePassword(!hidePassword);
  };

  const idCheckHandle = (event) => {
    event.preventDefault();

    const empId = document.getElementById('empId').value;
    if (!empId) {
      alert('아이디를 입력해주세요!!');
    } else {
      setIdChk(true);
      selectEmpByEmpId(empId, setIdChk);
    }
  };

  useEffect(() => {
    findUnitList(setUnitArr);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const empId = document.getElementById('empId').value;
    const password = document.getElementById('password').value;
    const empName = document.getElementById('empName').value;
    const position = posi;
    const responsibility = responsi;
    let salary = document.getElementById('salary').value;
    let commission = document.getElementById('commission').value;
    const hiredate = document.getElementById('hiredate').value;
    const unitcode = unit;
    const empBell = document.getElementById('empBell').value;
    const empMail = document.getElementById('empMail').value;
    const mobile = document.getElementById('mobile').value;
    const userRoleGrade = urg;
    let birthday = document.getElementById('birthday').value;
    let address = document.getElementById('address').value;
    let licensePlate = document.getElementById('licensePlate').value;
    let photo = document.getElementById('photo').value;

    const inputEmp = signupValidation(
      setDataChk,
      idChk,
      empId,
      password,
      empName,
      position,
      responsibility,
      salary,
      commission,
      hiredate,
      unitcode,
      empBell,
      empMail,
      mobile,
      userRoleGrade,
      birthday,
      address,
      licensePlate,
      photo
    );

    if (dataChk === true) {
      inputEmp.then((data) => signup(data));
    }
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
          <Box
            style={{
              width: '50vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              margin="normal"
              // label="사원번호"
              required
              fullWidth
              id="empId"
              autoComplete="empId"
              autoFocus
            />{' '}
            <Button
              onClick={idCheckHandle}
              sx={{
                width: '90px',
                background: '#A6A6A6',
                height: '50px',
                mt: 1,
              }}>
              중복 확인
            </Button>
          </Box>
          비밀번호
          <Box
            style={{
              width: '50vw',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              margin="normal"
              // label="비밀번호"
              type={hidePassword ? 'password' : 'text'}
              required
              fullWidth
              id="password"
              autoComplete="current-password"
              visible="true"
            />{' '}
            <Button
              onClick={toggleHidePassword}
              sx={{
                width: '90px',
                mt: 1,
                background: '#A6A6A6',
                height: '50px',
              }}>
              {hidePassword ? '보이기' : '숨기기'}
            </Button>
          </Box>
          이름
          <TextField
            margin="normal"
            // label="이름"
            required
            fullWidth
            id="empName"
            autoComplete="empName"
          />
          <InputLabel id="label-position">직위</InputLabel>
          <Select
            margin="none"
            id="position"
            value={posi}
            onChange={(e) => {
              setPosi(e.target.value);
            }}
            input={<OutlinedInput label="position" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}>
            {positionArr.map((position) => (
              <MenuItem key={position} value={position}>
                {position}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-responsibility">직책</InputLabel>
          <Select
            margin="none"
            id="responsibility"
            value={responsi}
            input={<OutlinedInput label="responsibility" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              setResponsi(e.target.value);
            }}>
            {responseArr.map((responsibility) => (
              <MenuItem key={responsibility} value={responsibility}>
                {responsibility}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-salary">월급</InputLabel>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="salary"
            autoComplete="salary"
          />{' '}
          <InputLabel id="label-commission">상여금</InputLabel>
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            id="commission"
            autoComplete="commission"
          />
          <InputLabel id="label-hiredate">고용일자</InputLabel>
          <TextField
            margin="normal"
            type="date"
            required
            fullWidth
            id="hiredate"
            autoComplete="hiredate"
          />
          <InputLabel id="label-unit">조직이름</InputLabel>
          <Select
            margin="none"
            id="unit"
            value={unit}
            input={<OutlinedInput label="unit" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              setUnit(e.target.value);
            }}>
            {unitArr.map((unit) => (
              <MenuItem key={unit.unitCode} value={unit.unitCode}>
                {unit.unitName + ' (' + unit.unitCode + ')'}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-empBell">사내전화번호</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="empBell"
            autoComplete="empBell"
          />
          <InputLabel id="label-empMail">개인이메일</InputLabel>
          <TextField
            margin="normal"
            type="email"
            required
            fullWidth
            id="empMail"
            autoComplete="empMail"
          />
          <InputLabel id="label-mobile">휴대폰번호</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            autoComplete="mobile"
          />
          <InputLabel id="label-userRoleGrade">사원권한</InputLabel>
          <Select
            margin="none"
            id="userRoleGrade"
            value={urg}
            input={<OutlinedInput label="userRoleGrade" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              setUrg(e.target.value);
            }}>
            {gradeArr.map((userRoleGrade) => (
              <MenuItem key={userRoleGrade} value={userRoleGrade}>
                {userRoleGrade}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-birthday">생일</InputLabel>
          <TextField
            margin="normal"
            type="date"
            required
            fullWidth
            id="birthday"
            autoComplete="birthday"
          />
          <InputLabel id="label-address">집주소</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            autoComplete="address"
          />
          <InputLabel id="label-licensePlate">차량번호</InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="licensePlate"
            autoComplete="licensePlate"
          />
          <InputLabel id="label-photo">사진</InputLabel>
          <TextField
            margin="normal"
            type="file"
            required
            fullWidth
            id="photo"
            autoComplete="photo"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="저장하기"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2 }}
            onClick={handleSubmit}>
            사원추가{' '}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EmpAddPage;
