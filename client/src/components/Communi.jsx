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
  const [title, setTitle] = useState("");       // 내가 작성하는 게시글 정보 저장
  const [content, setContent] = useState("");   // 내가 작성하는 내용 정보 저장
  const [posts, setPosts] = useState([])
  // const [alltitle, setAlltitle] = useState([]);       // 전체 게시글 제목 정보 저장 
  // const [allcontent, setAllcontent] = useState([]);   // 전체 게시글 내용 정보 저장 
  const [isOpen, setIsOpen] = useState(false); // 모달 창 열림 여부

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
            // console.log(res.data)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => { // 모든 게시글 가져오기
    try {
      axios({
        url: "http://localhost:8080/post/readAll",
        method: "GET",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          if (res.data && res.data.content) {
            setPosts(res.data.content);
            console.log(res.data.content)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  const handleCreatePost = () => {    //게시글 생성 함수

      if (window.confirm("게시글을 작성하시겠습니까?")) {
        axios({
          url: "http://localhost:8080/post/create",
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          data: JSON.stringify({
            title: title,
            content: content,
          }),
        })
          .then((res) => {
            setIsOpen(false);
            setTitle('');
            setContent('');
            window.location.reload();
            // window.location.href = 'http://localhost:3000/community';
            console.log("게시글이 성공적으로 생성되었습니다:", res.data);
          })
        
          .catch((error) => {
              console.error("게시글 생성 중 오류가 발생했습니다:", error);
            });
      }else {
          console.log('작성이 취소되었습니다.');
        }
        
  };

    
      return (
        <>
          <div style={{ display: 'flex' }}>
            <div className="sidebar">
                <h2 id="sidepaneltitle">🏫 경상국립대학교<br />체육시설 예약 사이트</h2>
                <h4>
                ⛹️‍♂️ {user.username} 님
                <button  onClick={logout} style={{float: 'right', backgroundColor: 'white'}}>Logout</button>
                </h4>
                <h4><Link style={{ textDecoration: 'none', fontWeight: '800' }} to="/">홈화면으로 이동  </Link></h4><br/>
            </div>

            <div>

              {/* 글쓰기 버튼 */}


              <div className="board">
              <h1 className="board-title">게시판</h1> 
                <div className="board-button">
                  <Button variant="primary" onClick={() => setIsOpen(true)}>글쓰기</Button>
                </div>
                <div className="post-list">
                  {posts.map((post, index) => (
                    <div key={index} className="post">
                      <h3 className="post-title">제목: {posts[posts.length - index - 1].title}</h3>
                      <p className="post-content">내용: {posts[posts.length - index - 1].content}</p>
                      <p className="post-author">작성자: {posts[posts.length - index - 1].user.username}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 모달 창 */}
              <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>게시글 작성</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                      />
                    </Form.Group><br/>
                    <Form.Group>
                      <Form.Label>내용</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setIsOpen(false)}>닫기</Button>
                  <Button variant="primary" onClick={handleCreatePost}>게시글 생성</Button>
                </Modal.Footer>
              </Modal>
            </div>
        </div>  
      </>
      );
    };
    

export default Communi;
