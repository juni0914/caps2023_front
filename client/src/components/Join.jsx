import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import gnulogo from '../images/gnulogo.png';

export default function Join() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const join = async () => {

    const isValidPassword = validatePassword(password);  // 패스워드 유효성 검사

    if (!isValidPassword) {
      return; // 유효성 검사에 실패한 경우 종료
    }

    setPassword('');  //패스워드 칸 초기화

    try {
      const response = await axios({
        url: "http://localhost:8080/join",
        method: "POST",
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (response.status === 201) {
        alert("회원가입되었습니다.");
        navigate('/login');
        console.log(response);
        console.log("username: ", username);
        console.log("password: ", password);
      }
    } catch (error) {
      alert("이미 사용중인 아이디입니다.");
      console.error(error);
    }
  };

  const validatePassword = (inputPassword) => {  // 패스워드 유효성 검사(6자 이상 & 특수문자 1개이상 포함)
    if (inputPassword.length < 6) {
      alert("비밀번호는 최소 6자 이상이고 최소 1개이상의 특수문자가\n포함되어야 합니다.");
      return false;
    }
  
    const specialCharacters = /[~`!@#$%^&*(),.?":{}|<>_\-/]/;
    if (!specialCharacters.test(inputPassword)) {
      alert("비밀번호에는 최소 1개 이상의 특수문자가 포함되어야 합니다.");
      return false;
    }
  
    return true;
  };
  

  return (
    <div className="auth-wrapper-container" style={{ display: 'flex' }}>
    <div className="second-auth" style={{ flex: '1' }}>
    <form style={{ textAlign: 'center' }}> 
            <p style={{fontSize: '20px', textAlign: 'left'}}>" Effortlessly book your favorite sports facilities "</p>
              <img src={gnulogo} alt="GNU 로고" />
              <h1>GNU</h1>
              <h2>Sports Facility</h2><h2>Reservation </h2>
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
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            value={password}
            onBlur={() => validatePassword(password)}
          />
        </div>
        <button onClick={join} type="button" >Join</button>
        <Link style={{ color: '#50BDCF', textDecoration: 'none', fontWeight: '800'}} to="/login">로그인 하러가기  </Link>
{/*         <p>{props.data}</p> */}
          </form>
    </div>
</div>

  );
}