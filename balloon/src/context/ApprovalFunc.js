import {
  getDCByEmp,
  getDDByEmp,
  getDRByEmp,
  getDSByEmp,
  getABByEmp,
  getAOByEmp,
  getACByEmp,
  getARByEmp,
  getDDByEmpByDate,
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

export const getDCountByDate = (
  empId,
  setDDCount,
  setDCCount,
  setDSCount,
  setDRCount,
  sunDay,
  saturDay
) => {
  getDDByEmpByDate(empId, setDDCount, 1, sunDay, saturDay);

  getDDByEmpByDate(empId, setDCCount, 2, sunDay, saturDay);

  getDDByEmpByDate(empId, setDSCount, 3, sunDay, saturDay);

  getDDByEmpByDate(empId, setDRCount, 4, sunDay, saturDay);
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
