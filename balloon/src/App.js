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
import Businessreport from './pages/approval/Businessreport';
import Businesstrip from './pages/approval/Businesstrip';
import Persnelappointment from './pages/approval/Persnelappointment';
import ApprovalOngoing from './pages/approval/ApprovalOngoing';
import ApprovalComplete from './pages/approval/ApprovalComplete';
import ApprovalRefuse from './pages/approval/ApprovalRefuse';
import DocumentList from './pages/approval/DocumentList';
import BusinessreportInfo from './pages/approval/BusinessreportInfo';
import BusinessTripInfo from './pages/approval/BusinesstripInfo';
import PersnelappointmentInfo from './pages/approval/PersnelappointmentInfo';

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
          <Route path="/doc/br" element={<BusinessreportInfo />} />
          <Route path="/doc/br/:docId" element={<BusinessreportInfo />} />
          <Route path="/doc/tp" element={<BusinessTripInfo />} />
          <Route path="/doc/tp/:docId" element={<BusinessTripInfo />} />
          <Route path="/doc/pa" element={<PersnelappointmentInfo />} />
          <Route path="/doc/pa/:docId" element={<PersnelappointmentInfo />} />

          {/* </Route> */}
          {/* 기안작성 */}
          <Route path="/dratf/form" element={<Dashboard />} />
          <Route path="/dratf/br" element={<Businessreport />} />
          <Route path="/dratf/bt" element={<Businesstrip />} />
          <Route path="/dratf/pa" element={<Persnelappointment />} />
          {/* 메신저 */}
          <Route
            path="/chatemplist"
            element={<ChatEmpList invite={invite} setInvite={setInvite} />}
          />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/createroom" element={<CreateRoom invite={invite} />} />
          {/* 조직관리 */}
          <Route path="/management/unit" element={<ManagementUnit />} />
          {/* 사원관리 */}
          <Route path="/management/employee" element={<ManagementEmployee />} />
          <Route path="/add/employee" element={<EmpAddPage />} />
          <Route path="/add/employees" element={<EmpListAddPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
