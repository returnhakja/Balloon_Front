import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [empId, setEmpId] = useState('');
  return (
    <>
      {/* <Headers /> */}
      <Navbar empId={empId} setEmpId={setEmpId} />

      <Outlet empId={empId} setEmpId={setEmpId}></Outlet>

      <Footer />
    </>
  );
}

export default App;
