import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  findUnitByUnitId,
  findHigherOrganization,
  updateUnit,
} from '../../context/UnitAxios';
import styles from '../../css/Component.module.css';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Input = ({ label, register, required }) => (
  <>
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h6"
      sx={{ mb: 2, mt: 2 }}>
      {label}
    </Typography>
    <input className={styles.input} {...register(label, { required })} />
  </>
);

const Select = React.forwardRef(({ name, label, unit, higher }, ref) => {
  const [uCode, setUnitCode] = useState(
    unit.unitCode !== '00010000' ? unit.parentUnit.unitCode : '없음'
  );
  return (
    <>
      {/* {setUnitCode(unit.parentUnit)} */}
      <label className={styles.label}>{label}</label>
      <select
        className={styles.input}
        name={name}
        ref={ref}
        value={uCode}
        onChange={(newValue) => {
          console.log('newValue', newValue.target.value);
          setUnitCode(newValue.target.value);
        }}>
        {higher.length !== 0 &&
          higher.map((data, index) => (
            <option key={data.unitCode} value={data.unitCode}>
              {data.unitName + ' (' + data.unitCode + ')'}
            </option>
          ))}
      </select>
    </>
  );
});

export default function UnitUpdate({ open, setOpen, unitCode }) {
  //   const [open, setOpen] = React.useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // console.log(unitCode);
  const handleClose = () => setOpen(false);

  const [unit, setUnit] = useState({});
  const [higher, setHigher] = useState([]);
  // const handleClose = () => {
  //   setOpenUpdate(false);

  // };

  const onSubmit = (unitInfo) => {
    console.log(unitInfo);

    // console.log(data);
    // insertUnit(unitInfo);
  }; // your form submit function which will invoke after successful validation

  const updateHandle = () => {
    const unitCode = document.getElementById('unitCode').value;
    const unitName = document.getElementById('unitName').value;
    const bell = document.getElementById('bell').value;
    const parentUnit = document.getElementById('parentUnit').value;

    const updatedata = {
      unitCode: unitCode,
      unitName: unitName,
      bell: bell,
      parentUnit: { unitCode: parentUnit },
    };
  };

  useEffect(() => {
    findUnitByUnitId(unitCode, setUnit);
    findHigherOrganization(setHigher);
    console.log(unit);
  }, [Object.keys(unit).length, higher.length]);

  return (
    <div>
      {Object.keys(unit).length !== 0 && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h4"
              sx={{ mb: 2, mt: 2, color: '#00AAFF' }}>
              <ApartmentIcon className={styles.icon} />
              <span>조직 정보</span>
              <hr />
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h6"
                sx={{ mb: 2, mt: 2 }}>
                조직 번호
              </Typography>
              <input
                name="unitCode"
                value={unit.unitCode}
                className={styles.input}
                {...register('unitCode', { required: true, maxLength: 10 })}>
                {/* {Object.keys(unit).length !== 0 &&
                  unit.unitName + ' (' + unit.unitCode + ')'} */}
              </input>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h6"
                sx={{ mb: 2, mt: 2 }}>
                조직 이름
              </Typography>
              <input
                name="unitName"
                defaultValue={unit.unitName}
                className={styles.input}
                {...register('unitName', { required: true, maxLength: 10 })}
              />
              {errors.unitName && errors.unitName.type === 'required' && (
                <p>This field is required</p>
              )}
              {errors.unitName && errors.unitName.type === 'maxLength' && (
                <p>최대 글자 수를 넘었습니다.</p>
              )}
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h6"
                sx={{ mb: 2, mt: 2 }}>
                전화번호
              </Typography>
              <input
                name="bell"
                defaultValue={unit.bell}
                className={styles.input}
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
              <Typography
                id="modal-modal-description"
                variant="h6"
                component="h6"
                sx={{ mt: 2 }}>
                상위 조직
              </Typography>
              <TextField
                required
                id="parentUnit"
                // label="메모 입력"
                sx={{ width: '100%' }}
                inputProps={{ readOnly: true }}
                value={
                  Object.keys(unit).length !== 0 && unit.parentUnit
                    ? unit.parentUnit.unitCode
                    : '없음'
                }
              />
              <Select
                label="상위조직"
                {...register('parentUnit')}
                unit={unit}
                higher={higher}
              />

              <Button
                onClick={handleClose}
                sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
                취소
              </Button>
              {/* 채팅방만드는 부분 */}
              <Button
                // onClick={() => {
                //   // updateHandle();
                // }}
                type="submit"
                sx={{ fontSize: 30, border: 1, mt: 1 }}>
                수정
              </Button>
            </form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
