import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Home';
import MainPage from './components/MainPage';
import PrivateRoutes from './components/PrivateRoutes';

import LoginPage from './pages/login/LoginPage';

import Boxes from './pages/approval/Boxes';
import Declare from './pages/approval/Declare';
import Complete from './pages/approval/Complete';
import Save from './pages/approval/Save';
import Refuese from './pages/approval/Refuese';
import ApprovalBefore from './pages/approval/ApprovalBefore';
import ApprovalOngoing from './pages/approval/ApprovalOngoing';
import ApprovalComplete from './pages/approval/ApprovalComplete';
import ApprovalRefuse from './pages/approval/ApprovalRefuse';
import DocumentList from './pages/approval/DocumentList';

import BusinessReportInfo from './pages/approval/BusinessReportInfo';
import BusinessTripInfo from './pages/approval/BusinessTripInfo';
import PersonnelAppointmentInfo from './pages/approval/PersonnelAppointmentInfo';

import CompleteBusinessReportInfo from './pages/approval/CompleteBusinessReportInfo';
import CompleteBusinessTripInfo from './pages/approval/CompleteBusinessTripInfo';
import CompletePersonnelAppointmentInfo from './pages/approval/CompletePersonnelAppointmentInfo';

import DeclaredBusinessReportInfo from './pages/approval/DeclaredBusinessReportInfo';
import DeclaredBusinessTripInfo from './pages/approval/DeclaredBusinessTripInfo';
import DeclaredPersonnelAppointmentInfo from './pages/approval/DeclaredPersonnelAppointmentInfo';

import Dashboard from './pages/approval/Dashboard';
import BusinessReport from './pages/approval/BusinessReport';
import BusinessTrip from './pages/approval/BusinessTrip';
import PersonnelAppointment from './pages/approval/PersonnelAppointment';

import SavedBusinessReportInfo from './pages/approval/SavedBusinessReportInfo';
import SavedBusinessTripInfo from './pages/approval/SavedBusinessTripInfo';
import SavedPersonnelAppointmentInfo from './pages/approval/SavedPersonnelAppointmentInfo';

import BizRptApprovalDeclare from './pages/approval/BizRptApprovalDeclare';
import BizTpApprovalDeclare from './pages/approval/BizTpApprovalDeclare';
import PAApprovalDeclare from './pages/approval/PAApprovalDeclare';

import RefusedBusinessReportInfo from './pages/approval/RefusedBusinessReportInfo';
import RefusedBusinessTripInfo from './pages/approval/RefusedBusinessTripInfo';
import RefusedPersonnelAppointmentInfo from './pages/approval/RefusedPersonnelAppointmentInfo';

import Calendar from './pages/calendar/Calendar';

import Organization from './pages/Organization';

import ManagementUnit from './pages/personnelManagement/ManagementUnit';
import UnitAddpage from './pages/personnelManagement/UnitAddpage';
import UnitListAddPage from './pages/personnelManagement/UnitListAddPage';

import ManagementEmployee from './pages/personnelManagement/ManagementEmployee';
import EmpAddPage from './pages/personnelManagement/EmpAddPage';
import EmpListAddPage from './pages/personnelManagement/EmpListAddPage';

import MyPage from './pages/mypage/MyPage';
import UpdateMine from './pages/mypage/UpdateMine';

import NotFound from './pages/NotFound';
import AdminRoutes from './components/AdminRoutes';
import DeclareOn from './pages/approval/DeclareOn';

