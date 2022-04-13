import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Header2 from "../Header2/Header2";
import Footer from "../Footer/footer";
import Refer from "../Footer2/ReferFooter";
import ButtonReg from "../Button for orders pages/ButtonOrder";

import "../../App.css";
import "./register.css";

export default function Register() {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
    password: "",
  });
  let valname, value;
  const handleInputs = (e) => {
    valname = e.target.name;
    value = e.target.value;
    setUser({ ...user, [valname]: value });
  };
  const Submit = async (e) => {
    e.preventDefault();
    var { name, email, phone, state, district, address, pincode, password } =
      user;
    console.log(user);
    axios
      .post(
        "http://localhost:8080/register",
        { name, email, phone, state, district, address, pincode, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/");
        }
      })
      .catch((error) => {
        window.alert("Invalid User Details or User Already Existed");
      });
  };

  return (
    <div>
      <div className="header">
        <Header2 />
      </div>
      <div className="footer">
        <Footer />
      </div>
      <div className="register__page">
        <div className="register_main">
          <div className="register_left">
            <div className="register_top">
              <h1 className="h-tag">Shopping Cart</h1>
            </div>
            <div className="register_bottom">
              <p className="p-tag">Already have an account?</p>
              <Link to="/">
                <ButtonReg content="Sign In"></ButtonReg>
              </Link>
            </div>
          </div>
          <div className="register_middle"></div>
          <div className="register_right">
            <h2>REGISTER</h2>
            <form className="register_form" onSubmit={Submit}>
              <div className="register_form_top">
                <div className="register_name">
                  <label>Name</label>
                  <br></br>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_email">
                  <label>Email</label>
                  <br></br>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_mobile">
                  <label>Phone</label>
                  <br></br>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_state">
                  <label>State</label>
                  <br></br>
                  <input
                    type="text"
                    name="state"
                    value={user.state}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_district">
                  <label>District</label>
                  <br></br>
                  <input
                    type="text"
                    name="district"
                    value={user.district}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_address">
                  <label>Address</label>
                  <br></br>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_pincode">
                  <label>Pincode</label>
                  <br></br>
                  <input
                    type="text"
                    name="pincode"
                    value={user.pincode}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
                <div className="register_password">
                  <label>Password</label>
                  <br></br>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                  ></input>
                  <br></br>
                </div>
              </div>
              <div className="register_checkbox_button">
                <div className="register_checkbox">
                  <input type="checkbox" required></input>
                  <a href="#">
                    I agree to Terms and Condition receiving marketing and
                    promotional materials
                  </a>
                  <br></br>
                </div>
                <div className="register_button">
                  <ButtonReg content="Register"></ButtonReg>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Refer></Refer>
      </div>
    </div>
  );
}
