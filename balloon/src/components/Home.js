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

function getCurrentWeek() {
  const day = new Date();
  const sunday = day.getTime() - 86400000 * day.getDay();

  day.setTime(sunday);

  const result = [day.toISOString().slice(0, 10)];

  for (let i = 1; i < 7; i++) {
    day.setTime(day.getTime() + 86400000);
    result.push(day.toISOString().slice(0, 10));
  }

  return result;
}

function Home({ empInfo, setEmpInfo, logout, isLogin }) {
  const [open, setOpen] = useState(false);

  const [sunDay, setSunDay] = useState(getCurrentWeek()[0]);
  const [saturDay, setSaturDay] = useState(getCurrentWeek()[6]);

  return (
    <>
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

      <Outlet context={[empInfo, sunDay, setSunDay, saturDay, setSaturDay]} />
      <Footer />
    </>
  );
}

export default Home;
