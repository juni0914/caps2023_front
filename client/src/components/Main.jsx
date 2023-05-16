import "./login.css";
import axios from "axios";
import Login from "./Login";
// import Join from "./components/Join";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";



function Main(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const accessToken = () => {
    axios({
      url: "http://localhost:8080/accesstoken",
      method: "GET",
      withCredentials: true,
    });
  };

  const refreshToken = () => {
    axios({
      url: "http://localhost:8080/refreshtoken",
      method: "GET",
      withCredentials: true,
    });
  };

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
    localStorage.clear()
    window.location.replace('http://localhost:3000/login')
  };


  let token = localStorage.getItem('login-token') || '';

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
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/join" element={<Join />} />
    //     {/* <Login setUser={setUser} setIsLogin={setIsLogin} /> */}
    //   </Routes>
    // </Router>
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <a onClick={accessToken} className="App-link">
          get Access Token
        </a>
        <a onClick={refreshToken} className="App-link">
          get Refresh Token
        </a>
        {isLogin ? (
          <>
            <h3>{user.username} 님이 로그인했습니다.</h3>
            <button onClick={logout} className="loginButton" style={{cursor: 'pointer'}}>
              Logout
            </button>
            <Link style={{color: "black"}}  to="/map">지도 사이트로 이동  </Link>
          </>
        ) : (
          <Login setUser={setUser} setIsLogin={setIsLogin} />
        )}
      </header>
    </div>
  );
}

export default Main;