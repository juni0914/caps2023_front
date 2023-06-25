import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import Component1 from "./Map";
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import "./communi.css";


function Communi() {
  const [isLogin, setIsLogin] = useState(false); //로그인 정보 저장
  const [user, setUser] = useState({});         // user 정보 저장

  let token = localStorage.getItem('login-token') || '';

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
    alert("로그아웃 되었습니다.")
    localStorage.clear()
    window.location.replace('http://localhost:3000/login')
  };


  const posts = [
    { id: 1, title: 'First Post', author: 'John Doe', date: '2023-05-25' },
    { id: 2, title: 'Second Post', author: 'Jane Smith', date: '2023-05-26' },
    { id: 3, title: 'Third Post', author: 'Mike Johnson', date: '2023-05-27' },
    { id: 4, title: 'Fourth Post', author: 'Lee Johnson', date: '2023-05-28' }
  ];

  useEffect(() => { // 로그인 여부와 사용자 정보 가져오기
    try {
      axios({
        url: "http://localhost:8080/user/success",
        method: "GET",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          if (res.data) {
            setIsLogin(true);
            setUser(res.data);
            console.log(res.data)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


    
      return (
        <>
        <div style={{ display: 'flex' }}>
            <div className="sidebar">
                <h2 id="sidepaneltitle">🏫 경상국립대학교<br />체육시설 예약 사이트</h2>
                <h4>
                ⛹️‍♂️ {user.username} 님
                <button onClick={logout} style={{float: 'right', backgroundColor: 'white'}}>Logout</button>
                </h4>
                <h4><Link style={{ textDecoration: 'none', fontWeight: '800' }} to="/">홈화면으로 이동  </Link></h4><br/>
            </div>

        <div className="board">
        <h1 className="board-title">게시판</h1>
        <div className="post-list">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-info">
                작성자: {post.author} | 날짜: {post.date}
              </p>
              <p className="post-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod lorem ac leo
                feugiat, at auctor diam gravida. Nulla facilisi. Curabitur ac volutpat ligula.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>  
      </>
      );
    };
    

export default Communi;
