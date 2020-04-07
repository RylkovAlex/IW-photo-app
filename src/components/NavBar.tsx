/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { inject, observer } from "mobx-react";

import { NavLink, useHistory } from "react-router-dom";
import { AuthStore } from "../stores/AuthStore/AuthStore";

interface NavbarProps {
  authStore?: AuthStore;
}

const Navbar: React.FC<NavbarProps> = ({ authStore }) => {
  const history = useHistory();

  const logoutHandler = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    evt.preventDefault();
    authStore?.logOut();
    history.push("/");
  };

  return (
    <nav className="nav-extended blue darken-1">
      <div className="container nav-wrapper">
        <ul style={{ padding: "0 15px" }}>
          <li>
            <NavLink to="/" className="brand-logo left">
              PHOTO-APP
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="brand-logo right"
              onClick={logoutHandler}
            >
              <i className="large material-icons">exit_to_app</i>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="container nav-content blue darken-1">
        <ul className="tabs tabs-transparent">
          <li className="tab">
            <NavLink to="/albums/1">Albums</NavLink>
          </li>
          <li className="tab">
            <NavLink to="/favorites/1">My favorite photos</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default inject("authStore")(observer(Navbar));
