import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsPencil, BsPencilFill } from 'react-icons/bs';
import { FaBookReader, FaCog, FaFolderOpen, FaThList } from 'react-icons/fa';
import { FcDocument } from 'react-icons/fc';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../css/Sidebar.css';
import '../css/SidebarCustom.scss';

const Menuitem = styled(MenuItem)`
  :hover {
    text-decoration: none;
    padding: 5px;
    border-radius: 10px;
  }
`;

const SideNavigation = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const styles = {
    sideBarHeight: {
      height: '150vh',
    },
    menuIcon: {
      float: 'right',
      margin: '10px',
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <div className="container1">
        <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
          <SidebarHeader>
            <div style={styles.menuIcon} onClick={onClickMenuIcon}>
              <AiOutlineMenu />
            </div>
          </SidebarHeader>

          <Menu iconShape="square">
            <Menuitem icon={<BsPencilFill />}>
              <Link to={'/dratf/form'}>기안작성</Link>
            </Menuitem>

            <SubMenu title="기안함" icon={<FaThList />}>
              <Menuitem>
                <Link to={'/boxes/dd'}>상신한</Link>
              </Menuitem>

              <MenuItem>
                <Link to={'/boxes/dc'}>완료된</Link>
              </MenuItem>

              <MenuItem>
                <Link to={'/boxes/ds'}>저장된</Link>
              </MenuItem>

              <MenuItem>
                <Link to={'/boxes/dr'}>반려된</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="결재함" icon={<FaBookReader />}>
              <Menuitem>
                <Link to={'/boxes/ab'}>결재전</Link>
              </Menuitem>

              <MenuItem>
                <Link to={'/boxes/ao'}>진행중</Link>
              </MenuItem>

              <MenuItem>
                <Link to={'/boxes/ac'}>완료된</Link>
              </MenuItem>

              <MenuItem>
                <Link to={'/boxes/ar'}>반려된</Link>
              </MenuItem>
            </SubMenu>
            <Menuitem icon={<FaFolderOpen />}>
              <Link to={'/boxes/dl'}>문서대장</Link>
            </Menuitem>
          </Menu>
        </ProSidebar>

        <main>{children}</main>
      </div>
    </div>
  );
};
export default SideNavigation;
