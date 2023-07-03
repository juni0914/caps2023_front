import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import gnulogo from '../images/gnulogo.png';

export default function Join({ setIsJoin, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        alert("회원가입되었습니다.")
        navigate('/login');
        console.log(res)
        console.log("username : ",username)
        console.log("password : ",password)

      }
    });
  };

  

  return (
    <div className="auth-wrapper-container" style={{ display: 'flex' }}>
    <div className="second-auth" style={{ flex: '1' }}>
          <form style={{ textAlign: 'center' }}> 
          <p style={{fontSize: '20px', textAlign: 'left'}}>"Effortlessly book your favorite sports facilities"</p>
            <img src={gnulogo} alt="GNU 로고" />
            <h2 style={{fontSize: '40px',letterSpacing: '10px', color:"#50BDCF",textAlign: 'left', marginTop: '20px'}}>GNU</h2>
            <h2 style={{fontSize: '35px',letterSpacing: '10px', color:"#50BDCF",textAlign: 'left'}}>Sports Facility</h2>
            <h2 style={{fontSize: '35px',letterSpacing: '10px', color:"#50BDCF",textAlign: 'left'}}>Reservation </h2>
          </form>
    </div>
        <div className="auth-wrapper" >
          <form>
            <h2 style={{fontSize: '40px',letterSpacing: '10px', color:"#50BDCF",textAlign: 'center'}}>JOIN</h2>
                  <label>✉ Email</label>
          <input
            placeholder="email"
            className="inputValue"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

        <div className="inputGroup">
          <label className="inputLabel" style={{ color: 'white', textDecoration: 'none' }}>password</label>
          <label>🔒 Password</label>
          <input
            type="password"
            placeholder="password"
            className="inputValue"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button onClick={join} type="button" style={{cursor : "pointer", width: '400px'}}>Join</button>
        <Link style={{ color: '#50BDCF', textDecoration: 'none', fontWeight: '800'}} to="/login">로그인 하러가기  </Link>
{/*         <p>{props.data}</p> */}
          </form>
    </div>
</div>

  );
}