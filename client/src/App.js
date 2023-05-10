import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import Main from "./components/Main";
import Join from "./components/Join";
import Map from "./components/Map";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import { NavermapsProvider } from 'react-naver-maps';
// import { useEffect, useState } from "react";



function App() {
  return (
    <div className="App">

      <NavermapsProvider 
      ncpClientId='ujwxyclvcs'
      // or finClientId, govClientId  
    >
      </NavermapsProvider>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" exact={true} element={<Main />}/>
        <Route path="/join" exact={true} element={<Join />}/>
        <Route path="/map" exact={true} element={<Map />}/>
      </Routes>
    </div>

  );
}

export default App;
