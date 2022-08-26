import {
  getDCByEmp,
  getDDByEmp,
  getDRByEmp,
  getDSByEmp,
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
