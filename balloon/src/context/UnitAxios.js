import axios from 'axios';

export const findUnitByUnitId = async (unitCode, setUnit) => {
  const url = '/unit/';
  const urlStr = url + unitCode;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => setUnit(data))
    .catch((error) => console.log(error));
};

// List로 unit 가져오기
export const findUnitList = async (setUnits) => {
  const url = '/unit/units';
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setUnits(data))
    .catch((error) => console.log(error));
};

export const findHigherOrganization = async (setHigher) => {
  const url = '/unit/higherorganization';
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setHigher(data))
    .catch((error) => console.log(error));
};

export const insertUnit = async (unitInfo) => {
  const inputUnit = {
    unitCode: unitInfo.unitCode,
    unitName: unitInfo.unitName,
    bell: unitInfo.bell,
    parentUnit: { unitCode: unitInfo.parentUnit },
  };
  const header = { 'Content-Type': 'application/json' };
  const url = '/unit/add';

  await axios.post(url, inputUnit, header).catch((error) => console.log(error));
};

export const insertUnitList = async (rows) => {
  const header = { 'Content-Type': 'application/json' };
  const url = '/unit/list';

  const inputUnit = [];
  rows.forEach((element) => {
    inputUnit.push({
      unitCode: element[0],
      unitName: element[1],
      bell: element[2],
      parentUnit: { unitCode: element[3] },
    });
  });

  if (inputUnit.length !== 0) {
    const signupChk = axios.post(url, inputUnit, header).catch((error) => {
      console.log(error);
    });
    signupChk.then((check) => {
      if (check.data === true) {
        window.location.href = '/management/unit';
      } else {
        alert('정보가 잘못되었습니다.');
      }
    });
  }
};

// 조직번호로 조직 삭제
export const deleteUnit = async (data) => {
  const url = '/unit/';
  const urlStr = url + data.unitCode;
  await axios.delete(urlStr).catch((error) => console.log(error));
  window.location.href = '/management/unit';
};

// 조직 번호로 조직 업데이트 - 미완
export const updateUnit = async (data) => {
  const url = '/unit/change';
  await axios.put(url, data).catch((error) => console.log(error));
  window.location.href = '/management/unit';
};

// export const findUnitsByUnitId = async (unitCode, setUnit, unit) => {
//   console.log(unitCode);
//   const url = '/api/unit/';
//   const urlStr = url + unitCode;

//   await axios
//     .get(urlStr)
//     .then((response) => response.data)
//     .then((data) => setUnit([...unit, data]))
//     .catch((error) => console.log(error));
// };
