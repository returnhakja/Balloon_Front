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
  console.log(empInfo);
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
  // const startValue = document.getElementById('startValue');
  // const endValue = document.getElementById('endValue');

  console.log(startDate);
  console.log(endDate);
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

  console.log(mEmp.empId);
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
    movedEmp: {
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

// 문서 삭제 ------------------------------------------------

export const deleteBizRpt = async (docId) => {
  const url = '/api/bizrpt/';
  const str = url + docId;
  console.log(str);
  await axios.delete(str);
};

export const deleteBizTp = async (docId) => {
  const url = '/api/biztp/';
  const str = url + docId;
  console.log(str);
  await axios.delete(str);
};

export const deletePA = async (docId) => {
  const url = '/api/pa/';
  const str = url + docId;
  console.log(str);
  await axios.delete(str);
};

// 결재 pk 가져오기 -------------------------------------------
export const getApvlId = async (docId, apvrId) => {
  const url = '/api/apvl/apvlid/';
  const str = url + docId + '/' + apvrId;
  let approverId = 0;
  await axios.get(str).then((res) => {
    if (res.data !== null) {
      console.log(res.data.approvalId);
      approverId = res.data.approvalId;
    } else {
      approverId = null;
    }
  });
  console.log(approverId);
  return approverId;
};

// 결재 생성 -------------------------------------------------

export const insertApproval = async (
  docId,
  docStatus,
  apvr,
  inputData,
  empInfo,
  approvalId
) => {
  const url = '/api/apvl';

  const headers = {
    'Content-Type': 'application/json',
  };
  console.log(docId);
  console.log(docStatus);
  console.log(empInfo);
  console.log(apvr);
  console.log(inputData);
  console.log(approvalId);

  if (docId.includes('업무기안')) {
    inputData = {
      approvalId: approvalId,
      approvalStatus: docStatus,
      approverName: apvr.empName,
      position: apvr.position,
      drafterName: empInfo && empInfo.empName,
      drafterEmp: {
        empId: empInfo && empInfo.empId,
      },
      approverEmp: {
        empId: apvr.empId,
      },
      businessReport: {
        businessReportId: docId,
      },
    };
  } else if (docId.includes('출장계획')) {
    inputData = {
      approvalId: approvalId,
      approvalStatus: docStatus,
      approverName: apvr.empName,
      position: apvr.position,
      drafterName: empInfo && empInfo.empName,
      drafterEmp: {
        empId: empInfo && empInfo.empId,
      },
      approverEmp: {
        empId: apvr.empId,
      },
      businessTrip: {
        businessTripId: docId,
      },
    };
  } else if (docId.includes('인사명령')) {
    inputData = {
      approvalId: approvalId,
      approvalStatus: docStatus,
      approverName: apvr.empName,
      position: apvr.position,
      drafterName: empInfo && empInfo.empName,
      drafterEmp: {
        empId: empInfo && empInfo.empId,
      },
      approverEmp: {
        empId: apvr.empId,
      },
      personnelAppointment: {
        personnelAppointmentId: docId,
      },
    };
  } else {
    alert('문서가 잘못되었습니다.');
  }

  console.log(inputData);
  await axios.post(url, inputData, { headers });
};

export const getApvlByApvrIdAnddocStatus = async (
  apporver,
  docStatus,
  setDocList
) => {
  const url = '/api/apvl/';
  const str = url + apporver + '/' + docStatus;
  await axios.get(str).then((res) => {
    console.log(res.data);
    const docList = [];
    res.data.map((data) => {
      if (data.businessReport != null) {
        const bizRptDoc = {
          docId: data.businessReport.businessReportId,
          documentTitle: data.businessReport.documentTitle,
          updateTime: data.businessReport.updateDate,
        };
        docList.push(bizRptDoc);
      } else if (data.businessTrip != null) {
        const bizTpDoc = {
          docId: data.businessTrip.businessTripId,
          documentTitle: data.businessTrip.documentTitle,
          updateTime: data.businessTrip.updateDate,
        };
        docList.push(bizTpDoc);
      } else if (data.personnelAppointment != null) {
        const PADoc = {
          docId: data.personnelAppointment.personnelAppointmentId,
          documentTitle: data.personnelAppointment.documentTitle,
          updateTime: data.personnelAppointment.updateDate,
        };
        docList.push(PADoc);
      } else {
        alert('유요하지 않은 요청');
      }
    });
    console.log(docList);
    setDocList(docList);
  });
};

export const getApvlByDocId = async (docId, setApprover, setSvApprover) => {
  const url = '/api/apvl/';
  const str = url + docId;

  await axios.get(str).then((res) => {
    console.log(res.data);
    let apvrList = [];
    res.data.map((apvl) => {
      apvrList.push(apvl.approverEmp);
    });
    console.log(apvrList);
    setApprover(apvrList);
    setSvApprover(apvrList);
  });
};

// 결재하는 axios
export const updateApproval = async (apvl, state) => {
  const apvlCom = document.getElementById('apvlContent');
  let inputData = {};
  const url = '/api/apvl';
  // const str = url + apvl.approvalId;
  const headers = {
    'Content-Type': 'application/json',
  };

  if (apvl.businessReport != null) {
    inputData = {
      approvalId: apvl.approvalId,
      approvalStatus: state,
      approvalComment: apvlCom.value,
      approverName: apvl.approverName,
      position: apvl.position,
      drafterName: apvl.drafterName,
      drafterEmp: {
        empId: apvl && apvl.drafterEmp.empId,
      },
      approverEmp: {
        epmId: apvl && apvl.approverEmp.empId,
      },
      businessReport: {
        businessReportId: apvl && apvl.businessReport.businessReportId,
      },
    };
  } else if (apvl.businessTrip != null) {
    inputData = {
      approvalId: apvl.approvalId,
      approvalStatus: state,
      approvalComment: apvlCom.value,
      approverName: apvl.approverName,
      position: apvl.position,
      drafterName: apvl.drafterName,
      drafterEmp: {
        empId: apvl && apvl.drafterEmp.empId,
      },
      approverEmp: {
        epmId: apvl && apvl.approverEmp.empId,
      },
      businessTrip: {
        businessTripId: apvl && apvl.businessTrip.businessTripId,
      },
    };
  } else if (apvl.personnelAppointment != null) {
    inputData = {
      approvalId: apvl.approvalId,
      approvalStatus: state,
      approvalComment: apvlCom.value,
      approverName: apvl.approverName,
      position: apvl.position,
      drafterName: apvl.drafterName,
      drafterEmp: {
        empId: apvl && apvl.drafterEmp.empId,
      },
      approverEmp: {
        epmId: apvl && apvl.approverEmp.empId,
      },
      personnelAppointment: {
        personnelAppointmentId:
          apvl && apvl.personnelAppointment.personnelAppointmentId,
      },
    };
  } else {
    alert('문서가 잘못되었습니다.');
  }
  console.log(inputData);
  await axios.post(url, inputData, { headers });
};

export const updateApvlDoc = async (apvl, state, paInfo) => {
  console.log(apvl);
  console.log(paInfo);
  let url = '';
  let inputData = {};

  const headers = {
    'Content-Type': 'application/json',
  };

  if (apvl.businessReport != null) {
    url = '/api/bizrpt';
    const bizRpt = apvl.businessReport;
    inputData = {
      businessReportId: bizRpt.businessReportId,
      documentTitle: bizRpt.documentTitle,
      documentContent: bizRpt.documentContent,
      documentStatus: state,
      empName: bizRpt.empName,
      position: bizRpt.position,
      unitName: bizRpt.unitName,
      unit: {
        unitCode: apvl && apvl.emp.unit.unitCode,
      },
      emp: {
        empId: apvl && apvl.emp.empId,
      },
    };
  } else if (apvl.businessTrip != null) {
    url = '/api/biztp';
    const bizTp = apvl.businessTrip;
    inputData = {
      businessTripId: bizTp.businessTripId,
      documentTitle: bizTp.documentTitle,
      documentContent: bizTp.documentContent,
      documentStatus: state,
      startDate: bizTp.startDate,
      endDate: bizTp.endDate,
      destination: bizTp.destination,
      visitingPurpose: bizTp.visitingPurpose,
      empName: bizTp.empName,
      position: bizTp.position,
      unitName: bizTp.unitName,
      unit: {
        unitCode: apvl && apvl.emp.unit.unitCode,
      },
      emp: {
        empId: apvl && apvl.emp.empId,
      },
    };
  } else if (apvl.personnelAppointment != null) {
    console.log(apvl);
    url = '/api/pa';
    const pa = apvl.personnelAppointment;
    inputData = {
      personnelAppointmentId: pa.personnelAppointmentId,
      documentTitle: pa.documentTitle,
      documentContent: pa.documentContent,
      documentStatus: state,
      personnelDate: pa.personnelDate,
      position: pa.position,
      unitName: pa.unitName,
      movedEmpName: pa.movedEmpName,
      empName: pa.empName,
      movedEmpId: {
        empId: paInfo.movedEmpId && paInfo.movedEmpId.empId,
      },
      unit: {
        unitCode: paInfo.unit && paInfo.unit.unitCode,
      },
      emp: {
        empId: paInfo.emp && paInfo.emp.empId,
      },
    };
  } else {
    alert('문서가 잘못되었습니다.');
  }
  console.log(inputData);

  await axios.post(url, inputData, { headers });
};

export const deleteApvlByDocIdAndEmpId = async (docId, empId) => {
  const url = '/api/apvl/';
  const str = url + docId + '/' + empId;
  console.log(docId);
  console.log(empId);
  await axios.delete(str);
};
