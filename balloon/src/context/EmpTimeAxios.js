import axios from 'axios';

export const findWorkIn = async (empId, setWorkStatus) => {
  const url = `/time/on/${empId}`;
  await axios
    .post(url)
    .then((response) => response.data)
    .then((data) => setWorkStatus(data))
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
