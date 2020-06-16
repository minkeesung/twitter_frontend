import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import constants from "../constants";
import { RootState } from "../reducers";

const Navigationbar = ({ history }: RouteComponentProps) => {
  const selectCurrentUser = (state: RootState) => state.session.currentUser;
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const logout = () => {
    try {
      axios.delete(`${process.env.REACT_APP_API_DOMAIN}/api/logout`, {
        withCredentials: true,
      });
      dispatch({ type: constants.LOGOUT });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">Twitter</Link>
        </Navbar.Brand>
        {user ? (
          <>
            <a href="#" onClick={logout}>
              Logout
            </a>
            &nbsp; &nbsp;
            <Link to="/users">Users</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login </Link> &nbsp; &nbsp;
            <Link to="/register">Register</Link>&nbsp; &nbsp;
          </>
        )}
      </Navbar>
    </>
  );
};

export default withRouter(Navigationbar);
