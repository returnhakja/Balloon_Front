import axios from 'axios';

// 내가(empId) 올린 문서
export const getDocsByEmp = async (empId, docStatus, setdocList) => {
  const url = '/api/box/empdocs/';
  const str = url + empId + '/' + docStatus;
  await axios.get(str).then((res) => {
    console.log(res.data.length);
    setdocList(res.data);
  });
};

// 문서 수 가져오기---------------------------------------
export const getDDByEmp = async (empId, setDDCount) => {
  const url = '/api/box/empdocs/';
  const str = url + empId + '/' + 1;
  await axios.get(str).then((res) => {
    console.log(res.data.length);
    setDDCount(res.data.length);
  });
};
export const getDCByEmp = async (empId, setDCCount) => {
  const url = '/api/box/empdocs/';
  const str = url + empId + '/' + 2;
  await axios.get(str).then((res) => {
    console.log(res.data.length);
    setDCCount(res.data.length);
  });
};
export const getDSByEmp = async (empId, setDSCount) => {
  const url = '/api/box/empdocs/';
  const str = url + empId + '/' + 3;
  await axios.get(str).then((res) => {
    console.log(res.data.length);
    setDSCount(res.data.length);
  });
};
export const getDRByEmp = async (empId, setDRCount) => {
  const url = '/api/box/empdocs/';
  const str = url + empId + '/' + 4;
  await axios.get(str).then((res) => {
    console.log(res.data.length);
    setDRCount(res.data.length);
  });
};
// ---------------------------------------

// 완료된 문서(부서확인용)
export const getDocsByUnit = async (unitCode, setdocList) => {
  const url = '/api/box/unitdocs/';
  const str = url + unitCode;
  await axios.get(str).then((res) => {
    console.log(res.data);
    setdocList(res.data);
  });
};

// 업무 보고 기안 정보
export const getBizRptByBizRptId = async (bizRptId, setBizRptInfo) => {
  const url = '/api/bizrpt/';
  const str = url + bizRptId;
  await axios.get(str).then((res) => {
    console.log(res.data);
    setBizRptInfo(res.data);
  });
};

// 출장 보고 기안 정보
export const getBizTpByBizTpId = async (bizTpId, setBizTpInfo) => {
  const url = '/api/biztp/';
  const str = url + bizTpId;
  await axios.get(str).then((res) => {
    console.log(res.data);
    setBizTpInfo(res.data);
  });
};

// 동반 출장자 정보
export const getBizTpEmpByBizTpId = async (bizTpId, setBizTpEmp) => {
  const url = '/api/biztpemp/';
  const str = url + bizTpId;
  await axios.get(str).then((res) => {
    console.log(res.data);
    setBizTpEmp(res.data);
  });
};

// 인사 명령 기안 정보
export const getPAByPAId = async (PAId, setPAInfo) => {
  const url = '/api/pa/';
  const str = url + PAId;
  await axios.get(str).then((res) => {
    console.log(res.data);
    setPAInfo(res.data);
  });
};

// 업무 기안 상신
export const insertBizRpt = async (inputData, empInfo, setInputData) => {
  const bizRptId = document.getElementById('bizRptId');
  const bizRptTitle = document.getElementById('bizRptTitle');
  const bizRptContent = document.getElementById('bizRptContent');

  const url = '/api/bizrpt';

  const headers = {
    'Content-Type': 'application/json',
  };

  inputData = {
    businessReportId: bizRptId.value,
    documentTitle: bizRptTitle.value,
    documentContent: bizRptContent.value,
    empName: empInfo.empName,
    position: empInfo.position,
    unitName: empInfo.unit && empInfo.unit.unitName,
    unit: {
      unitCode: empInfo.unit && empInfo.unit.unitCode,
    },
    emp: {
      empId: empInfo.empId,
    },
  };
  console.log(inputData);
  console.log(empInfo);

  await axios.post(url, inputData, { headers });
};

// 출장 계획 상신
export const insertBizTp = async (
  inputData,
  empInfo,
  startDate,
  endDate,
  setInputData
) => {
  const bizTpId = document.getElementById('bizTpId');
  const bizTpTitle = document.getElementById('bizTpTitle');
  const bizTpContent = document.getElementById('bizTpContent');
  const destination = document.getElementById('destination');
  const visitingPurpose = document.getElementById('visitingPurpose');

  const url = '/api/biztp';

  const headers = {
    'Content-Type': 'application/json',
  };

  inputData = {
    businessTripId: bizTpId.value,
    documentTitle: bizTpTitle.value,
    documentContent: bizTpContent.value,
    startDate: startDate,
    endDate: endDate,
    destination: destination.value,
    visitingPurpose: visitingPurpose.value,
    empName: empInfo.empName,
    position: empInfo.position,
    unitName: empInfo.unit && empInfo.unit.unitName,
    unit: {
      unitCode: empInfo.unit && empInfo.unit.unitCode,
    },
    emp: {
      empId: empInfo.empId,
    },
  };
  console.log(inputData);
  console.log(empInfo);

  await axios.post(url, inputData, { headers });
};

// 인사 명령 상신
export const insertPA = async (
  inputData,
  empInfo,
  startDate,
  mEmp,
  unit,
  posi,
  setInputData
) => {
  const pAId = document.getElementById('PAId');
  const pATitle = document.getElementById('PATitle');
  const pAContent = document.getElementById('PAContent');

  console.log(mEmp);
  console.log(posi);
  console.log(unit);
  const url = '/api/pa';

  const headers = {
    'Content-Type': 'application/json',
  };

  inputData = {
    personnelAppointmentId: pAId.value,
    documentTitle: pATitle.value,
    documentContent: pAContent.value,
    personnelDate: startDate,
    position: posi,
    unitName: unit.unitName,
    movedEmpName: mEmp.empName,
    empName: empInfo.empName,
    movedEmpId: {
      empId: mEmp && mEmp.empId,
    },
    unit: {
      unitCode: empInfo.unit && empInfo.unit.unitCode,
    },
    emp: {
      empId: empInfo.empId,
    },
  };
  console.log(inputData);
  console.log(empInfo);

  await axios.post(url, inputData, { headers });
};
