import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAuthUser } from "../actions/authUser";
import "../css/nav-bar.css";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    dispatch(logoutAuthUser());
    navigate("/login");
  };

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="li-content">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add
          </NavLink>
          <NavLink
            to="/new-questions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            New Questions
          </NavLink>
          <NavLink
            to="/answer-questions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Answer Questions
          </NavLink>
        </li>
        {authUser && (
          <li className="user-info">
            <span>Hello, {users[authUser]?.name}</span>
            <img
              src={
                users[authUser]
                  ? require(`../images/${users[authUser]?.name}.png`)
                  : ""
              }
              alt={`Avatar of ${users[authUser]?.name}`}
              className="img-style"
            />
            <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
