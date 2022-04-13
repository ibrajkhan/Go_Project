import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Refer from "../Footer2/ReferFooter";
import ButtonSign from "../Button for orders pages/ButtonOrder";
import Header2 from "../Header2/Header2";
import Footer from "../Footer/footer";

import "../../App.css";
import "./signin.css";

export default function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const [text, setText] = useState("");
  const [red, setRed] = useState("login_mobile");
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const Verify = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    axios
      .post(
        "http://localhost:8080/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const token = res.data.Token;
          const userData = res.data.User;
          console.log("setting local storage");
          localStorage.setItem("token", token);
          localStorage.setItem("user", userData);
          setRed("login_mobile");
          setText("");
          window.location.href = "/orders";
        }
      })
      .catch((error) => {
        setRed("login_mobile_red");
        setText("Invalid");
      });
  };

  return (
    <div>
      <div className="header">
        <Header2 />
      </div>

      <div className="signin__page">
        <div className="login_main">
          <div className="login_left">
            <div className="login_top">
              <h1 className="h-tag">Shopping Cart</h1>
            </div>
            <div className="login_bottom">
              <Link to="/register">
                <ButtonSign content="Register"></ButtonSign>
              </Link>
            </div>
          </div>
          <div className="login_middle"></div>
          <div className="login_right">
            <h2>SIGN IN</h2>
            <form className="login_form" onSubmit={Verify}>
              <div className={red}>
                <label>Email</label>
                <br></br>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                ></input>
                <br></br>
                <span>{text}</span>
              </div>
              <div className="login_password">
                <label>Password</label>
                <br></br>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                ></input>
                <br></br>
                <span>
                  <a href="#">Forgot Password?</a>
                </span>
              </div>
              <div className="login_button">
                <ButtonSign content="Sign In"></ButtonSign>
              </div>
            </form>
          </div>
        </div>
        <Refer></Refer>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
