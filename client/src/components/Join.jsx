import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Join({ setIsJoin, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const join = () => {
    axios({

      url: "http://localhost:8080/join", 
      method: "POST",
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      if (res.status === 201) {
//         window.open('/', '_self')
        console.log("회원가입됨")
        console.log(res)
        console.log("username : ",username)
        console.log("password : ",password)
        alert("회원가입되었습니다.")
      }
    });
  };

  

  return (
<div className="auth-wrapper" style={{
            background: 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)'
        }} >
          <form>
            <h2 style={{fontSize: '40px',letterSpacing: '10px', color:"#C4B4E1",textAlign: 'center'}}>JOIN</h2>
                  <label>Email</label>
          <input
            type="email"
            placeholder="email"
            className="inputValue"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

        <div className="inputGroup">
          <label className="inputLabel" style={{ color: 'white', textDecoration: 'none' }}>password</label>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            className="inputValue"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={join} type="submit" style={{cursor : "pointer"}}>Join</button>
        <Link style={{ color: '#C4B4E1', textDecoration: 'none' }} to="/login">로그인 하러가기  </Link>
{/*         <p>{props.data}</p> */}
          </form>
    </div>


  );
}