import React, { Component } from "react";
import JoinFightPage from "./JoinFightPage";
import CreateFightPage from "./CreateFightPage";
import Layout from "./Layout";
import HomePage from './HomePage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

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
                <Route path="register" element= {<RegisterPage />} />
                <Route path="login" element= {<LoginPage />} />
            </Route>
        </Routes>
        </BrowserRouter>
    );
  }
}