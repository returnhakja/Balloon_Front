import axios from 'axios';
import Cookies from 'universal-cookie';

// 쿠키를 사용할 수 있게 해주기
const cookies = new Cookies();

// 전체 사원 출력 (페이징)
export const selectEmployeeList = async (setEmpList) =>
  // setEmps
  {
    const url = '/api/emp/list';
    const str = url + '?page=' + 1 + '&size=' + 10;
    await axios
      .get(str)
      .then((response) => response.data)
      .then((data) => {
        setEmpList(data);
      })
      .catch((error) => console.log(error));
  };
// 페이징 이전 버튼
export const minusPage = async (page, setPage) => {
  await setPage(parseInt(page) - 1);
};
// 페이징 다음 버튼
export const plusPage = async (page, setPage) => {
  await setPage(parseInt(page) + 1);
};

// 전체 사원 출력
// export const selectEmployees = async (setEmpList) =>
// setEmps
// {
//   const url = '/api/emp/emps';
//   await axios
//     .get(url)
//     .then((response) => response.data)
//     .then((data) => {
//       setEmpList(data);
//     })
//     .catch((error) => console.log(error));
// };
// 전체 사원 출력
export const selectEmployees = async (setEmpList) =>
  // setEmps
  {
    const url = '/api/emp/emps';
    const list = await axios
      .get(url)
      .then((response) => {
        const arr = [];
        response.data.map((data, index) => {
          arr.push({
            id: index,
            empId: data.empId,
            empName: data.empName,
            position: data.position,
            responsibility: data.responsibility,
            salary: data.salary,
            commission: data.commission,
            hiredate: data.hiredate,
            unitName: data.unit.unitName,
            empBell: data.empBell,
            empMail: data.empMail,
            mobile: data.mobile,
            userRoleGrade: data.userRoleGrade,
            birthday: data.birthday,
            address: data.address,
            licensePlate: data.licensePlate,
            photo: data.photo,
          });
        });
        setEmpList(arr);
      })
      .catch((error) => console.log(error));
  };

// 사번으로 사원 검색
export const selectEmployeeByEmpId = async (empId, setEmpInfo) => {
  const urlStr = '/api/emp/' + empId;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => {
      setEmpInfo(data);
    })
    .catch((error) => console.log(error));
};

// accessToken으로 이름, 직위, id 가져오기
export const getMe = async (setEmpId) => {
  cookies.get('accessToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cookies.cookies.accessToken,
    },
  };
  const url = '/api/emp/me';

  await axios
    .get(url, config)
    .then((data) => {
      setEmpId(data.data.empId);
    })
    .catch((error) => console.log(error));
};

// 결재선 사원들 출력
export const getEmpListByUnitCode = async () => {
  cookies.get('accessToken');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cookies.cookies.accessToken,
    },
  };
  const url = '/api/approval/line/00030000';

  await axios
    .get(url, config)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

// 같은 부서내 사원 출력(자신 제외)
export const getEmpListInSameUnit = async (empId, setCEList) => {
  const url = '/api/emp/unit/list/';
  const urlStr = url + empId;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => {
      setCEList(data);
    })
    .catch((error) => console.log(error));
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
