import axios from 'axios';
import Cookies from 'universal-cookie';

// 회원가입 유효성 검사
export const signupValidation = async (
  idChk,
  empId,
  password,
  empName,
  position,
  responsibility,
  salary,
  commission,
  hiredate,
  unitcode,
  empBell,
  empMail,
  mobile,
  userRoleGrade,
  birthday,
  address,
  licensePlate,
  photo
) => {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  let cnt = 17;

  if (cnt === 17) {
    if (!empId) {
      alert('아이디를 입력해주세요!!');
    } else {
      if (idChk === false) {
        alert('아이디 중복확인을 해주세요!!');
      } else {
        cnt--;
      }
    }
  }

  if (cnt === 16) {
    if (!password) {
      alert('비밀번호를 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 15) {
    if (!empName) {
      alert('이름을 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 14) {
    if (!position) {
      alert('직위를 선택해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 13) {
    if (!responsibility) {
      alert('직책를 선택해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 12) {
    if (!salary) {
      alert('월급을 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 11) {
    if (!commission) {
      alert('상여금을 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 10) {
    if (!hiredate) {
      alert('고용일자를 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 9) {
    if (!unitcode) {
      alert('조직코드를 선택해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 8) {
    if (!empBell) {
      alert('사내전화를 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 7) {
    if (!empMail) {
      alert('이메일을 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 6) {
    if (!mobile) {
      alert('휴대폰 번호를 입력해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 5) {
    if (!userRoleGrade) {
      alert('사원 권한을 선택해주세요!!');
    } else {
      cnt--;
    }
  }

  if (cnt === 4) {
    if (!birthday) {
      birthday = null;
      cnt--;
    } else {
      birthday = Date.parse(birthday);
      cnt--;
    }
  }

  if (cnt === 3) {
    if (!address) {
      address = null;
      cnt--;
    } else {
      cnt--;
    }
  }

  if (cnt === 2) {
    if (!licensePlate) {
      licensePlate = null;
      cnt--;
    } else {
      cnt--;
    }
  }

  if (cnt === 1) {
    if (!photo) {
      photo = null;
      cnt--;
    } else {
      cnt--;
    }
  }

  console.log(cnt);

  if (cnt === 0) {
    return true;
  }

  // return alert('입력하세요!');
};

// 회원가입
export const signup = async (inputEmpData) => {
  console.log(inputEmpData);
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/signup';

  axios.post(url, inputEmpData, header).catch((error) => {
    console.log(error);
  });
  // window.location.href = "/";
};

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
