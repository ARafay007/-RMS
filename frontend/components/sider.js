import { useState } from "react";
import {Layout, Menu} from 'antd';

export const SiderNav = ({menuItem, restaurantName}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [windowOuterHeight, setWindowOuterHeight] = useState(window.outerHeight);
  const {Sider} = Layout;

  return(
    <Sider
      collapsible collapsed={collapsed}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
        setCollapsed(collapsed);
      }}
      style={{
        overflow: 'auto',
        height: windowOuterHeight,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo" 
        style={{
          color: 'white', 
          width: '100%', 
          height: '150px', 
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          textDecoration: 'underline',
        }}
      >
        {restaurantName}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={menuItem}
      />
    </Sider>
  );
};