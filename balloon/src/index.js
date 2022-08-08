import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

import Organization from './pages/Organization';
import PrivateRoute from './components/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        {/* 로그인 */}
        <Route path="/loginpage" element={<LoginPage />} />
        {/* 조직도 */}
        <Route path="/organization">
          <Route index element={<Organization />} />
        </Route>
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
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
