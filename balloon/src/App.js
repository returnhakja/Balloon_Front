import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { selectEmployeeByEmpId } from './context/EmployeeAxios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

import Boxs from './pages/Boxs';
import Dashboard from './pages/Dashboard';
import Declare from './pages/Declare';
import Complete from './pages/Complete';
import Save from './pages/Save';
import Refuese from './pages/Refuese';
import ApprovalBefore from './pages/ApprovalBefore';
import Calendar from './pages/Calendar';
import Businessreport from './pages/Businessreport';
import Businesstrip from './pages/Businesstrip';
import Persnelappointment from './pages/Persnelappointment';
import ApprovalOngoing from './pages/ApprovalOngoing';
import ApprovalComplete from './pages/ApprovalComplete';
import ApprovalRefuse from './pages/ApprovalRefuse';
import DocumentList from './pages/DocumentList';

import LoginPage from './pages/LoginPage';
import Home from './components/Home';
import Organization from './pages/Organization';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
  const [empId, setEmpId] = useState('');
  const [empInfo, setEmpInfo] = useState([]);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (!!empId) {
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
            />
          }>
          <Route index element={<MainPage />} />
          {/* 로그인 */}
          <Route path="/loginpage" element={<LoginPage />} />
          {/* 조직도 */}
          <Route path="/organization">
            <Route index element={<Organization />} />
          </Route>
          {/* 캘린더 */}

          <Route
            element={
              <PrivateRoutes
                empId={empId}
                setEmpId={setEmpId}
                empInfo={empInfo}
                setEmpInfo={setEmpInfo}
              />
            }>
            <Route element={<Calendar />} path="/calendar" exact />
            {/* 결재관리 */}
            <Route path="/box" element={<Boxs />} />
            <Route path="/box/dd" element={<Declare />} />
            <Route path="/box/dc" element={<Complete />} />
            <Route path="/box/ds" element={<Save />} />
            <Route path="/box/dr" element={<Refuese />} />
            <Route path="/box/ab" element={<ApprovalBefore />} />
            <Route path="/box/ao" element={<ApprovalOngoing />} />
            <Route path="/box/ac" element={<ApprovalComplete />} />
            <Route path="/box/ar" element={<ApprovalRefuse />} />
            <Route path="/box/dl" element={<DocumentList />} />
            {/* 기안작성 */}
            <Route path="/dratf/form" element={<Dashboard />} />
            <Route path="/dratf/br" element={<Businessreport />} />
            <Route path="/dratf/bt" element={<Businesstrip />} />
            <Route path="/dratf/pa" element={<Persnelappointment />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
