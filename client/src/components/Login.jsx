import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
// import { cookies, setCookie, useCookies } from "react-cookie"
// import { setCookie, getCookie,removeCookie } from "./cookie";


export default function Login({ setIsLogin, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    axios({
      url: "http://localhost:8080/login", //login3에 post안되다가 login으로 바꾸니까 다시 되긴함
      method: "POST",
      withCredentials: true,
      data: JSON.stringify({
        username: username,
        password: password,
      }),

    }).then((res) => {
      
      if (res.status === 200) {
        window.open('/', '_self')
        localStorage.setItem('login-token',res.headers.authorization)
        console.log("로그인됨")
        console.log(res)
        // console.log("username : ",username,"\tpassword : ",password)

      }
    });
  };
  
  // const accessToken = () => {
  //   axios({
  //     url: "http://localhost:8080/accesstoken",
  //     method: "GET",
  //     withCredentials: true,
  //   });
  // };

  // const refreshToken = () => {
  //   axios({
  //     url: "http://localhost:8080/refreshtoken",
  //     method: "GET",
  //     withCredentials: true,
  //   });
  // };
  return (
    <div>
      <div className="loginContainer">
        <div className="inputGroup">
          <label className="inputLabel" style={{ color: 'white', textDecoration: 'none' }}>email</label>
          <input
            type="email"
            placeholder="email"
            className="inputValue"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel" style={{ color: 'white', textDecoration: 'none' }}>password</label>
          <input
            type="password"
            placeholder="password"
            className="inputValue"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={login} className="loginButton" style={{cursor: 'pointer'}}>Login</button>
        {/* <Link style={{ color: 'white', textDecoration: 'none' }} to="/join">아직 아이디가 없으신가요?  </Link> */}
        {/* <p>{setUser}</p> */}
      </div>
    </div>


  );
}