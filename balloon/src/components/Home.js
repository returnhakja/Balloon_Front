import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Home({ empInfo, setEmpInfo, logout, isLogin }) {
  return (
    <>
      <Navbar
        empInfo={empInfo}
        setEmpInfo={setEmpInfo}
        logout={logout}
        isLogin={isLogin}
      />
      <Outlet context={[empInfo, setEmpInfo]} />
      <Footer />
    </>
  );
}

export default Home;
