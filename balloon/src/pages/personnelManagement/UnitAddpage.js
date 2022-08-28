import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { findHigherOrganization, insertUnit } from '../../context/UnitAxios';
import { Container, Button, TextField, Typography, Box } from '@mui/material';
import './styles.css';

const Input = ({ label, register, required }) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
);

const Select = React.forwardRef(({ onChange, name, label, higher }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange}>
      {higher.length !== 0 &&
        higher.map((data, index) => (
          <option key={index} value={data.unitCode}>
            {data.unitName + ' (' + data.unitCode + ')'}
          </option>
        ))}
    </select>
  </>
));

function UnitAddpage() {
  const [higher, setHigher] = useState([]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (unitInfo) => {
    // console.log(data);
    insertUnit(unitInfo);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch('unitCode')); // you can watch individual input by pass the name of the input

  useEffect(() => {
    findHigherOrganization(setHigher);
    console.log(higher);
  }, [higher.length]);

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
          조직추가
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <label>조직코드</label>
          <input {...register('unitCode', { required: true, maxLength: 8 })} />
          {errors.unitCode && errors.unitCode.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.unitCode && errors.unitCode.type === 'maxLength' && (
            <p>최대 글자 수를 넘었습니다.</p>
          )}
          <label>조직이름</label>
          <input {...register('unitName', { required: true, maxLength: 10 })} />
          {errors.unitName && errors.unitName.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.unitName && errors.unitName.type === 'maxLength' && (
            <p>최대 글자 수를 넘었습니다.</p>
          )}
          <label>조직전화번호</label>
          <input
            {...register('bell', {
              required: true,
              maxLength: 15,
              pattern: /^\d{3}-\d{3}-\d{4}$/,
            })}
          />
          {errors.bell && errors.bell.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors.bell && errors.bell.type === 'maxLength' && (
            <p>최대 글자 수를 넘었습니다.</p>
          )}
          {errors.bell && errors.bell.type === 'pattern' && (
            <p>전화번호 형식이 맞지 않습니다.</p>
          )}

          <Select
            label="상위조직"
            {...register('parentUnit')}
            higher={higher}
          />
          <input type="submit" value="추가" />
        </form>
      </Box>
    </Container>
  );
}

export default UnitAddpage;
