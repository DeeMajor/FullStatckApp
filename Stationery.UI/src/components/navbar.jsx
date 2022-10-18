import React, { Component } from "react";
import logo from "../images/stationery.png";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar  bg-dark text-dark bg-opacity-10 mb-5 justify-content-center">
        <div className="nav-item">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="stationery icon" width="50" height="44" />
          </a>
        </div>
        <div className="nav-item" role="search">
          <form role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;
