import React, { useState, useRef, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HeaderLayout.scss';

const HeaderLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header-layout">
      <h2>Overview</h2>
      <div className="profile-container" ref={dropdownRef}>
        <FaIcons.FaUser className="user-icon" size={24} onClick={toggleDropdown} />
        {showDropdown && (
          <div className="dropdown-menu">
            {/* <p className="menu-items">👤 Profile</p> */}
            <Link to="/profile"> <p className="menu-items">👤 Profile </p></Link>
            <Link to="/login"><p className="menu-items"><FaIcons.FaSignOutAlt className="icon" /> Logout</p></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderLayout;
