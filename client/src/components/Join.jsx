import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import gnulogo from '../images/gnulogo.png';

export default function Join() {
  const [username, setUsername] = useState(''); //아이디 상태 저장
  const [password, setPassword] = useState(''); //비밀번호 상태 저장
  const [nickname, setNickname] = useState(''); //닉네임 상태 저장 
  const [confirmPassword, setConfirmPassword] = useState(''); //비밀번호 확인 상태 저장
  const [showPassword, setShowPassword] = useState(false); //비밀번호 텍스트 표시 상태 저장
  const server_api = process.env.REACT_APP_SERVER_API;

  const navigate = useNavigate();

  const join = async () => {

    const isValidPassword = validatePassword(password);  // 패스워드 유효성 검사

    if (!isValidPassword) {
      return; // 유효성 검사에 실패한 경우 종료
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return; // 비밀번호 확인이 일치하지 않는 경우 종료
    }

    setPassword('');  //패스워드 칸 초기화
    setConfirmPassword('');  //패스워드확인 칸 초기화

    try {
      const response = await axios({
        url: `${server_api}/join`,
        method: "POST",
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          username: username,
          nickname: nickname,
          password: password,
        }),
      });
  
      if (response.status === 201) {
        alert("회원가입되었습니다.");
        navigate('/login');
        console.log(response);
        console.log("username: ", username);
        console.log("nickname: ", nickname);
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

  const handleNicknameChange = (e) => {
    const inputValue = e.target.value;
    const maxChars = 6; // 한글 기준으로 5글자 제한
  
    if (inputValue.length <= maxChars) {
      setNickname(inputValue);
    }
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
        <div className="auth-wrapper">
          <form style={{padding: '30px 50px'}}>
            <h2 style={{fontSize: '40px',letterSpacing: '10px', color:"#50BDCF",textAlign: 'center'}}>JOIN</h2>
                  <label>✉ Email</label>
          <input
            placeholder="email"
            className="inputValue"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            maxLength={20}
          />
          <label>🤍 Nickname</label>
          <input
            placeholder="(최대 6자)"
            className="inputValue"
            onChange={handleNicknameChange}
            value={nickname}
            maxLength={6}
          />
          

        <div className="inputGroup">
          <label>🔒 Password</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="inputValue"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {/* 눈 모양 아이콘 */}
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
        </div>


        <div className="inputGroup"  style={{marginTop: "-15px"}}>
            <label>🔒 Confirm Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="confirm password"
              className="inputValue"
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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
        </div>
        <button onClick={join} type="button" style={{marginTop: "10px"}}>Join</button>
        <Link style={{ color: '#50BDCF', textDecoration: 'none', fontWeight: '800'}} to="/login">로그인 하러가기  </Link>
{/*         <p>{props.data}</p> */}
          </form>
    </div>
</div>

  );
}