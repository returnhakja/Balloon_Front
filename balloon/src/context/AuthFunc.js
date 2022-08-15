import axios from 'axios';
import Cookies from 'universal-cookie';

// 로그인
export const login = async (empId, password, authenticate) => {
  console.log(empId, password, authenticate);
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/login';
  const inputLogin = {
    empId: empId,
    password: password,
  };
  const loggi = await axios.post(url, inputLogin, header).catch((error) => {
    console.log(empId, password, authenticate);
    console.log(error);
  });

  if (!!loggi) {
    authenticate();
    console.log(empId, password, authenticate);
    // window.location.href = '/';
  } else {
    console.log(empId, password, authenticate);
    alert('아이디 혹은 비밀번호가 틀립니다.');
  }
};

// 로그아웃
export const logoutFunc = (logout) => {
  const cookies = new Cookies();
  logout();
  cookies.remove('accessToken');
  window.location.href = '/';
};

// 쿠키 가져오기
export const getCookie = (cookies) => {
  return cookies.get('accessToken');
};
