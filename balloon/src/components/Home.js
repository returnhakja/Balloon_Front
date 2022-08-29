import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../css/Home.module.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Home({ empInfo, setEmpInfo, logout, isLogin }) {
  return (
    <>
      <Navbar
        empInfo={empInfo}
        setEmpInfo={setEmpInfo}
        logout={logout}
        isLogin={isLogin}
      />
      <Outlet context={[empInfo]} />

      <Fab color="primary" aria-label="add" className={styles.Icon}>
        <AddIcon />
      </Fab>

      <Footer />
    </>
  );
}

export default Home;
