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
          <h3>MY-STATIONERY-LIST</h3>
        </div>

        <div className="d-flex flex-row-reverse">
          <div className="p-2">
            <Nav fill variant="pills" activeKey={props.eventlink}>
              <Nav.Item>
                <Nav.Link
                  className={props.active !== "2" && "active"}
                  onClick={() => props.onPage("Stationery")}
                >
                  Lists
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={props.active !== "1" && "active"}
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
