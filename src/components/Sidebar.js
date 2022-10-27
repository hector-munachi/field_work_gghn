import {
  UserOutlined,
  DashboardOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  AimOutlined
} from '@ant-design/icons';
import { Menu, Typography, Avatar } from 'antd';
import React from 'react';
import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import OnlineUsers from './OnlineUsers'


export default function Sidebar() {
  const { user } = useAuthContext()

  const { Title } = Typography;
  const { Item } = Menu

  return (
        <div>
          {/* <Avatar size={64} icon={<UserOutlined />} src={user.photoURL}/>  */}
          <div style={{marginTop: "1em"}}>
          <Title level={5}>Welcome {user.displayName}</Title>
          </div>
          <div>
          {user && <OnlineUsers />}
          </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="horizontal"
      >
        <Item icon={<DashboardOutlined />}>
        <NavLink exact to="/">
         Dashboard
        </NavLink>
        </Item>
        <Item icon={<FileAddOutlined />}>
        <NavLink to="/create">
          New Project
        </NavLink>
        </Item>
        <Item icon={<FileSearchOutlined />}>
        <NavLink to="/search">
          Search
        </NavLink>
        </Item>
        <Item icon={<AimOutlined />}>
        <NavLink to="/location">
          Location
        </NavLink>
        </Item>
      </Menu>
    </div>
  )
}
