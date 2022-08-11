import styles from '../css/Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import Cookies from 'universal-cookie';
import { logout } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import { useEffect, useState } from 'react';

//여기부터
import { Menu, Button } from 'antd';
import styled from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Container, Typography } from '@mui/material';
const MenuList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavTop = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    background: black;
    border: none;
  }
`;
function Navbar({ setEmpId, empInfo, setLogin }) {
  const cookies = new Cookies();
  const [accessCookie, setAccessCookie] = useState('');

  function activeStyle({ isActive }) {
    return {
      textDecoration: 'none',
      fontSize: isActive ? '24px' : undefined,
      color: isActive ? '#00AAFF' : 'black',
      background: 'white',
    };
  }

  useEffect(() => {
    cookies.get('accessToken');
    if (cookies.cookies.accessToken) {
      setAccessCookie(cookies.cookies.accessToken);

      getMe(setEmpId);
    }
  }, [accessCookie]);

  //여기부터

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleBar, setToggleBar] = useState(true);

  const toggleChange = () => {
    setToggleMenu(!toggleMenu);
    setToggleBar(!toggleBar);
  };

  const onMenuClick = () => {
    setToggleMenu(!toggleMenu);
    setToggleBar(!toggleBar);
  };

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.contents}>
          <Link to={'/'} className={styles.Link}>
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/asset/logo.png`}
                alt="풍선"
                className={styles.ballon}
              />
              <strong className={styles.ballonfont}>
                {' '}
                BALL<span className={styles.oofont}>OO</span>N{' '}
              </strong>
            </div>
          </Link>

          <div className={styles.ulll}>
            <ul className={styles.ulmarginn}>
              <NavLink to={'/boxs'} style={activeStyle}>
                <Box className={styles.lii}>결재관리</Box>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="product">
              <NavLink to={'/calendar'} style={activeStyle}>
                캘린더
              </NavLink>
            </Menu.Item>

            <Menu.Item key="ms">
              <NavLink to={'/chatemplist'} style={activeStyle}>
                메신저
              </NavLink>
            </Menu.Item>

            <Menu.Item key="Or">
              <NavLink to={'/organization'} style={activeStyle}>
                조직도
              </NavLink>
            </Menu.Item>
            {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
              <Menu.Item key="Mani">
                <NavLink to={'/management/unit'} style={activeStyle}>
                  조직관리
                </NavLink>
              </Menu.Item>
            ) : null}
            {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
              <Menu.Item key="ment">
                <NavLink to={'/management/employee'} style={activeStyle}>
                  사원관리
                </NavLink>
              </Menu.Item>
            ) : null}
          </Menu>

          {accessCookie ? (
            <Typography variant="h6" align="center" className={styles.text}>
              {empInfo.empName} {empInfo.position}{' '}
              <Button onClick={logout}>Logout</Button>
            </Typography>
          ) : (
            <Link to={'/loginpage'}>
              <Button>Login</Button>
            </Link>
          )}
          {/* <Menu mode="horizontal">
            <Menu.Item key="signin">
              <Link to="/loginpage">로그인</Link>
            </Menu.Item>
          </Menu> */}
        </MenuList>
      </BrowserView>
    </Container>
  );
}

export default Navbar;
