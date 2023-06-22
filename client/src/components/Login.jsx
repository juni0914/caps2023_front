import React from "react";
import { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { cookies, setCookie, useCookies } from "react-cookie"
// import { setCookie, getCookie,removeCookie } from "./cookie";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [isLogin, setIsLogin] = useState(false);
  // const [user, setUser] = useState({});
  
  const token = localStorage.getItem('login-token') || '';

  const setLoginToken = (token) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem('login-token', token);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
  
  const login = async () => {
    try {
      const response = await axios({
        url: "http://localhost:8080/login",
        method: "POST",
        withCredentials: true,
        data: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (response.status === 200) {
        localStorage.setItem('login-token', response.headers.authorization);
        window.open('/', '_self');
      }
    } catch (error) {
      console.error(error);
    }
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

  const logout = () => {
    // axios({
    //   url: "http://localhost:8080/logout",
    //   method: "POST",
    //   withCredentials: true,
    // }).then((res) => {
    //   if (res.status === 200) {
    //     window.open("/", "_self");
    //   }
    // });
    console.log("로그아웃됨")
    localStorage.clear()
    window.location.replace('http://localhost:3000/')
  };




  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8080/api/user/1", // user/success 에서 변경했는데 되긴함. 수정 필요
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
      <div className="auth-wrapper" style={{
            background: 'linear-gradient(30deg, #b4fedb 0%, #FFE6FA 70%)'
        }} >
          <form>
            <h2 style={{fontSize: '40px',letterSpacing: '10px', color:"#C4B4E1",textAlign: 'center'}}>LOGIN</h2>
                  <label>Email</label>
            <input
              placeholder="email"
              className="inputValue"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <label className="inputLabel" style={{ color: 'white', textDecoration: 'none' }}>password</label>
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              className="inputValue"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

          <button onClick={login} type="submit" style={{
            width: '400px',cursor: 'pointer'}}>Login</button>
          <Link style={{ color: '#C4B4E1', textDecoration: 'none' }} to="/join">아직 아이디가 없으신가요?  </Link>
        </form>
    </div>


  );
}