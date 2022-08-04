import axios from 'axios';

// 로그인
export const login = async (empId, password) => {
  const header = { 'Content-Type': 'application/json' };
  const url = '/auth/login';
  const inputLogin = {
    empId: empId,
    password: password,
  };
  const loginToken = await axios
    .post(url, inputLogin, header)
    .catch((error) => console.log(error));

  console.log(loginToken.data);

  window.location.href = '/';
};

// export const

// 전체 사원 출력 (페이징)
export const selectEmployeeList = async () =>
  // setEmps

  {
    //   const url = "api/emp/emps";
    //   const str = url + "?page=" + 1 + "&size=" + 10;
    //   await axios
    //     .get(str)
    //     .then((response) => response.data)
    //     .then((data) => {
    //       setEmps(data);
    //     })
    //     .catch((error) => console.log(error));
  };
// 페이징 이전 버튼
export const minusPage = async (page, setPage) => {
  await setPage(parseInt(page) - 1);
};
// 페이징 다음 버튼
export const plusPage = async (page, setPage) => {
  await setPage(parseInt(page) + 1);
};

// 사번으로 사원 검색
export const selectEmployeeByEmpId = async (empId, setEmp) => {
  // const urlStr = process.env.REACT_APP_URL_EMP + '/' + empId;
  // await axios
  //   .get(urlStr)
  //   .then((response) => response.data)
  //   .then((data) => {
  //     setBoard(data);
  //   })
  //   .catch((error) => console.log(error));
};

// 사원 추가
export const InsertEmployee = async (
  empId
  // , boardContent, userEmail
) => {
  // const urlStr = process.env.REACT_APP_URL_EMP;
  // const inputBoard = {
  //   boardTitle: boardTitle,
  //   boardContent: boardContent,
  //   user: {
  //     userEmail: userEmail,
  //   },
  // };
  // axios
  //   .post(urlStr, inputBoard, process.env.REACT_APP_HEADER)
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // window.location.href = "/";
};

// 사원 수정
export const updateEmployee = async (
  empId
  // , title, content, contenter
) => {
  // const urlStr = process.env.REACT_APP_URL_EMP;
  // const inputEmp = {
  //   //   boardNo: boardNo,
  //   //   boardTitle: title,
  //   //   boardContent: content,
  //   //   user: {
  //   //     userEmail: contenter,
  //   //   },
  // };
  //     await axios
  //     .put(urlStr, inputBoard, process.env.REACT_APP_HEADER)
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   window.location.href = "/";
};

// 사번으로 사원 삭제
export const deleteEmployee = async (empId) => {
  // const urlStr = process.env.REACT_APP_URL_EMP + '/' + empId;
  // await axios.delete(urlStr).catch((error) => console.log(error));
  // window.location.href = "/";
};
