import axios from 'axios';
import Cookies from 'universal-cookie';

// 회원가입 유효성 검사
export const signupValidation = async (
  setDataChk,
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
    // 영문과숫자특수문자를 넣어서 8~20자 이내
    const passwordRegEx = /^(?=.*[a-zA-Z0-9][!@#$%^*+=-][a-zA-Z0-9]).{8,20}$/;
    const passwordRegEx2 = /^(?=.*[a-zA-Z0-9][!@#$%^*+=-]).{8,20}$/;
    const passwordRegEx3 = /^(?=.*[!@#$%^*+=-][a-zA-Z0-9]).{8,20}$/;
    if (!password) {
      alert('비밀번호를 입력해주세요!!');
    } else {
      //형식에 맞지 않을 경우 아래 콘솔 출력
      if (password.match(passwordRegEx) === null) {
        //형식에 맞지 않을 경우 아래 콘솔 출력
        if (password.match(passwordRegEx2) === null) {
          //형식에 맞지 않을 경우 아래 콘솔 출력
          if (password.match(passwordRegEx3) === null) {
            alert('비밀번호 형식을 확인해주세요');
          } else {
            // 맞을 경우 출력
            cnt--;
          }
        } else {
          // 맞을 경우 출력
          cnt--;
        }
      } else {
        // 맞을 경우 출력
        cnt--;
      }
    }
  }
  if (cnt === 15) {
    const nameRegEx = /^[0-9]+$/;
    const nameRegEx2 = /^[a-zA-Z가-힣]+$/;
    if (!empName) {
      alert('이름을 입력해주세요!!');
    } else {
      if (empName.match(nameRegEx) === null) {
        if (empName.match(nameRegEx2) === null) {
          alert('한글과 영어 외에는 입력하지마세요2!!');
        } else {
          cnt--;
        }
      } else {
        alert('숫자를 입력하지마세요!!');
      }
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
      salary = parseFloat(salary);
      cnt--;
    }
  }

  if (cnt === 11) {
    if (!commission) {
      alert('상여금을 입력해주세요!!');
    } else {
      commission = parseFloat(commission);
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
    const empBellRegEx = /^\d{3}-\d{3}-\d{4}$/;
    if (!empBell) {
      alert('사내전화를 입력해주세요!!');
    } else {
      if (empBell.match(empBellRegEx) === null) {
        alert('사내 전화번호 형식을 맞춰주세요');
      } else {
        cnt--;
      }
    }
  }

  if (cnt === 7) {
    const emailRegEx =
      /^[A-Za-z0-9]([-]?[A-Za-z0-9])*@[A-Za-z0-9]([-]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;

    if (!empMail) {
      alert('이메일을 입력해주세요!!');
    } else {
      if (empMail.match(emailRegEx) === null) {
        alert('이메일 형식을 맞춰주세요');
      } else {
        cnt--;
      }
    }
  }

  if (cnt === 6) {
    const mobileRegEx = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!mobile) {
      alert('휴대폰 번호를 입력해주세요!!');
    } else {
      if (mobile.match(mobileRegEx) === null) {
        alert('휴대폰 번호 형식에 맞춰주세요');
      } else {
        cnt--;
      }
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

  if (cnt === 0) {
    const inputData = {
      empId: empId,
      password: password,
      empName: empName,
      position: position,
      responsibility: responsibility,
      salary: salary,
      commission: commission,
      hiredate: hiredate,
      unit: {
        unitCode: unitcode,
      },
      empBell: empBell,
      empMail: empMail,
      mobile: mobile,
      userRoleGrade: userRoleGrade,
      birthday: birthday,
      address: address,
      licensePlate: licensePlate,
      photo: photo,
    };

    return setDataChk(true), inputData;
  } else {
    return null;
  }
};

// 회원가입
export const signup = async (inputEmpData) => {
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/signup';

  axios.post(url, inputEmpData, header).catch((error) => {
    console.log(error);
  });
  window.location.href = '/management/employee';
};

// 엑셀로 회원가입
export const insertSignupList = async (rows) => {
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/signuplist';

  const inputEmpList = [];
  rows.forEach((element) =>
    inputEmpList.push({
      empId: element[0],
      password: element[1],
      empName: element[2],
      position: element[3],
      responsibility: element[4],
      salary: element[5],
      commission: element[6],
      hiredate: element[7],
      unit: {
        unitCode: element[8],
      },
      empBell: element[9],
      empMail: element[10],
      mobile: element[11],
      userRoleGrade: element[12],
      birthday: element[13],
      address: element[14],
      licensePlate: element[15],
      photo: element[16],
    })
  );

  if (inputEmpList.length !== 0) {
    const signupChk = axios.post(url, inputEmpList, header).catch((error) => {
      console.log(error);
    });
    signupChk.then((check) => {

      if (check.data === true) {

        window.location.href = '/management/employee';
      } else {
        alert('정보가 잘못되었습니다.');
      }
    });
  }
};

// 로그인
export const login = async (empId, password, authenticate) => {
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/login';
  const inputLogin = {
    empId: empId,
    password: password,
  };
  const loggi = await axios.post(url, inputLogin, header).catch((error) => {});

  if (!!loggi) {
    authenticate();
  } else {
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
