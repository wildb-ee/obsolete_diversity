import React, { Component } from "react";
import JoinFightPage from "./JoinFightPage";
import CreateFightPage from "./CreateFightPage";
import NoPage from "./NoPage";
import Layout from "./Layout";
import HomePage from './HomePage';
import Fight from "./Fight";
import SignIn from "./SignIn";
import Login from "./Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export default class Router extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>} />
                <Route path="join" element={<JoinFightPage />} />
                <Route path="create" element={<CreateFightPage />} />
                <Route path="fight/:fightCode" element={<Fight />} />
                <Route path="register" element= {<SignIn />} />
                <Route path="login" element= {<Login />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
  }
}