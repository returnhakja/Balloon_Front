import axios from 'axios';

export const findUnitByUnitId = async (unitCode, setUnit) => {
  console.log(unitCode);
  const url = '/api/unit/';
  const urlStr = url + unitCode;
  await axios
    .get(urlStr)
    .then((response) => response.data)
    .then((data) => setUnit(data))
    .catch((error) => console.log(error));
};

// List로 unit 가져오기
export const findUnitList = async (setUnits) => {
  const url = '/api/unit/units';
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setUnits(data))
    .catch((error) => console.log(error));
};

// 사번으로 사원 삭제
export const deleteUnit = async (data) => {
  console.log(data);
  const url = '/api/unit/';
  const urlStr = url + data.unitCode;
  await axios.delete(urlStr).catch((error) => console.log(error));
  window.location.href = '/management/unit';
};

export const updateUnit = async (data) => {
  console.log(data);
  // const url = '/api/unit';
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
