import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import MainPage from './components/MainPage';
import Boxs from './pages/Boxs';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Organization from './pages/Organization';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/unit">
          <Route index element={<Organization />} />
        </Route>
        <Route path="/box" element={<Boxs />} />
        <Route path="/dratf/form" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
