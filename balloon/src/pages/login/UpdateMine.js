import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Label } from '../../components/Label';
import { useForm } from 'react-hook-form';
import styles from '../../css/management/Employee.module.css';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

function UpdateMine() {
  const [empInfo] = useOutletContext();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [email, setEmail] = useState(empInfo.empMail);
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    console.log(empInfo);
  }, []);

  const eventHandler = () => {
    console.log(empInfo);
    const photo = document.getElementById('photo');

    console.log(photo.files[0].name);
  };

  return (
    <Container>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        내 정보 수정
      </h1>
      <Box
        sx={{
          marginTop: '1%',
          maxWidth: 'lg',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '30px 0px 30px 0px',
        }}>
        <Card>
          {empInfo.length !== 0 && (
            // <CardContent sx={{ display: 'flex' }}>
            <CardContent>
              <div
                style={{
                  margin: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                <Avatar
                  alt="프로필"
                  style={{
                    width: '150px',
                    height: '150px',
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                  src={empInfo.photo}
                  className="mypageavatar"
                />
              </div>
              <Table sx={{ minWidth: 500 }}>
                <TableBody
                  sx={{
                    borderTop: '1px solid rgba(224,224,224,1)',
                  }}>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      사원명
                    </TableCell>
                    <TableCell>{empInfo.empName}</TableCell>
                    {/* <TableCell className="nameCell" align="center">
                      부서명
                    </TableCell>
                    <TableCell>{empInfo.unit.unitName}</TableCell> */}
                  </TableRow>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      사원 이메일
                    </TableCell>
                    <TableCell>
                      <input
                        name="empMail"
                        defaultValue={email}
                        className={styles.input}
                        // {...register('empMail', {
                        //   // required: true,
                        //   pattern:
                        //     /^[A-Za-z0-9]([-]?[A-Za-z0-9])*@[A-Za-z0-9]([-]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                        // })}
                        readOnly
                      />
                      <button onClick={() => setEmailOpen(true)}>변경</button>
                    </TableCell>
                    {errors.empMail &&
                      errors.empMail.type === 'pattern' &&
                      alert('이메일 형식이 맞지 않습니다.\n(XX@XXX.XXX)')}
                  </TableRow>

                  {/* <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      직위
                    </TableCell>
                    <TableCell>{empInfo.position}</TableCell>
                    <TableCell className="nameCell" align="center">
                      직책
                    </TableCell>
                    <TableCell>{empInfo.responsibility}</TableCell>
                  </TableRow> */}
                  {/* <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      월급
                    </TableCell>
                    <TableCell>{empInfo.salary}</TableCell>
                    <TableCell className="nameCell" align="center">
                      상여금
                    </TableCell>
                    <TableCell>{empInfo.commission}</TableCell>
                  </TableRow> */}
                  <TableRow className="tbrow">
                    {/* <TableCell className="nameCell" align="center">
                      사내전화번호
                    </TableCell>
                    <TableCell>{empInfo.empBell}</TableCell> */}
                    <TableCell className="nameCell" align="center">
                      핸드폰번호
                    </TableCell>
                    <TableCell>
                      <input
                        name="mobile"
                        defaultValue={empInfo.mobile}
                        className={styles.input}
                        {...register('mobile', {
                          required: true,
                          maxLength: 15,
                          pattern: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                        })}
                      />
                      {errors.mobile &&
                        errors.mobile.type === 'pattern' &&
                        alert(
                          '전화번호 형식이 맞지 않습니다.\n(XX-XXX-XXXX, XX-XXXX-XXXX)\n(XXX-XXX-XXXX, XXX-XXXX-XXXX)'
                        )}
                    </TableCell>
                  </TableRow>
                  {/* <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      입사 일자
                    </TableCell>
                    <TableCell colSpan={3} align="center">
                      {empInfo.hiredate}
                    </TableCell>
                  </TableRow> */}
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      주소
                    </TableCell>
                    <TableCell colSpan={3}>
                      <input
                        name="address"
                        defaultValue={empInfo.address}
                        className={styles.input}
                        {...register('address', {
                          // required: true,
                          maxLength: 50,
                        })}
                      />
                    </TableCell>
                    {errors.address &&
                      errors.address.type === 'maxLength' &&
                      alert('최대 글자 수를 초과했습니다.')}
                  </TableRow>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      차량번호판
                    </TableCell>
                    <TableCell colSpan={3}>
                      <input
                        name="licensePlate"
                        defaultValue={empInfo.licensePlate}
                        className={styles.input}
                        {...register('licensePlate', {
                          // required: true,
                          maxLength: 12,
                        })}
                      />
                    </TableCell>
                    {errors.licensePlate &&
                      errors.licensePlate.type === 'maxLength' &&
                      alert('최대 글자 수를 초과했습니다.')}
                  </TableRow>
                </TableBody>
              </Table>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <TableCell
                    colSpan={4}
                    rowSpan={4}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '0',
                    }}> */}
                <Link to={'/mypage'}>
                  <Button
                    // style={{
                    //   float: 'right',
                    //   marginBottom: '5px',
                    // }}
                    sx={{ fontSize: 24, border: 1, mr: 3, height: 50, mt: 1 }}>
                    마이페이지
                  </Button>
                </Link>

                <Button
                  // onClick={() => {
                  //   // updateHandle();
                  // }}
                  type="submit"
                  sx={{ fontSize: 24, border: 1, height: 50, mt: 1 }}>
                  수정
                </Button>
                {/* </TableCell> */}
              </div>
            </CardContent>
          )}
        </Card>
      </Box>
    </Container>
  );
}

export default UpdateMine;
