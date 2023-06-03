import Main from "./Main";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import Component1 from "./Map";


function SidePanel() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
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


  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8080/user/success",
        method: "GET",
        withCredentials: true,
        headers:{
          'Authorization' : token
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
      <div
      style={{
          backgroundColor: "#b4fedb",
          width: "22vw",
          padding: '2rem',
          minHeight: '115%',
          color: '#5a635f',
          minWidth: '100%',
          borderRadius: '20px',
          marginLeft: '20px',
      }}>
        <h2 id="sidepaneltitle" style={{fontWeight: '600'}}>
        🏫 경상국립대학교<br/>체육시설 예약 사이트
        </h2>
        <h4 style={{marginTop: '20px'}}>
          😊 {user.username} 님  
           <button onClick={logout}  style={{backgroundColor: "white",borderRadius: '20px', fontSize: '15px',
           border: 'none',color: '#5a635f', float: 'right',padding: '0.5rem',cursor: 'pointer'}}>Logout</button>
        </h4><br/>
        <h4 style={{marginLeft : '10px'}}>✔ 예약현황</h4>
        {/* <Component1/> */}
      </div>
    )
  }
  
  export default SidePanel;