import axios from 'axios';

export const findUnitList = async (setUnits) => {
  const url = '/api/unit/00000000';
  await axios
    .get(url)
    .then((response) => response.data)
    .then((data) => setUnits(data))
    .catch((error) => console.log(error));
};
