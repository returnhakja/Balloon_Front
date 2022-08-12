import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import styles from '../../css/Report.module.css';
import '../../css/Modal.css';
import Modal from './Modal';
import {
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

function Report() {
  const [form, setForm] = useState('');

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(() => ['italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // 사원 정보 context
  const [empInfo, setEmpInfo] = useOutletContext();

  console.log(empInfo);

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 25 }}
          color="#00AAFF"
          gutterBottom
          textAlign="center">
          기안자
        </Typography>
        <hr />
        <br />
        <Typography
          sx={{ fontSize: 20 }}
          variant="h5"
          component="div"
          textAlign="center">
          {empInfo.empName}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  const [openModal, setOpenModal] = useState(false);
  console.log(empInfo);
  return (
    <SideNavigation>
      <Container>
        <p className={styles.maintitle}>업무기안</p>

        <table className={styles.table}>
          <thead>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안양식</td>
              <td className={styles.td}>업무기안</td>
              <td className={styles.tdright}>문서번호</td>
              <th className={styles.th}>-</th>
            </tr>
          </thead>

          <tbody>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>보존연한</td>
              <td className={styles.td}>5년</td>
              <td className={styles.tdright}>공개여부</td>
              <th className={styles.th}>
                <Box sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form}
                      onChange={handleChange}>
                      <MenuItem value={10}>부서공개</MenuItem>
                      <MenuItem value={20}>비공개</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </th>
            </tr>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>기안자</td>
              <td className={styles.td}>
                {' '}
                {empInfo.empName}({empInfo.empId})
              </td>
              <td className={styles.tdright}>기안부서</td>
              <th className={styles.th}>
                <Box sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form}
                      onChange={handleChange}>
                      <MenuItem value={10}>Balloon</MenuItem>
                      <MenuItem value={20}>부서가없잖아</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </th>
            </tr>
          </tbody>
        </table>
        {openModal && <Modal closeModal={setOpenModal} />}
        <div className={styles.body1}>
          <span className={styles.subtitle}>결재선</span>
          <button
            type="button"
            className={styles.btnnav}
            onClick={() => {
              setOpenModal(true);
            }}
            id="cancelBtn">
            결재선설정
          </button>
        </div>
        <hr />
        <br />
        <Card
          variant="outlined"
          sx={{ maxWidth: 150 }}
          style={{ backgroundColor: '#F1F9FF' }}>
          {card}
        </Card>
        <hr className={styles.hrmargins} />

        <div className={styles.bodycontent}>
          <div className={styles.bodycontentC}>
            <BsFillExclamationTriangleFill
              color="#37E6E1"
              className={styles.icon}
            />{' '}
            안내
            <p>출장계획서를 작성하세요.</p>
          </div>
        </div>

        <p className={styles.giantitle}>기안내용</p>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trcon}>
              <td className={styles.tdleft}>기안제목</td>
              <td colSpan={2} className={styles.tdright}>
                {' '}
                <form>
                  <input
                    type="text"
                    name="title"
                    placeholder="기안제목을 입력하세요."
                    className={styles.inputtext}
                  />
                </form>
              </td>
            </tr>

            <tr align="center" bgcolor="white">
              <td className={styles.filetd}>파일첨부</td>
              <td className={styles.tdright}>여기 파일첨부</td>
            </tr>
            <tr align="center" bgcolor="white">
              <td className={styles.tdleft}>참조문서</td>
              <td colSpan={2} className={styles.tdright}>
                여기 문서넣기
              </td>
            </tr>
          </thead>
        </table>

        <div className={styles.fonttext}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <StyledToggleButtonGroup
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment">
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
            <StyledToggleButtonGroup
              size="small"
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting">
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
              <ToggleButton value="color" aria-label="color">
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
            {/* <input className={styles.maininput}></input> */}
            <TextField
              fullWidth
              multiline
              rows={10}
              placeholder="내용을 입력해주세요."
            />
          </Paper>

          <div className={styles.savebutton}>
            <button>임시저장</button>
            <button>상신하기</button>
          </div>
        </div>
      </Container>
    </SideNavigation>
  );
}

export default Report;
