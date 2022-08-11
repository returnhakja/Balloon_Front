import styles from '../css/Navbar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import Cookies from 'universal-cookie';
import { logout } from '../context/AuthFunc';
import { getMe } from '../context/EmployeeAxios';
import { useEffect, useState } from 'react';

//여기부터
import { Menu, Button, MenuProps } from 'antd';
import styled from 'styled-components';
import { BrowserView, MobileView } from 'react-device-detect';
import { MenuOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Container, Typography } from '@mui/material';
const MenuList = styled.div`
  display: flex;
  justify-content: space-between;
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

  const MenuItems = [
    {
      key: 'subs',
      label: (
        <NavLink to={'/boxs'} style={activeStyle}>
          <Box className={styles.lii}>결재관리</Box>
        </NavLink>
      ),
    },
    {
      key: 'product',
      label: (
        <NavLink to={'/calendar'} style={activeStyle}>
          <Box className={styles.lii}>캘린더</Box>
        </NavLink>
      ),
    },
    {
      key: 'ms',
      label: (
        <NavLink to={'/chatemplist'} style={activeStyle}>
          <Box className={styles.lii}>메신저</Box>
        </NavLink>
      ),
    },
    {
      key: 'Or',
      label: (
        <NavLink to={'/organization'} style={activeStyle}>
          <Box className={styles.lii}>조직도</Box>
        </NavLink>
      ),
    },
    {
      key: 'Mani',
      label: (
        <>
          {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
            <NavLink to={'/management/unit'} style={activeStyle}>
              <Box className={styles.lii}>조직관리</Box>
            </NavLink>
          ) : null}
        </>
      ),
    },
    {
      key: 'ment',
      label: (
        <>
          {empInfo && empInfo.userRoleGrade === 'ROLE_ADMIN' ? (
            <NavLink to={'/management/employee'} style={activeStyle}>
              <Box className={styles.lii}>사원관리</Box>
            </NavLink>
          ) : null}
        </>
      ),
    },
  ];

  useEffect(() => {
    cookies.get('accessToken');
    if (cookies.cookies.accessToken) {
      setAccessCookie(cookies.cookies.accessToken);

      getMe(setEmpId);

      console.log(cookies);
    }
  }, [accessCookie]);

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
    <Container maxWidth={'xl'}>
      {/* web */}
      <BrowserView>
        <MenuList>
          <Box>
            <Link to={'/'}>
              <strong className={styles.ballonfont}>
                {' '}
                BALL<span className={styles.oofont}>OO</span>N{' '}
              </strong>
            </Link>
          </Box>

          {/* <Menu
            selectedKeys="mail"
            mode="horizontal"
            items={MenuItems}
            style={{ display: 'display' }}> */}

          {/* 
            <Menu.Item key="subs">
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
            ) : null} */}
          {/* </Menu> */}
          {MenuItems.map((menu, index) => {
            return <div key={index}>{menu.label}</div>;
          })}
          {accessCookie ? (
            <Typography variant="h6" align="center" className={styles.text}>
              {empInfo.empName} {empInfo.position}{' '}
              <Button onClick={logout}>Logout</Button>
            </Typography>
          ) : (
            <Typography variant="h6" align="center" className={styles.text}>
              <Link to={'/loginpage'}>
                <Button>Login</Button>
              </Link>
            </Typography>
          )}
        </MenuList>
      </BrowserView>
    </Container>
  );
}

export default Navbar;
