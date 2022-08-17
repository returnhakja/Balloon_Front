import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import styles from '../../css/Chat/Chat.module.css';
import { Link, useOutletContext } from 'react-router-dom';
import { onUserUpdate } from '../../context/ChatAxios';

function Modal({ chatroomName, headCount, setModalOpen }) {
  const [empInfo, setEmpInfo] = useOutletContext();
  const empId = empInfo.empId;

  const chatroomId = new URL(document.location).searchParams.get('room');

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log(chatroomId);
  console.log(chatroomName);
  console.log(headCount);
  console.log(empId);
  return (
    <div className={styles.updatename}>
      <button onClick={closeModal}>X</button>

      <TextField
        id="chatroomName"
        variant="outlined"
        placeholder="수정할 채팅방의 이름을 입력하세요"
        defaultValue={chatroomName}
      />
      <br />
      <Button
        variant="contained"
        onClick={() =>
          onUserUpdate(
            chatroomId,
            document.getElementById('chatroomName'),
            headCount
          )
        }>
        수정하기
      </Button>
    </div>
  );
}
export default Modal;
