import React from 'react';
import * as FaIcons from 'react-icons/fa';
import './SidebarLayout.scss';
import { Link } from 'react-router-dom';

const SidebarLayout = ({ children }) => {
  return (
    <div className="sidebar-layout">
      <div className="upper-div">
        <div className="logo-container">Logo</div>
        <div className="menu-container">
          <Link to="/" className="menu-items"><FaIcons.FaTachometerAlt className="icon" /> Dashboard</Link>
          <Link to="/service-categories" className="menu-items"><FaIcons.FaTachometerAlt className="icon" /> Service Categories</Link>
          <Link to="/customers" className="menu-items"><FaIcons.FaTachometerAlt className="icon" /> Customers</Link>
          <Link to="/service-providers" className="menu-items"><FaIcons.FaTachometerAlt className="icon" /> Service Providers</Link>
          <Link to="/orders-record" className="menu-items"><FaIcons.FaTachometerAlt className="icon" /> Orders Record</Link>
        </div>
      </div>
      <div className="lower-div">
      <Link to="/login"> <p className="menu-items"><FaIcons.FaSignOutAlt className="icon" /> Logout</p></Link>
      </div>
        
      <main>{children}</main>
    </div>
  );
};

export default SidebarLayout;
