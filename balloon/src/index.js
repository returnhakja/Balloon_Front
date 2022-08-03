import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

import Boxs from './components/Boxs';
import Dashboard from './components/Dashboard';
import Declare from './components/Declare';
import Complete from './components/Complete';
import Save from './components/Save';
import Refuese from './components/Refuese';
import ApprovalBefore from './components/ApprovalBefore';
import Calendar from './components/Calendar';
import Businessreport from './components/Businessreport';
import Businesstrip from './components/Businesstrip';
import Persnelappointment from './components/Persnelappointment';
import ApprovalOngoing from './components/ApprovalOngoing';
import ApprovalComplete from './components/ApprovalComplete';
import ApprovalRefuse from './components/ApprovalRefuse';
import DocumentList from './components/DocumentList';
import OrganizationChart from './components/OrganizationChart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        {/* 로그인 */}
        <Route path="/login" element={<Login />} />
        {/* 캘린더 */}
        <Route path="/calendar" element={<Calendar />} />
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
        {/* 조직도 */}
        <Route path="/organization" element={<OrganizationChart />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
