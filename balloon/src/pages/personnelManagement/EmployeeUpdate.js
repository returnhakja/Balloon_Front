import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '../../components/Label';
import { positionArr, responseArr, gradeArr } from '../../context/EmpFunc';
import {
  findEmpByEmpIdByAdmin,
  updateEmpByAdmin,
} from '../../context/EmployeeAxios';
import { findUnitList } from '../../context/UnitAxios';
import styles from '../../css/management/Employee.module.css';
import { Box, Button, Modal } from '@mui/material';

const SelectUnit = React.forwardRef(
  ({ name, label, unitList, unit, setUnit }, ref) => {
    useEffect(() => {}, [unit]);
    return (
      <div className={styles.selectDiv}>
        <Label label={label} />
        <select
          className={styles.inputBox}
          name={name}
          ref={ref}
          value={unit}
          onChange={(newValue) => {
            setUnit(newValue.target.value);
          }}>
          {unitList.length !== 0 &&
            unitList.map((data, index) => (
              <option key={index} value={data.unitCode}>
                {data.unitName + ' (' + data.unitCode + ')'}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

const SelectArr = React.forwardRef(
  ({ name, label, array, value, setValue }, ref) => {
    useEffect(() => {}, [value]);
    return (
      <div className={styles.selectDiv}>
        <Label label={label} />
        <select
          className={styles.inputBox}
          name={name}
          ref={ref}
          value={value}
          onChange={(newValue) => {
            setValue(newValue.target.value);
          }}>
          {array.length !== 0 &&
            array.map((data, index) => (
              <option key={index} value={data}>
                {data}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('aa');
};

export default function EmployeeUpdate({ open, setOpen, empId }) {
  const [id, setId] = useState('');
  const [intern, setIntern] = useState('');
  const [employee, setEmployee] = useState({});

  const [unitList, setUnitList] = useState([]);
  const [unit, setUnit] = useState('');
  const [posi, setPosi] = useState('');
  const [resposi, setResposi] = useState('');
  const [urg, setUrg] = useState('');

  const {
    register,
    // watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    const updateData = {
      empId: id,
      password: null,
      empName: data.empName,
      position: posi,
      responsibility: resposi,
      salary: parseFloat(data.salary),
      commission: parseFloat(data.commission),
      empBell: data.empBell,
      photo: !!data.photo ? data.photo : null,
      userRoleGrade: urg,
      unit: {
        unitCode: unit,
      },
    };

    console.log(updateData);
    updateEmpByAdmin(updateData);
    setOpen(false);
    window.location.href = '/management/employee';
  };

  useEffect(() => {
    setId(empId);
    findUnitList(setUnitList);
    findEmpByEmpIdByAdmin(empId, setEmployee);
    if (Object.keys(employee).length !== 0) {
      if (employee.postion === '인턴') {
        setIntern(employee.position);
      }
      setUnit(employee.unit.unitCode);
      setPosi(employee.position);
      setResposi(employee.responsibility);
      setUrg(employee.userRoleGrade);
    }
  }, [unitList.length, Object.keys(employee).length]);

  return (
    <div>
      {Object.keys(employee).length !== 0 && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <div
                style={{
                  marginRight: '20px',
                  width: '150px',
                  height: '150px',
                  border: '1px solid black',
                }}>
                <img src={employee.photo} alt="사진" />
              </div>
              <div style={{ margin: '10px', width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    margin: '5px',
                    width: '600px',
                    alignItems: 'center',
                  }}>
                  <Label label={'사원명'} />
                  <input
                    className={styles.inputBox}
                    name="empName"
                    defaultValue={employee.empName}
                    {...register('empName')}
                    readOnly
                  />
                  <SelectUnit
                    label={'조직명'}
                    {...register('unit')}
                    unitList={unitList}
                    unit={unit}
                    setUnit={setUnit}
                  />
                </div>
                <div className={styles.selectDiv}>
                  <Label label={'비밀번호'} />
                  <span>{' : '}</span>
                </div>
                <div style={{ display: 'flex' }}>
                  <SelectArr
                    label="직위"
                    {...register('positon')}
                    array={positionArr}
                    value={posi}
                    setValue={setPosi}
                  />
                  <SelectArr
                    label="직책"
                    {...register('responsibility')}
                    array={responseArr}
                    value={resposi}
                    setValue={setResposi}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <div className={styles.selectDiv}>
                    <Label label={'월급'} />
                    <input
                      className={styles.inputBox}
                      name="salary"
                      type="number"
                      step="10"
                      defaultValue={employee.salary}
                      {...register('salary')}
                    />
                  </div>
                  <div className={styles.selectDiv}>
                    <Label label={'상여금'} />
                    <input
                      className={styles.inputBox}
                      name="commission"
                      type="number"
                      step="100"
                      defaultValue={employee.commission}
                      {...register('commission')}
                    />
                  </div>
                </div>
                <div className={styles.selectDiv}>
                  <Label label={'사내전화번호'} />
                  <input
                    className={styles.inputBox}
                    name="empBell"
                    defaultValue={employee.empBell}
                    {...register('empBell', {
                      pattern: /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/,
                    })}
                  />
                  {errors.empBell &&
                    errors.empBell.type === 'pattern' &&
                    alert(
                      '사내전화번호 형식을 맞춰주세요.\n(XXX-XXX-XXXX, XXX-XXXX-XXXX)'
                    )}
                </div>
                <SelectArr
                  label="사원 권한"
                  {...register('userRoleGrade')}
                  array={gradeArr}
                  value={urg}
                  setValue={setUrg}
                />
              </div>
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <Button
                onClick={handleClose}
                sx={{ fontSize: 30, mr: 3, border: 1, mt: 1 }}>
                취소
              </Button>
              <Button type="submit" sx={{ fontSize: 30, border: 1, mt: 1 }}>
                수정
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
