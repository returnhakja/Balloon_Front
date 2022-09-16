import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import UpdateProfileModal from './UpdateProfileModal';
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
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function MyPage() {
  const [empInfo] = useOutletContext();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Container>
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>마이페이지</h1>
      <Box
        sx={{
          marginTop: '1%',
          maxWidth: 'lg',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '30px 0px 30px 0px',
        }}>
        {console.log(
          'adasddasdasd',
          `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}`
        )}
        <Card>
          {empInfo.length !== 0 && (
            <CardContent
              sx={{
                margin: '15px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <div style={{ margin: '0px 15px 0px 0px' }}>
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
                      : ''
                  }
                  className="mypageavatar"
                />
                <Button
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '15px 5px 5px 5px',
                  }}
                  onClick={() => setProfileOpen(true)}>
                  <p>프로필 이미지 수정</p>
                  <EditIcon sx={{ float: 'left', marginLeft: '2px' }} />
                </Button>
              </div>
              {profileOpen && (
                <UpdateProfileModal
                  open={profileOpen}
                  setOpen={setProfileOpen}
                  empId={empInfo.empId}
                  photo={
                    empInfo.photo
                      ? `${process.env.REACT_APP_AWS_S3_BUCKET_ADDRESS}${empInfo.photo}`
                      : ''
                  }
                />
              )}
              <div>
                <Link to={'/mypage/update'}>
                  <Button style={{ float: 'right', marginBottom: '5px' }}>
                    정보 수정
                  </Button>
                </Link>
                <Table sx={{ minWidth: 500 }}>
                  <TableBody
                    sx={{
                      borderTop: '1px solid rgba(224,224,224,1)',
                    }}>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">사원명</TableCell>
                      <TableCell>{empInfo.empName}</TableCell>
                      <TableCell
                        className="nameCell"
                        // align="center"
                        sx={{
                          borderLeft: '1px solid rgba(224,224,224,1)',
                        }}>
                        부서명
                      </TableCell>
                      <TableCell>{empInfo.unit.unitName}</TableCell>
                    </TableRow>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">직위</TableCell>
                      <TableCell>{empInfo.position}</TableCell>
                      <TableCell
                        className="nameCell"
                        sx={{
                          borderLeft: '1px solid rgba(224,224,224,1)',
                        }}>
                        직책
                      </TableCell>
                      <TableCell>{empInfo.responsibility}</TableCell>
                    </TableRow>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">월급</TableCell>
                      <TableCell>{empInfo.salary}</TableCell>
                      <TableCell
                        className="nameCell"
                        sx={{
                          borderLeft: '1px solid rgba(224,224,224,1)',
                        }}>
                        상여금
                      </TableCell>
                      <TableCell>{empInfo.commission}</TableCell>
                    </TableRow>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">입사 일자</TableCell>
                      <TableCell>{empInfo.hiredate}</TableCell>
                      <TableCell
                        className="nameCell"
                        sx={{
                          borderLeft: '1px solid rgba(224,224,224,1)',
                        }}>
                        사원 이메일
                      </TableCell>
                      <TableCell>{empInfo.empMail}</TableCell>
                    </TableRow>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">사내전화번호</TableCell>
                      <TableCell>{empInfo.empBell}</TableCell>
                      <TableCell
                        className="nameCell"
                        sx={{
                          borderLeft: '1px solid rgba(224,224,224,1)',
                        }}>
                        핸드폰번호
                      </TableCell>
                      <TableCell>{empInfo.mobile}</TableCell>
                    </TableRow>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">주소</TableCell>
                      <TableCell colSpan={3}>{empInfo.address}</TableCell>
                    </TableRow>
                    <TableRow className="tbrow">
                      <TableCell className="nameCell">차량번호판</TableCell>
                      <TableCell colSpan={3}>{empInfo.licensePlate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          )}
        </Card>
      </Box>
    </Container>
  );
}

export default MyPage;
