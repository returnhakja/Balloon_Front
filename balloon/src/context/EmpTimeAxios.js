import axios from 'axios';

export const findWorkOn = async (empId, setInCnt) => {
  const url = `/time/on/${empId}`;
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setInCnt(data))
    .catch((error) => console.log(error));
};

export const findWorkOff = async (empId, setOutCnt) => {
  const url = `/time/off/${empId}`;
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setOutCnt(data))
    .catch((error) => console.log(error));
};

export const findWorkIn = async (empId) => {
  const url = `/time/in/${empId}`;
  await axios
    .post(url)
    .then((response) => response.data)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

export const startWork = async (empId, setWorkStatus) => {
  const url = `/time/attendance/${empId}`;
  await axios
    .post(url)
    .then((response) => response.data)
    .then((data) => setWorkStatus(data))
    .catch((error) => console.log(error));
};

export const endWork = async (empId, setWorkStatus) => {
  const url = `/time/leave/${empId}`;
  await axios
    .put(url)
    .then((response) => response.data)
    .then((data) => setWorkStatus(data))
    .catch((error) => console.log(error));
};

// export const endlessWork = async (empId, setWorkStatus) => {
//   // const url = `/time/night/${empId}`;
//   await axios
//     .put(url)
//     .then((response) => response.data)
//     .then((data) => setWorkStatus(data))
//     .catch((error) => console.log(error));
// };
