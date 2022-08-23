import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Modal,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
} from '@mui/material';

import {
  getApvrListInSameUnit,
  getEmpListInSameUnit,
} from '../../context/EmployeeAxios';
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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function Modalapproval({
  openapprovalModal,
  setOpenapprovalModal,
  setApprover,
  approver,
  setNoApprover,
  noApprover,
}) {
  const [chatEmpList, setCEList] = useState([]);
  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const handleClose = () => setOpenapprovalModal(false);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  // 사원list 출력하기
  useEffect(() => {
    getApvrListInSameUnit(empId, setCEList);
  }, []);
  console.log(noApprover);
  console.log(approver);
  console.log(right);
  console.log(left);

  useEffect(() => {
    if (chatEmpList.length !== 0) {
      const arr = [];
      chatEmpList.map((data) => {
        arr.push(data);
      });
      if (approver.length !== 0) {
        setLeft(noApprover);
        setRight(approver);
      } else setLeft(arr);
    }
  }, [chatEmpList]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items &&
          items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;
            return (
              <ListItem
                key={value.empId}
                role="listitem"
                button
                onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${value.empName}` + ' ' + `${value.position}`}
                />
              </ListItem>
            );
          })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Modal
      open={openapprovalModal}
      onClose={handleClose}
      // aria-labelledby="modal-modal-title"
      // aria-desribedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1>결재선 설정</h1>
        <br />

        <div className="body">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllRight}
                  disabled={left && left.length === 0}
                  aria-label="move all right">
                  ≫
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right">
                  &gt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left">
                  &lt;
                </Button>
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left">
                  ≪
                </Button>
              </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
          </Grid>
        </div>
        <div className="footer">
          {' '}
          <Button
            onClick={() => {
              handleClose(false);
            }}
            sx={{ fontSize: 20, mr: 3, border: 1, mt: 3 }}>
            취소
          </Button>
          <Button
            sx={{ fontSize: 20, border: 1, mt: 3 }}
            onClick={() => {
              setApprover(right);
              console.log(left);
              setNoApprover(left);
              handleClose(false);
            }}>
            계속
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default Modalapproval;
