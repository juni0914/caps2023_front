import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import Main from "./components/Main";
import Join from "./components/Join";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/join" element={<Join />} />
    //     {/* <Login setUser={setUser} setIsLogin={setIsLogin} /> */}
    //   </Routes>
    // </Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" exact={true} element={<Main />}/>
        <Route path="/join" exact={true} element={<Join />}/>
      </Routes>
    </div>
  );
}

export default App;
