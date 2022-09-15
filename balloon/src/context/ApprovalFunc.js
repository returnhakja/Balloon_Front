import {
  getDCByEmp,
  getDDByEmp,
  getDRByEmp,
  getDSByEmp,
  getABByEmp,
  getAOByEmp,
  getACByEmp,
  getARByEmp,
} from './ApprovalAxios';

export const getDCount = (
  empId,
  setDDCount,
  setDCCount,
  setDSCount,
  setDRCount
) => {
  getDDByEmp(empId, setDDCount);

  getDCByEmp(empId, setDCCount);

  getDSByEmp(empId, setDSCount);

  getDRByEmp(empId, setDRCount);
};

export const getACount = (
  empId,
  setABCount,
  setAOCount,
  setACCount,
  setARCount
) => {
  getABByEmp(empId, setABCount);

  getAOByEmp(empId, setAOCount);

  getACByEmp(empId, setACCount);

  getARByEmp(empId, setARCount);
};
