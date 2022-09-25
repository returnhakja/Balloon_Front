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
import { updateEmployee } from '../../context/EmployeeAxios';
import UpdateEmailModal from './UpdateEmailModal';

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
  // useEffect(() => {
  //   console.log(empInfo);
  // }, []);
  const onSubmit = (value) => {
    const updateData = {
      empId: empInfo.empId,
      mobile: value.mobile,
      address: value.address,
      licensePlate: value.licensePlate,
    };

    updateEmployee(updateData);
  };

  // your form submit function which will invoke after successful validation

  return (
    <Container>
      <h1>내 정보 수정</h1>
      <Box
        sx={{
          marginTop: '1%',
          maxWidth: 'lg',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '30px 0px 30px 0px',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}>
        <Card>
          {empInfo.length !== 0 && (
            <CardContent sx={{ display: 'flex' }}>
              <div
                style={{
                  margin: '15px',
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                <Avatar
                  style={{
                    width: '150px',
                    height: '150px',
                    marginTop: '5px',
                    marginBottom: '5px',
                  }}
                  src={
                    !!empInfo.photo
                      ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${empInfo.photo}`
                      : `${process.env.REACT_APP_AWS_S3_DEFAULT}`
                  }
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
                    <TableCell align="center">{empInfo.empName}</TableCell>
                  </TableRow>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      사원 이메일
                    </TableCell>
                    <TableCell align="center">
                      <input
                        name="empMail"
                        defaultValue={email}
                        className={styles.input}
                        // {...register('empMail', {
                        //   // required: true,
                        //   pattern:
                        //     /^[A-Za-z0-9]([-]?[A-Za-z0-9])*@[A-Za-z0-9]([-]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                        // })}
                        // readOnly
                      />
                      <button onClick={() => setEmailOpen(true)}>변경</button>
                    </TableCell>
                    {errors.empMail &&
                      errors.empMail.type === 'pattern' &&
                      alert('이메일 형식이 맞지 않습니다.\n(XX@XXX.XXX)')}
                  </TableRow>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      핸드폰번호
                    </TableCell>
                    <TableCell align="center">
                      <input
                        name="mobile"
                        defaultValue={empInfo.mobile}
                        className={styles.input}
                        {...register('mobile', {
                          // required: true,
                          maxLength: 15,
                          pattern: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                        })}
                      />
                    </TableCell>
                    {errors.mobile &&
                      errors.mobile.type === 'pattern' &&
                      alert(
                        '전화번호 형식이 맞지 않습니다.\n(XX-XXX-XXXX, XX-XXXX-XXXX)\n(XXX-XXX-XXXX, XXX-XXXX-XXXX)'
                      )}
                  </TableRow>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      주소
                    </TableCell>
                    <TableCell colSpan={3} align="center">
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
                    <TableCell colSpan={3} align="center">
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

                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      <Link to={'/mypage'}>
                        <Button sx={{ border: 1, mt: 1 }}>마이페이지</Button>
                      </Link>
                    </TableCell>
                    <TableCell colSpan={3} align="center">
                      <Button type="submit" sx={{ border: 1, mt: 1 }}>
                        수정
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {emailOpen && (
                <UpdateEmailModal
                  open={emailOpen}
                  setOpen={setEmailOpen}
                  empId={empInfo.empId}
                  email={empInfo.email ? empInfo.email : ''}
                />
              )}
            </CardContent>
          )}
        </Card>
      </Box>
    </Container>
  );
}

export default UpdateMine;
