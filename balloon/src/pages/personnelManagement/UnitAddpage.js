import React, { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { findHigherOrganization, insertUnit } from '../../context/UnitAxios';
import styles from './unit.module.css';
import { Container, Typography, Box } from '@mui/material';
import {
  Container,
  Button,
  TextField,
  Typography,
  Box,
  Modal,
} from '@mui/material';

const Select = forwardRef(({ onChange, name, label, higher }, ref) => (
  <>
    <label className={styles.label}>{label}</label>
    <select className={styles.input} name={name} ref={ref} onChange={onChange}>
      {higher.length !== 0 &&
        higher.map((data, index) => (
          <option key={index} value={data.unitCode}>
            {data.unitName + ' (' + data.unitCode + ')'}
          </option>
        ))}
    </select>
  </>
));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

function UnitAddpage({ openInsert, setOpenInsert }) {
  const [higher, setHigher] = useState([]);

  const {
    register,
    // watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (unitInfo) => {
    insertUnit(unitInfo);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch('unitCode')); // you can watch individual input by pass the name of the input
  const handleClose = () => {
    setOpenInsert(false);
  };

  useEffect(() => {
    findHigherOrganization(setHigher);
  }, [higher.length]);

  return (
    <Modal
      open={openInsert}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Container component="main" sx={{ marginBottom: 25 }}>
        <Box sx={style}>
          {/* <Box
        sx={{
          marginTop: 9,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}> */}
          <Typography component="h1" variant="h5">
            조직추가
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* register your input into the hook by invoking the "register" function */}
            <label className={styles.label}>조직코드</label>
            <input
              className={styles.input}
              {...register('unitCode', { required: true, maxLength: 8 })}
            />
            {errors.unitCode &&
              errors.unitCode.type === 'required' &&
              alert('조직코드를 입력해주세요.')}

            {errors.unitCode &&
              errors.unitCode.type === 'maxLength' &&
              alert('최대 글자 수를 넘었습니다.')}
            <label className={styles.label}>조직이름</label>
            <input
              className={styles.input}
              {...register('unitName', { required: true, maxLength: 10 })}
            />
            {errors.unitName &&
              errors.unitName.type === 'required' &&
              alert('조직명을 입력해주세요.')}
            {errors.unitName &&
              errors.unitName.type === 'maxLength' &&
              alert('최대 글자 수를 넘었습니다.')}
            <label className={styles.label}>조직 전화번호</label>
            <input
              className={styles.input}
              {...register('bell', {
                required: true,
                maxLength: 15,
                pattern: /^\d{3}-\d{3}-\d{4}$/,
              })}
            />
            {errors.bell &&
              errors.bell.type === 'required' &&
              alert('조직 전화번호를 입력해주세요.')}
            {errors.bell &&
              errors.bell.type === 'maxLength' &&
              alert('최대 글자 수를 넘었습니다.')}
            {errors.bell &&
              errors.bell.type === 'pattern' &&
              alert('전화번호 형식이 맞지 않습니다.(XXX-XXX-XXXX)')}
            <Select
              label="상위조직"
              {...register('parentUnit')}
              higher={higher}
            />
            <input className={styles.submit} type="submit" value="추가" />
            <Button onClick={handleClose}> 닫기 </Button>
          </form>
        </Box>
      </Container>
    </Modal>
  );
}

export default UnitAddpage;
