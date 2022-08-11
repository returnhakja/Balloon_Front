import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Home({ setEmpId, empInfo, setEmpInfo }) {
  return (
    <>
      <Navbar setEmpId={setEmpId} empInfo={empInfo} />
      <Outlet context={[setEmpId, empInfo, setEmpInfo]} />
      <Footer />
    </>
  );
}

export default Home;
