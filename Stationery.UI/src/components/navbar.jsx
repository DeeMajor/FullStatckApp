import React, { Component } from "react";
import logo from "../images/stationery.png";
import Nav from "react-bootstrap/Nav";

function NavBar(props) {
  return (
    <nav className="navbar  bg-dark text-dark bg-opacity-10 mb-5 justify-content-center">
      <div className="container-fluid d-flex justify-content-evenly">
        <a className="navbar-brand" href="./">
          <img src={logo} alt="stationery icon" width="50" height="44" />
        </a>

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

        <div className="d-flex flex-row-reverse">
          <div className="p-2">
            <Nav fill variant="pills" defaultActiveKey="/List">
              <Nav.Item>
                <Nav.Link
                  href="/List"
                  onClick={() => props.onPage("Stationery")}
                >
                  {" "}
                  Lists
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="link-2"
                  onClick={() => props.onPage("items")}
                >
                  Items
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
