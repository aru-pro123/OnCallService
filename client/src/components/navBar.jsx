import React from "react";
import { Link, NavLink } from "react-router-dom";
import { NavDropdown, NavItem, Nav } from 'react-bootstrap';

const NavBar = ({ user }) => {
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        OnCall
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/providers">
                Service Providers
              </NavLink>
              <NavLink className="nav-item nav-link" to="/services">
                Services
              </NavLink>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/user/my-services">
                My Services
              </NavLink>
              {/* <NavDropdown eventKey={1}
                title={
                  <div className="pull-left">
                    <img className="thumbnail-image"
                      src=''
                      alt="user pic"
                    />

                   Arun
                  </div>
                }
                id="basic-nav-dropdown">

                <NavItem eventKey={1.1} href="/profile">Profile</NavItem>
                <NavItem divider />
                <NavItem href="/logout">
                  Logout
                </NavItem>
              </NavDropdown> */}
              <NavLink className="nav-item nav-link" to="/profile">
                Profile
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
