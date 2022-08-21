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

// 최근 문서번호 가져오기 ------------------------------------------------
// 가장 최근 업무기안 번호 가져옴
export const getLatestBizRpt = async (setDocNum) => {
  const url = '/api/bizrpt/wd';
  await axios.get(url).then((res) => {
    const docId = res.data.businessReportId;
    console.log(docId);
    const docNum = docId.substr(8, 7);
    console.log(docNum);
    setDocNum(parseInt(docNum));
  });
};

// 가장 최근 출장계획 번호 가져옴
export const getLatestBizTP = async (setDocNum) => {
  const url = '/api/biztp/wd';
  await axios
    .get(url)
    .then((res) => {
      console.log(res);
      const docId = res.data.businessTripId;
      console.log(docId);
      const docNum = docId.substr(8, 7);
      console.log(docNum);
      setDocNum(parseInt(docNum));
    })
    .catch(() => {
      setDocNum(0);
    });
};

// 가장 최근 인사명령 번호 가져옴
export const getLatestPA = async (setDocNum) => {
  const url = '/api/pa/wd';
  await axios
    .get(url)
    .then((res) => {
      console.log(res);
      const docId = res.data.personnelAppointmentId;
      console.log(docId);
      const docNum = docId.substr(8, 7);
      console.log(docNum);
      setDocNum(parseInt(docNum));
    })
    .catch(() => {
      setDocNum(0);
    });
};

// ---------------------------------------

// 업무 기안 상신
export const insertBizRpt = async (
  docId,
  docStatus,
  inputData,
  empInfo,
  setInputData
) => {
  const bizRptTitle = document.getElementById('bizRptTitle');
  const bizRptContent = document.getElementById('bizRptContent');
  console.log(docStatus);

  const url = '/api/bizrpt';

  const headers = {
    'Content-Type': 'application/json',
  };

  inputData = {
    businessReportId: docId,
    documentTitle: bizRptTitle.value,
    documentContent: bizRptContent.value,
    documentStatus: docStatus,
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
  docId,
  docStatus,
  inputData,
  empInfo,
  startDate,
  endDate,
  setInputData
) => {
  const bizTpTitle = document.getElementById('bizTpTitle');
  const bizTpContent = document.getElementById('bizTpContent');
  const destination = document.getElementById('destination');
  const visitingPurpose = document.getElementById('visitingPurpose');

  const url = '/api/biztp';

  const headers = {
    'Content-Type': 'application/json',
  };

  console.log(docStatus);
  inputData = {
    businessTripId: docId,
    documentTitle: bizTpTitle.value,
    documentContent: bizTpContent.value,
    documentStatus: docStatus,
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
  docId,
  docStatus,
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
    personnelAppointmentId: docId,
    documentTitle: pATitle.value,
    documentContent: pAContent.value,
    documentStatus: docStatus,
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
