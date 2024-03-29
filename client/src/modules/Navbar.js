import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ({isActive, isActiveHandle}) => {
  const [activeDropdown, setActiveDropdown] = useState(false)
  
  const context = useContext(AuthContext);
  return (

      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            SMS
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
            {
              context.UserId ? 
              <>
                <div 
                  className={`navbar-item has-dropdown ${activeDropdown ? "is-active" : ""}`}
                  onClick={()=>{setActiveDropdown(!activeDropdown)}}
                >
                  <div className='navbar-link'>
                    {context.name} 
                  </div>
                  <div className='navbar-dropdown is-right'>
                    <Link 
                      className='navbar-item' 
                      to={`/user/${context.UserId}`}>
                      <span className='icon'><FontAwesomeIcon icon="fa-solid fa-user" /></span>
                      Profile
                    </Link>
                    <hr className='navbar-divider' />
                    <Link 
                      className='navbar-item'
                      onClick={context.handleLogout}
                      to="/">
                        <span className='icon'><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /></span>
                      Log Out
                    </Link>
                  </div>
                </div>
              </> 
              :
              <>
                <Link className='navbar-item' to="/login">
                  Login
                </Link>
                <Link className='navbar-item' to="/signup">
                  Sign Up
                </Link> 
              </>
            }
          </div>
        </div>
      </nav>


  )
}

export default Navbar;