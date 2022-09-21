import axios from 'axios';
import Cookies from 'universal-cookie';
import { positionArr } from './EmpFunc';

// 쿠키를 사용할 수 있게 해주기
export const findCookieAccessToken = () => {
  const cookies = new Cookies();
  const cookie = cookies.get('accessToken');
  // console.log('accessToken:', cookie);

  return cookie;
};

// accessToken으로 이름, 직위, id 가져오기
export const getMe = async (setEmpInfo) => {
  const cookie = await findCookieAccessToken();
  // console.log(cookie);
  const config = {
    headers: {
      Authorization: 'Bearer ' + cookie,
    },
  };
  const url = '/employee/me';
  await axios
    .get(url, config)
    .then((response) => response.data)
    .then((data) => setEmpInfo(data))
    .catch((error) => console.log(error));
};

// 전체 사원 출력 (페이징)
export const selectEmployeeList = async (setEmpList) => {
  const url = '/employee/list';
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

// 전체 사원 출력 (리스트)
export const selectEmployees = async (setEmpList) => {
  const url = '/employee/emps';
  await axios
    .get(url)
    .then((response) => {
      const arr = [];
      response.data.map((data, index) => {
        return arr.push({
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

// 사번으로 Idcheck
export const selectEmpByEmpId = async (empId, setIdChk) => {
  const urlStr = '/employee/' + empId;
  await axios
    .get(urlStr)
    .then(() => {
      setIdChk(false);
      alert('이미사원번호가 있습니다.');
    })
    .catch((error) => {
      // console.log(error);
      if (empId.length > 8) {
        alert('사원번호가 8글자를 넘었습니다.');
      } else {
        alert('생성 가능한 사원번호입니다.');
      }
    });
};

// 사번으로 EmpInfo Get
export const getEmpByEmpId = async (empId, setBotInfo) => {
  const urlStr = '/employee/' + empId;
  await axios.get(urlStr).then((data) => {
    setBotInfo(data.data);
  });
};

export const findEmpByEmpIdByAdmin = async (empId, setEmployee) => {
  const urlStr = '/employee/' + empId;
  await axios.get(urlStr).then((response) => setEmployee(response.data));
};

// 사번으로 사원 검색 후, 정보 넣기
export const setEmpInfoByEmpId = async (empId, setEmpInfo) => {
  const urlStr = '/employee/' + empId;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => {
      setEmpInfo(data);
    })
    .catch((error) => console.log(error));
};

// 결재선 사원들 출력
export const getEmpListByUnitCode = async () => {
  const cookie = findCookieAccessToken();
  console.log('getEmpCookie', cookie);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + cookie,
    },
  };
  const url = '/employee/approval/line/00030000';

  await axios.get(url, config).catch((error) => console.log(error));
};

// 같은 부서내 사원 출력(자신 제외)
export const getEmpListInSameUnit = async (empId, setCEList) => {
  const url = '/employee/unit/list/';
  const urlStr = url + empId;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => {
      setCEList(data);
    })
    .catch((error) => console.log(error));
};

// 같은 부서내 결재 사원 출력(자신 제외, 인턴 제외)
export const getApvrListInSameUnit = async (empId, position, setCEList) => {
  const url = '/employee/apvr/unit/list/';
  const urlStr = url + empId;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => {
      const positionNum = positionArr.indexOf(position);
      setCEList(
        data.filter((v) => positionArr.indexOf(v.position) > positionNum)
      );
      // setCEList(data);
    })
    .catch((error) => console.log(error));
};

export const updateEmpByAdmin = async (updateData) => {
  const url = '/employee/update/admin';
  await axios.put(url, updateData).catch((error) => console.log(error));
};

// 사원 수정
export const updateEmployee = async (updateData) => {
  const url = `/employee/update/mypage`;

  await axios
    .put(url, updateData, process.env.REACT_APP_HEADER)
    .catch((error) => {
      console.log(error);
    });

  window.location.href = '/mypage';
};

// 사번으로 사원 삭제
export const deleteEmployee = async (data) => {
  const url = `/employee/${data.empId}`;
  await axios.delete(url).catch((error) => console.log(error));
  window.location.href = '/management/employee';
};

export const uploadProfile = async (profile, empId) => {
  console.log('empId', empId);
  console.log('profile', profile);
  const url = '/file/upload/profile/' + empId;

  await axios.post(url, profile).catch((error) => console.log(error));
};
