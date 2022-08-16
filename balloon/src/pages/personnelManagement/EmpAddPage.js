import React, { useEffect, useState } from 'react';
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
import { useTheme } from '@mui/material/styles';
import { findUnitList } from '../../context/UnitAxios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
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

const positionArr = [
  '인턴',
  '사원',
  '주임',
  '대리',
  '과장',
  '차장',
  '부장',
  '이사',
  '상무',
  '전무',
  '부사장',
  '사장',
  '부회장',
  '이사회 의장',
  '회장',
];

const responseArr = [
  '없음',
  '파트장',
  '팀장',
  '지점장',
  '본부장',
  '그룹장',
  '부서장',
  '사업부장',
  '부문장',
  '센터장',
  '실장',
  '임원',
  '상근고문',
  '고문',
  'CIO',
  'COO',
  'CMO',
  'CFO',
  'CTO',
  'CEO',
];

const gradeArr = ['ROLE_GUEST', 'ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'];

function EmpAddPage() {
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  // };

  const [unitList, setUnitList] = useState([]);
  const [posi, setPosi] = useState('인턴');
  const [responsi, setResponsi] = useState('없음');
  const [unit, setUnit] = useState('');
  const [urg, setUrg] = useState('ROLE_USER');
  const [birth, setBirth] = useState(null);
  const [unitArr, setUnitArr] = useState([]);

  useEffect(() => {
    findUnitList(setUnitList);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const empId = document.getElementById('empId');
    const password = document.getElementById('password');
    const empName = document.getElementById('empName');
    const position = posi;
    const responsibility = responsi;
    const salary = document.getElementById('salary');
    const commission = document.getElementById('commission');
    const hiredate = document.getElementById('hiredate');
    // const unitcode = document.getElementById('units');
    const unitcode = unit;
    const empBell = document.getElementById('empBell');
    const empMail = document.getElementById('empMail');
    const mobile = document.getElementById('mobile');
    const userRoleGrade = urg;
    const birthday = document.getElementById('birthday');
    const address = document.getElementById('address');
    const licensePlate = document.getElementById('licensePlate');
    const photo = document.getElementById('photo');

    const inputEmpData = {
      empId: empId.value,
      password: password.value,
      empName: empName.value,
      position: position,
      responsibility: responsibility,
      salary: salary.value,
      commission: commission.value,
      hiredate: hiredate.value,
      unit: {
        unitCode: unitcode,
      },
      empBell: empBell.value,
      empMail: empMail.value,
      mobile: mobile.value,
      userRoleGrade: userRoleGrade,
      birthday: birthday.value,
      address: address.value,
      licensePlate: licensePlate.value,
      photo: photo.value,
    };

    console.log(inputEmpData);
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
            // label="사원번호"
            required
            fullWidth
            id="empId"
            autoComplete="empId"
            autoFocus
          />
          비밀번호
          <TextField
            margin="normal"
            // label="비밀번호"
            type="password"
            required
            fullWidth
            id="password"
            autoComplete="current-password"
          />
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
            // labelId="직위"
            id="position"
            defaultValue={positionArr[0]}
            value={posi}
            // multiple
            // value={'인턴'}
            // onChange={handleChange}
            onChange={(e) => {
              setPosi(e.target.value);
              console.log(posi);
            }}
            input={<OutlinedInput label="position" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}>
            {positionArr.map((position) => (
              <MenuItem
                key={position}
                value={position}
                // style={getStyles(name, personName, theme)}
              >
                {position}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-responsibility">직책</InputLabel>
          <Select
            margin="none"
            // labelId="직책"
            // label="직책"
            id="responsibility"
            defaultValue={responseArr[0]}
            value={responsi}
            // multiple
            // value={'인턴'}
            input={<OutlinedInput label="responsibility" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              setResponsi(e.target.value);
              console.log(responsi);
            }}>
            {responseArr.map((responsibility) => (
              <MenuItem
                key={responsibility}
                value={responsibility}
                // style={getStyles(name, personName, theme)}
              >
                {responsibility}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-salary">월급</InputLabel>
          <TextField
            margin="normal"
            // label="월급"
            type="number"
            required
            fullWidth
            id="salary"
            autoComplete="salary"
          />{' '}
          <InputLabel id="label-commission">상여금</InputLabel>
          <TextField
            margin="normal"
            // label="상여금"
            type="number"
            required
            fullWidth
            id="commission"
            autoComplete="commission"
          />
          <InputLabel id="label-hiredate">고용일자</InputLabel>
          <TextField
            margin="normal"
            // label="고용일자"
            type="date"
            required
            fullWidth
            id="hiredate"
            autoComplete="hiredate"
          />
          <InputLabel id="label-unit">조직이름</InputLabel>
          <Select
            margin="none"
            // labelId="조직"
            // label="조직"
            id="unit"
            defaultValue={responseArr[0]}
            value={unit}
            input={<OutlinedInput label="unit" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              setUnit(e.target.value);
              console.log(unit);
            }}>
            {responseArr.map((responsibility) => (
              <MenuItem
                // className="units"
                key={responsibility}
                value={responsibility}
                // style={getStyles(name, personName, theme)}
              >
                {responsibility}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-empBell">사내전화번호</InputLabel>
          <TextField
            margin="normal"
            // label="사내전화번호"
            required
            fullWidth
            id="empBell"
            autoComplete="empBell"
          />
          <InputLabel id="label-empMail">개인이메일</InputLabel>
          <TextField
            margin="normal"
            // label="개인이메일"
            type="email"
            required
            fullWidth
            id="empMail"
            autoComplete="empMail"
          />
          <InputLabel id="label-mobile">전화번호</InputLabel>
          <TextField
            margin="normal"
            // label="전화번호"
            required
            fullWidth
            id="mobile"
            autoComplete="mobile"
          />
          <InputLabel id="label-userRoleGrade">사원권한</InputLabel>
          <Select
            margin="none"
            // labelId="사원권한"
            // label="사원권한"
            id="userRoleGrade"
            defaultValue={gradeArr[1]}
            value={urg}
            // multiple
            // value={'인턴'}
            input={<OutlinedInput label="userRoleGrade" />}
            MenuProps={MenuProps}
            style={{ width: '100%' }}
            onChange={(e) => {
              console.log(e.target.value);
              setUrg(e.target.value);
              console.log(urg);
            }}>
            {gradeArr.map((userRoleGrade) => (
              <MenuItem
                key={userRoleGrade}
                value={userRoleGrade}
                // style={getStyles(name, personName, theme)}
              >
                {userRoleGrade}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="label-birthday">생일</InputLabel>
          <TextField
            margin="normal"
            // label="생일"
            type="date"
            required
            fullWidth
            id="birthday"
            autoComplete="birthday"
          />
          <InputLabel id="label-address">집주소</InputLabel>
          <TextField
            margin="normal"
            // label="집주소"
            required
            fullWidth
            id="address"
            autoComplete="address"
          />
          <InputLabel id="label-licensePlate">차량번호</InputLabel>
          <TextField
            margin="normal"
            // label="차량번호"
            required
            fullWidth
            id="licensePlate"
            autoComplete="licensePlate"
          />
          <InputLabel id="label-photo">사진</InputLabel>
          <TextField
            margin="normal"
            // label="사진"
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
