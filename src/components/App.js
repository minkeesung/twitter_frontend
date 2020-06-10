import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import constants from "../constants";
import Navbar from "./Navigationbar";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
import Users from "./Users";
import Tags from "./Tags";
import UserProfile from "./UserProfile";
import { AuthRoute, LoggedInRoute } from "../util/route_util";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          dispatch({
            type: constants.RECEIVE_CURRENT_USER,
            currentUser: response.data,
          });
        } else {
          dispatch({
            type: constants.RECEIVE_CURRENT_USER,
            currentUser: null,
          });
        }
      });
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <LoggedInRoute exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/register" component={RegisterForm} />
          <LoggedInRoute exact path="/users" component={Users} />
          <LoggedInRoute exact path="/users/:id" component={UserProfile} />
          <LoggedInRoute exact path="/tags/:tag" component={Tags} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
