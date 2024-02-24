import React from "react";
import "../style/login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Form = ({ isLogin, setLogin }) => {
  let navigate = useNavigate();

  // console.log(isLogin, "HOOOOOO");

  useEffect(() => {
    if (isLogin) {
      console.log("login ha user");
      navigate("/");
    }
  });
  const [user, setUser] = useState({
    adminname: "",
    password: "",
  });

  const handle = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    // console.log(user);
  };

  const handleSubmit = () => {
    const options = {
      url: "https://musafirmahalbackend.vercel.app/adminlogin",
      method: "POST",
      data: user,
    };
    axios(options)
      .then((response) => {
        let token = response.data.data.token;
        localStorage.setItem("adtoken", token);
        setLogin(true);
        // navigate("../home");
        // const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        // const expirationTime = tokenData.exp * 1000; // Expiration time in milliseconds
        // console.log(expirationTime, "---", Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div class="login-box">
        <h2>Admin Login</h2>
        <div>
          <div class="user-box">
            <input
              type="text"
              name="adminname"
              value={user.adminname}
              required=""
              onChange={handle}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name="password"
              value={user.password}
              required=""
              onChange={handle}
            />
            <label>Password</label>
          </div>
          <button className="butt" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Form;
