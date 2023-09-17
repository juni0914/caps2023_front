import React, { KeyboardEvent } from "react";
import { useState, useEffect, useRef } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ginu300 from '../images/ginu300.gif';

// import { cookies, setCookie, useCookies } from "react-cookie"
// import { setCookie, getCookie,removeCookie } from "./cookie";


export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false); //비밀번호 텍스트 표시 상태 저장

  const inputRef = useRef<HTMLInputElement | null>(null);
  const server_api = process.env.REACT_APP_SERVER_API;
  const token = localStorage.getItem('login-token') || '';
  
  const login = async () => {
    try {
      if (username.trim() === '' || password.trim() === '') {
        alert('아이디 또는 비밀번호를 입력해주세요.');
        return;
      }
      const response = await axios({
        url: `${server_api}/login`,
        method: "POST",
        withCredentials: true,
        data: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.status === 200) {
        alert('로그인 되었습니다.')
        localStorage.setItem('login-token', response.headers.authorization);
        window.open('/', '_self');
      }
    } catch (error) {
      alert('등록되지 않은 아이디이거나 아이디 또는 비밀번호를\n잘못 입력했습니다.')
      console.log(error);
    }
  };


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    try {
      axios({
        url: `${server_api}/api/user/1`, // user/success 에서 변경했는데 되긴함. 수정 필요
        method: "GET",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          if (res.data) {
            // setIsLogin(true);
            // setUser(res.data);
            console.log(res.data)
            console.log(token);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  const handleKeyPress = (event: KeyboardEvent) => {       // 엔터키를 누르면 로그인함수 작동
    if (event.key === 'Enter') {
      event.preventDefault();
      login();
    }
  };

  return (
    <div className="auth-wrapper-container" style={{ display: 'flex' }}>
      <div className="second-auth">
            <form style={{ textAlign: 'center' }}> 
            <p style={{fontSize: '20px', textAlign: 'left'}}>" Effortlessly book your favorite sports facilities "</p>
              <img src={ginu300} alt="GNU 로고" />
              <h1>GNU</h1>
              <h2>Sports Facility</h2><h2>Reservation </h2>
            </form>
      </div>

      <div className="auth-wrapper"  >
          <form>
            <h2 style={{fontSize: '40px',letterSpacing: '10px', color:"#50BDCF",textAlign: 'center'}}>LOGIN</h2>
                  <label style={{marginTop: '50px'}}>✉ ID</label>
            <input
              ref={inputRef}
              placeholder="ID"
              className="inputValue"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              maxLength={20}
            />

            <label style={{marginTop: '30px'}}>🔒 Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="inputValue"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
                value={password}
              />
              {showPassword ? (
                <FiEyeOff
                  style={{ cursor: 'pointer', position: 'absolute', right: '10px', marginBottom: '20px'}}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FiEye
                  style={{ cursor: 'pointer', position: 'absolute', right: '10px', marginBottom: '20px' }}
                  onClick={() => setShowPassword(true)}
                />
              )}
          </div>
          <button onClick={login} type="button" style={{marginTop: '30px'}}>Login</button><br/>
          <Link style={{ color: '#50BDCF', textDecoration: 'none', fontWeight: '800' }} to="/join">아직 아이디가 없으신가요?  </Link>
        </form>
      </div>



    </div>

  );
}