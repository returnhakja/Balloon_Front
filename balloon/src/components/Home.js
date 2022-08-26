import React, { useState } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import styles from '../css/Home.module.css';
import ChatEmpList from '../pages/chat/ChatEmpList';
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

      <Fab color="primary" aria-label="add" className={styles.Icon}>
        <AddIcon />
      </Fab>

      <Footer />
    </>
  );
}

export default Home;
