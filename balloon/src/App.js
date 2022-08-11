import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { selectEmployeeByEmpId } from './context/EmployeeAxios';

import Home from './components/Home';
import MainPage from './components/MainPage';
import PrivateRoutes from './components/PrivateRoutes';

import Boxs from './pages/approval/Boxs';
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

import Calendar from './pages/calendar/Calendar';

import LoginPage from './pages/login/LoginPage';

import ManagementUnit from './pages/personnelManagement/ManagementUnit';
import ManagementEmployee from './pages/personnelManagement/ManagementEmployee';

import Chat from './pages/chat/Chat';
import ChatRoom from './pages/chat/ChatRoom';
import CreateRoom from './pages/chat/CreateRoom';

import Organization from './pages/Organization';
import ChatEmpList from './pages/chat/ChatEmpList';

function App() {
  const [empId, setEmpId] = useState('');
  const [empInfo, setEmpInfo] = useState([]);
  const cookies = new Cookies();
  const [cookie, setCookie] = useState();
  const [isLogin, setLogin] = useState(null);

  // useEffect(() => {
  //   const logged = localStorage.getItem('isLogin');
  //   logged && JSON.parse(logged) ? setLogin(true) : setLogin(false);
  // });

  // useEffect(() => {
  //   localStorage.setItem('isLogin', isLogin);
  // }, [isLogin]);

  useEffect(() => {
    if (!!empId) {
      // setLogin(true);
      cookies.get('accessToken');
      setCookie(cookies.cookies.accessToken);
      if (empId.length !== 0) {
        selectEmployeeByEmpId(empId, setEmpInfo);
      }
    } else {
      // setLogin(false);
      // console.log(isLogin);
    }
  }, [empId]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setEmpId={setEmpId}
              empInfo={empInfo}
              setEmpInfo={setEmpInfo}
              // setLogin={setLogin}
            />
          }>
          <Route index element={<MainPage />} />
          {/* 로그인 */}
          <Route path="/loginpage" element={<LoginPage />} />
          {/* 조직도 */}
          <Route path="/organization">
            <Route index element={<Organization />} />
          </Route>
          {/* Private Routes */}

          <Route
            element={
              <PrivateRoutes
                empId={empId}
                setEmpId={setEmpId}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
                cookie={cookie}
              />
            }>
            {/* 캘린더 */}
            <Route element={<Calendar />} path="/calendar" exact />
            {/* 결재관리 */}
            <Route path="/boxs" element={<Boxs />} />
            {/* <Route index  /> */}
            <Route path="/box/dd" element={<Declare />} />
            <Route path="/box/dc" element={<Complete />} />
            <Route path="/box/ds" element={<Save />} />
            <Route path="/box/dr" element={<Refuese />} />
            <Route path="/box/ab" element={<ApprovalBefore />} />
            <Route path="/box/ao" element={<ApprovalOngoing />} />
            <Route path="/box/ac" element={<ApprovalComplete />} />
            <Route path="/box/ar" element={<ApprovalRefuse />} />
            <Route path="/box/dl" element={<DocumentList />} />
            {/* </Route> */}
            {/* 기안작성 */}
            <Route path="/dratf/form" element={<Dashboard />} />
            <Route path="/dratf/br" element={<Businessreport />} />
            <Route path="/dratf/bt" element={<Businesstrip />} />
            <Route path="/dratf/pa" element={<Persnelappointment />} />
            {/* 메신저 */}
            <Route path="/chatemplist" element={<ChatEmpList />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/createroom" element={<CreateRoom />} />
            {/* 조직관리 */}
            <Route path="/management/unit" element={<ManagementUnit />} />
            {/* 사원관리 */}
            <Route
              path="/management/employee"
              element={<ManagementEmployee />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
