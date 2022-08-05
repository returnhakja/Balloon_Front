import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { selectEmployeeByEmpId } from './context/EmployeeAxios';

function App() {
  const [empId, setEmpId] = useState('');
  const [empInfo, setEmpInfo] = useState([]);

  useEffect(() => {
    if (empId.length !== 0) {
      selectEmployeeByEmpId(empId, setEmpInfo);
    }
  }, [empId]);

  return (
    <>
      <Navbar setEmpId={setEmpId} empInfo={empInfo} />
      <Outlet context={[empInfo, setEmpInfo]} />
      <Footer />
    </>
  );
}

export default App;
