import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../css/Home.module.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatMenu from '../pages/chat/ChatMenu';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home({ empInfo, setEmpInfo, logout, isLogin }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar
        empInfo={empInfo}
        setEmpInfo={setEmpInfo}
        logout={logout}
        isLogin={isLogin}
      />

      {isLogin && (
        <div className={styles.Icon}>
          {open ? (
            <ChatMenu
              style={style}
              open={open}
              setOpen={setOpen}
              empInfo={empInfo}
            />
          ) : (
            <Fab
              color="secondary"
              aria-label="add"
              onClick={() => {
                setOpen(true);
              }}
              className={styles.float}>
              <AddIcon />
            </Fab>
          )}
        </div>
      )}

      <Outlet context={[empInfo]} />

      <Footer />
    </div>
  );
}

export default Home;
