import React from 'react';
import './layoutWrapper.scss';
import HeaderLayout from '../common/header/HeaderLayout';
import SidebarLayout from '../common/sidebar/SidebarLayout';
import Home from '../pages/home/Home';
import { Outlet } from 'react-router';

const LayoutWrapper = () => {
  return (
    <div className="layout-wrapper">
      <div className="sidebarWrapper">
        <SidebarLayout />
      </div>
      <div className="header-page-container">
        <div className="header">
          <HeaderLayout />
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutWrapper;
