import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from './assets/assets'; // Assuming `assets` is exported from a file named `assets.js`
import './Navbar.css'; // Import the CSS file

const Navbar = ({ signOut }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="navbar-container">
      <Link to="/" className="navbar-logo">
      <img src={assets.logo} alt="Company Logo" />

      </Link>

      <ul className="navbar-links sm:flex">
        <NavLink to="/" className="navbar-link">
          <p>Explore</p>
          <hr />
        </NavLink>
        <NavLink to="/Admin" className="navbar-link">
          <p>Publish</p>
          <hr />
        </NavLink>
        <NavLink to="/About" className="navbar-link">
          <p>About</p>
          <hr />
        </NavLink>
        <NavLink to="/Contact" className="navbar-link">
          <p>Support</p>
          <hr />
        </NavLink>
      </ul>

      <div className="navbar-icons-container">
        <div className="group relative">
          <img
            className="navbar-profile-icon"
            src={assets.profile_icon}
            alt="Profile Icon"
          />
          <div className="navbar-dropdown-menu group-hover:block">
            <div className="navbar-dropdown-menu-content">
              {/* <p onClick={signOut} className="cursor-pointer">Admin</p> */}
              <p onClick={signOut} className="cursor-pointer">Logout</p>
            </div>
          </div>
        </div>

        {/* <Link to="/Cart1" className="relative">
          <img src={assets.cart_icon} className="navbar-cart-icon" alt="Cart Icon" />
          <p className="navbar-cart-count"></p>
        </Link> */}

        {/* Menu Icon to Open Sidebar (Only for Small Screens) */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="navbar-menu-icon sm:hidden" // Hide on larger screens
          alt="Menu Icon"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`navbar-sidebar ${visible ? "navbar-sidebar-open" : "navbar-sidebar-closed"}`}>
        <div className="navbar-sidebar-content">
          <div
            onClick={() => setVisible(false)}
            className="navbar-sidebar-content-back"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="navbar-sidebar-link"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="navbar-sidebar-link"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/About"
            className="navbar-sidebar-link"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/Contact"
            className="navbar-sidebar-link"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
