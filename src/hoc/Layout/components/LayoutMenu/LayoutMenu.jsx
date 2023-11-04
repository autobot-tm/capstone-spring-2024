import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { routeNames } from '../../../../config';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
const LayoutMenu = () => {
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = React.useState(routeNames.Home);
  const location = useLocation();
  const onItemClick = event => {
    const { key } = event;
    navigate(key);
  };
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      defaultSelectedKeys={[selectedKeys]}
      onClick={onItemClick}
      selectedKeys={[selectedKeys]}
      className="menu">
      <Menu.Item key={routeNames.Home}>
        Home
        {/* <NavLink to="/">Home</NavLink> */}
      </Menu.Item>
      <Menu.Item key={routeNames.About}>
        About
        {/* <NavLink to="/about">About</NavLink> */}
      </Menu.Item>
    </Menu>
  );
};

export default LayoutMenu;
