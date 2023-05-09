import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Join({ setIsJoin, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const join = (props) => {
    axios({
      url: "http://localhost:8080/join",
      method: "POST",
      withCredentials: true,
      data: {
        username: username,
        password: password,
      },
    }).then((result) => {
      if (result.status === 201) {
//         window.open('/', '_self')
        console.log("회원가입됨")
        console.log(result)
        console.log("username : ",username)
        console.log("password : ",password)
      }
    });
  };

  

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
        <button onClick={join} className="loginButton">Join</button>
        {/* <Link style={{ color: 'white', textDecoration: 'none' }} to="/">로그인 하러가기  </Link> */}
{/*         <p>{props.data}</p> */}
      </div>
    </div>


  );
}