function App() {
  const [empInfo, setEmpInfo] = useState([]);
  const [isLogin, setLogin] = useState(null);
  const role = empInfo.userRoleGrade;

  useEffect(() => {
    const logged = localStorage.getItem('logged');
    logged && logged === 'true' ? setLogin(true) : setLogin(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('logged', isLogin);
  }, [isLogin]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            empInfo={empInfo}
            setEmpInfo={setEmpInfo}
            logout={() => {
              setLogin(false);
            }}
            isLogin={isLogin}
          />
        }>
        <Route index element={<MainPage />} />
        {/* 로그인 */}
        {!isLogin ? (
          <Route
            path="/loginpage"
            element={<LoginPage authenticate={() => setLogin(true)} />}
          />
        ) : (
          <Route path="/loginpage" element={<Navigate to="/" />} />
        )}

        {/* 조직도 */}
        <Route path="/organization">
          <Route index element={<Organization />} />
        </Route>

        {/* Private Routes */}
        <Route
          element={
            <PrivateRoutes
              empInfo={empInfo}
              setEmpInfo={setEmpInfo}
              isLogin={isLogin}
              setLogin={setLogin}
            />
          }>
          {/* 결재관리 */}
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/boxes/dd" element={<Declare />} />
          <Route path="/boxes/do" element={<DeclareOn />} />
          <Route path="/boxes/dc" element={<Complete />} />
          <Route path="/boxes/ds" element={<Save />} />
          <Route path="/boxes/dr" element={<Refuese />} />
          <Route path="/boxes/ab" element={<ApprovalBefore />} />
          <Route path="/boxes/ao" element={<ApprovalOngoing />} />
          <Route path="/boxes/ac" element={<ApprovalComplete />} />
          <Route path="/boxes/ar" element={<ApprovalRefuse />} />
          <Route path="/boxes/dl" element={<DocumentList />} />

          {/* 상세 정보 */}

          {[
            '/doc/br/:docId',
            '/apvl/aobr/:docId',
            '/apvl/acbr/:docId',
            '/apvl/arbr/:docId',
          ].map((path) => (
            <Route path={path} key={path} element={<BusinessReportInfo />} />
          ))}

          {[
            '/doc/tp/:docId',
            '/apvl/aotp/:docId',
            '/apvl/actp/:docId',
            '/apvl/artp/:docId',
          ].map((path) => (
            <Route path={path} key={path} element={<BusinessTripInfo />} />
          ))}

          {[
            '/doc/pa/:docId',
            '/apvl/aopa/:docId',
            '/apvl/acpa/:docId',
            '/apvl/arpa/:docId',
          ].map((path) => (
            <Route
              path={path}
              key={path}
              element={<PersonnelAppointmentInfo />}
            />
          ))}

          {/* 문서대장 상세 정보 */}
          <Route
            path="/doc/cpbr/:docId"
            element={<CompleteBusinessReportInfo />}
          />
          <Route
            path="/doc/cptp/:docId"
            element={<CompleteBusinessTripInfo />}
          />
          <Route
            path="/doc/cppa/:docId"
            element={<CompletePersonnelAppointmentInfo />}
          />

          {/* 상신기안 / (상신기준)반려된 상세 정보 */}
          {['/doc/ddbr/:docId', '/doc/drbr/:docId'].map((path) => (
            <Route
              path={path}
              key={path}
              element={<DeclaredBusinessReportInfo />}
            />
          ))}
          {['/doc/ddtp/:docId', '/doc/drtp/:docId'].map((path) => (
            <Route
              path={path}
              key={path}
              element={<DeclaredBusinessTripInfo />}
            />
          ))}
          {['/doc/ddpa/:docId', '/doc/drpa/:docId'].map((path) => (
            <Route
              path={path}
              key={path}
              element={<DeclaredPersonnelAppointmentInfo />}
            />
          ))}

          {/* 반려된 기안 상세 정보
          <Route
            path="/doc/drbr/:docId"
            element={<RefusedBusinessReportInfo />}
          />
          <Route
            path="/doc/drtp/:docId"
            element={<RefusedBusinessTripInfo />}
          />
          <Route
            path="/doc/drpa/:docId"
            element={<RefusedPersonnelAppointmentInfo />}
          /> */}

          {/* 기안작성 */}
          <Route path="/draft/form" element={<Dashboard />} />
          <Route path="/draft/br" element={<BusinessReport />} />
          <Route path="/draft/bt" element={<BusinessTrip />} />
          <Route path="/draft/pa" element={<PersonnelAppointment />} />

          {/* 저장된 기안 */}
          <Route
            path="/draft/sdbr/:docId"
            element={<SavedBusinessReportInfo />}
          />
          <Route
            path="/draft/sdbt/:docId"
            element={<SavedBusinessTripInfo />}
          />
          <Route
            path="/draft/sdpa/:docId"
            element={<SavedPersonnelAppointmentInfo />}
          />

          {/* 결재 상세 정보 */}
          <Route path="/apvl/abbr/:docId" element={<BizRptApprovalDeclare />} />
          <Route path="/apvl/abtp/:docId" element={<BizTpApprovalDeclare />} />
          <Route path="/apvl/abpa/:docId" element={<PAApprovalDeclare />} />

          {/* 캘린더 */}

          <Route element={<Calendar />} path="/schudule" exact />

          <Route
            element={
              <AdminRoutes
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                role={role}
              />
            }>
            {/* 조직관리 */}
            <Route path="/management/unit" element={<ManagementUnit />} />
            <Route path="/add/units" element={<UnitListAddPage />} />
            <Route path="/add/unit" element={<UnitAddpage />} />

            {/* 사원관리 */}
            <Route
              path="/management/employee"
              element={<ManagementEmployee />}
            />
            <Route path="/add/employee" element={<EmpAddPage />} />
            <Route path="/add/employees" element={<EmpListAddPage />} />
          </Route>

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/update" element={<UpdateMine />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
