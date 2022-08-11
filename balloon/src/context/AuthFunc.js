import axios from 'axios';
import Cookies from 'universal-cookie';

// 쿠키를 사용할 수 있게 해주기
const cookies = new Cookies();

// 로그인 form에서 submit으로 id, pass를 login() 이동해줌
export const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  login(data.get('empId'), data.get('password'));
};

// 로그인
export const login = async (empId, password) => {
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/login';
  const inputLogin = {
    empId: empId,
    password: password,
  };
  await axios
    .post(url, inputLogin, header)
    // .then((data) => setEmpId(data.data.partitionKey))
    .catch((error) => {
      console.log(error);
    });

  window.location.href = '/';
  // setEmpId(loginToken.data.partitionKey);
  //   alert('아이디 혹은 비밀번호가 틀립니다.');
};

// 로그아웃
export const logout = () => {
  window.localStorage.setItem('logout', Date.now);
  cookies.remove('accessToken');
  window.location.href = '/';
};

// 쿠키 가져오기
export const getCookie = () => {
  return Cookies.get('accessToken');
};
