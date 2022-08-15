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

export const findUnitList = async (setUnits) => {
  const url = '/api/unit/units';
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setUnits(data))
    .catch((error) => console.log(error));
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
