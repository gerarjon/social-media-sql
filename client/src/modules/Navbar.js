import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Navbar = ({isActive, isActiveHandle}) => {

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          Doggo
        </Link>

        {/* navbar burger */}
        <div role="button" data-target="navMenu" className={`navbar-burger ${isActive ? 'is-active' : ""}`} aria-label="menu" aria-expanded="false" onClick={isActiveHandle}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>



      <div className={`navbar-menu ${isActive ? 'is-active' : ""}`} id="navMenu" >
        {/* Navbar start */}
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>
          
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <NavLink className="navbar-item" to="/">
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;