import axios from 'axios';

export const findUnitByUnitId = async (unitCode, setUnit) => {
  console.log(unitCode);
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

export const insertUnitList = async (rows) => {
  console.log(rows);
  const header = { 'Content-Type': 'application/json' };
  const url = '/unit/list';

  const inputUnit = [];
  rows.forEach((element) => {
    console.log(element);
    inputUnit.push({
      unitCode: element[0],
      unitName: element[1],
      bell: element[2],
      unit: { parentUnit: element[3] },
    });
  });

  console.log(inputUnit);
  if (inputUnit.length !== 0) {
    const signupChk = axios.post(url, inputUnit, header).catch((error) => {
      console.log(error);
    });
    console.log(signupChk);
    signupChk.then((check) => {
      console.log(check);
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
  console.log(data);
  console.log(data.unitCode);
  const url = '/unit/';
  const urlStr = url + data.unitCode;
  await axios.delete(urlStr).catch((error) => console.log(error));
  window.location.href = '/management/unit';
};

// 조직 번호로 조직 업데이트 - 미완
export const updateUnit = async (data) => {
  console.log(data);
  // const url = '/unit/change';
  // await axios.put(url, data).catch((error) => console.log(error));
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
