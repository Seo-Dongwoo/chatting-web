import React from "react";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import "firebase/app";
import firebase from "firebase/app";

import { auth } from "../firebase";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>동우의 Discord</h2>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Google로 로그인
        </div>
        <br /> <br />
        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GithubAuthProvider())
          }
        >
          <GithubOutlined /> GitHub으로 로그인
        </div>
      </div>
    </div>
  );
};
export default Login;
