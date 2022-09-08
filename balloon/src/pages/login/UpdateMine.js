import React, { useEffect } from 'react';
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
      <h1>내 정보 수정</h1>
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
                    <TableCell colSpan={3}>{empInfo.address}</TableCell>
                  </TableRow>
                  <TableRow className="tbrow">
                    <TableCell className="nameCell" align="center">
                      차량번호판
                    </TableCell>
                    <TableCell colSpan={3}>{empInfo.licensePlate}</TableCell>
                  </TableRow>
                </TableBody>
                <TableCell
                  colSpan={4}
                  rowSpan={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '0',
                  }}>
                  <Link to={'/mypage'}>
                    <Button style={{ float: 'right', marginBottom: '5px' }}>
                      마이페이지
                    </Button>
                  </Link>

                  <Button
                    // onClick={() => {
                    //   // updateHandle();
                    // }}
                    type="submit"
                    sx={{ fontSize: 30, border: 1, mt: 1 }}>
                    수정
                  </Button>
                </TableCell>
              </Table>
            </CardContent>
          )}
        </Card>
      </Box>
    </Container>
  );
}

export default UpdateMine;
