import axios from "axios";
import Login from "./components/Login";
import Join from "./components/Join";
import Map from "./components/Map";
import Communi from "./components/Communi";
// import Community from "./components/Community";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import { NavermapsProvider } from 'react-naver-maps';
import { useEffect, useState } from "react";




function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('login-token');
    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);


  return (

    <div className="App">
      <NavermapsProvider 
      ncpClientId='ujwxyclvcs'
      // or finClientId, govClientId  
    >
      </NavermapsProvider>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/join" exact={true} element={<Join />}/>
        <Route path="/" exact={true} element={<Map />}/>
        <Route path="/community" exact={true} element={<Communi />}/>
      </Routes>
    </div>

  );
}

export default App;