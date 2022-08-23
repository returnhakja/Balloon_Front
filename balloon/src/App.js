import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Home';
import MainPage from './components/MainPage';
import PrivateRoutes from './components/PrivateRoutes';

import LoginPage from './pages/login/LoginPage';

import Boxes from './pages/approval/Boxes';
import Dashboard from './pages/approval/Dashboard';
import Declare from './pages/approval/Declare';
import Complete from './pages/approval/Complete';
import Save from './pages/approval/Save';
import Refuese from './pages/approval/Refuese';
import ApprovalBefore from './pages/approval/ApprovalBefore';
import BusinessReport from './pages/approval/BusinessReport';

import BusinessTrip from './pages/approval/BusinessTrip';
import PersonnelAppointment from './pages/approval/PersonnelAppointment';
import ApprovalOngoing from './pages/approval/ApprovalOngoing';
import ApprovalComplete from './pages/approval/ApprovalComplete';
import ApprovalRefuse from './pages/approval/ApprovalRefuse';
import DocumentList from './pages/approval/DocumentList';
import BusinessReportInfo from './pages/approval/BusinessReportInfo';
import BusinessTripInfo from './pages/approval/BusinessTripInfo';
import PersonnelAppointmentInfo from './pages/approval/PersonnelAppointmentInfo';

import SavedBusinessReport from './pages/approval/SavedBusinessReport';
import SavedBusinessTrip from './pages/approval/SavedBusinessTrip';
import SavedPersonnelAppointment from './pages/approval/SavedPersonnelAppointment';

import CompleteBusinessReportInfo from './pages/approval/CompleteBusinessReportInfo';
import CompleteBusinessTripInfo from './pages/approval/CompleteBusinessTripInfo';
import CompletePersonnelAppointmentInfo from './pages/approval/CompletePersonnelAppointmentInfo';

import Calendar from './pages/calendar/Calendar';

import Chat from './pages/chat/Chat';
import ChatRoom from './pages/chat/ChatRoom';
import CreateRoom from './pages/chat/CreateRoom';
import ChatEmpList from './pages/chat/ChatEmpList';

import Organization from './pages/Organization';

import ManagementUnit from './pages/personnelManagement/ManagementUnit';
import ManagementEmployee from './pages/personnelManagement/ManagementEmployee';
import EmpAddPage from './pages/personnelManagement/EmpAddPage';
import EmpListAddPage from './pages/personnelManagement/EmpListAddPage';
import UnitListAddPage from './pages/personnelManagement/UnitListAddPage';
import ChatNotice from './pages/chat/ChatNotice';

import DeclaredBusinessReportInfo from './pages/approval/DeclaredBusinessReportInfo';
import DeclaredBusinessTripInfo from './pages/approval/DeclaredBusinessTripInfo';
import DeclaredPersonnelAppointmentInfo from './pages/approval/DeclaredPersonnelAppointmentInfo';

import NotFound from './pages/NotFound';

function App() {
  const [empInfo, setEmpInfo] = useState([]);
  const [isLogin, setLogin] = useState(null);

  // 채팅방 초대하기
  const [invite, setInvite] = useState([]);

  useEffect(() => {
    const l = localStorage.getItem('logged');
    l && JSON.parse(l) ? setLogin(true) : setLogin(false);
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
            logout={() => setLogin(false)}
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
          {/* 캘린더 */}
          <Route element={<Calendar />} path="/calendar" exact />

          {/* 결재관리 */}
          <Route path="/boxes" element={<Boxes />} />
          {/* <Route index  /> */}
          <Route path="/boxes/dd" element={<Declare />} />
          <Route path="/boxes/dc" element={<Complete />} />
          <Route path="/boxes/ds" element={<Save />} />
          <Route path="/boxes/dr" element={<Refuese />} />
          <Route path="/boxes/ab" element={<ApprovalBefore />} />
          <Route path="/boxes/ao" element={<ApprovalOngoing />} />
          <Route path="/boxes/ac" element={<ApprovalComplete />} />
          <Route path="/boxes/ar" element={<ApprovalRefuse />} />
          <Route path="/boxes/dl" element={<DocumentList />} />

          {/* 상세 정보 */}
          <Route path="/doc/br/:docId" element={<BusinessReportInfo />} />
          <Route path="/doc/tp/:docId" element={<BusinessTripInfo />} />
          <Route path="/doc/pa/:docId" element={<PersonnelAppointmentInfo />} />

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

          {/* 상신기안 상세 정보 */}
          <Route
            path="/doc/ddbr/:docId"
            element={<DeclaredBusinessReportInfo />}
          />
          <Route
            path="/doc/ddtp/:docId"
            element={<DeclaredBusinessTripInfo />}
          />
          <Route
            path="/doc/ddpa/:docId"
            element={<DeclaredPersonnelAppointmentInfo />}
          />

          {/* </Route> */}
          {/* 기안작성 */}
          <Route path="/draft/form" element={<Dashboard />} />
          <Route path="/draft/br" element={<BusinessReport />} />
          <Route path="/draft/bt" element={<BusinessTrip />} />
          <Route path="/draft/pa" element={<PersonnelAppointment />} />
          {/* 저장된 기안 */}
          <Route path="/draft/sdbr/:docId" element={<SavedBusinessReport />} />
          <Route path="/draft/sdbt/:docId" element={<SavedBusinessTrip />} />
          <Route
            path="/draft/sdpa/:docId"
            element={<SavedPersonnelAppointment />}
          />
          {/* 메신저 */}
          <Route
            path="/chatemplist"
            element={<ChatEmpList invite={invite} setInvite={setInvite} />}
          />
          <Route path="/chatlist" element={<ChatRoom />} />
          <Route path="/chatting" element={<Chat />} />
          <Route path="/createroom" element={<CreateRoom invite={invite} />} />
          <Route path="/chatnotice" element={<ChatNotice />} />
          {/* 조직관리 */}
          <Route path="/management/unit" element={<ManagementUnit />} />
          <Route path="/add/units" element={<UnitListAddPage />} />
          {/* 사원관리 */}
          <Route path="/management/employee" element={<ManagementEmployee />} />
          <Route path="/add/employee" element={<EmpAddPage />} />
          <Route path="/add/employees" element={<EmpListAddPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
