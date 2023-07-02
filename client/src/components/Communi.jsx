import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import Component1 from "./Map";
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import gnuhan from "../images/gnuhan.png"
import "./communi.css";

function Communi() {
  const [isLogin, setIsLogin] = useState(false); //로그인 정보 저장
  const [user, setUser] = useState({});         // user 정보 저장
  const [title, setTitle] = useState("");       // 내가 작성하는 게시글 정보 저장
  const [content, setContent] = useState("");   // 내가 작성하는 내용 정보 저장setTitle
  const [posts, setPosts] = useState([])                //전체 게시글의 글 전체 정보 저장
  // const [alltitle, setAlltitle] = useState([]);       // 전체 게시글 글 제목 정보 저장 
  // const [allcontent, setAllcontent] = useState([]);   // 전체 게시글 글 내용 정보 저장 
  const [isOpen, setIsOpen] = useState(false); // 글쓰기 모달 창 열림 여부
  const [secondOpen, setsecondOpen] = useState(false); // 특정 글 조회 모달 창 열림 여부
  const [updateOpen, setUpdateOpen] = useState(false); // 글수정 모달 창 열림 여부
  const [post, setPost] = useState(null);       //클릭하는 특정 게시글의 정보 저장
  const [size, setSize] = useState(7); // 페이지당 게시물 수
  const [page, setPage] = useState(0); // 페이지 번호
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);


  let token = localStorage.getItem('login-token') || '';

  const logout = () => {
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

  const setIsClose = () => {    // 글 수정창을 닫을 시 제목과 내용  state 초기화
    setTitle("");
    setContent("");
    setUpdateOpen(false);
  };


  const fetchPosts = async () => {        //모든 게시물 불러오기
    try {
      const response = await axios.get(`http://localhost:8080/post/readAll?page=${page}&size=${size}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (response.data && response.data.content) {
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.number);
        console.log(response.data.content);
        // console.log(response.data.content[1].id)
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, [page, size]);

  const maxPageButtons = 5; // 페이지 이동 버튼의 최대 개수

  // 실제 렌더링할 페이지 이동 버튼 개수 계산
  const displayedPageButtons = Math.min(totalPages, maxPageButtons);

  const goToPage = (pageNumber) => {    //특정 페이지 버튼
    setPage(pageNumber);
  };

  const goToPreviousPage = () => {    //이전 페이지 버튼
    if (page > 0) {
      setPage(page - 1);
    }
  };
  
  const goToNextPage = () => {        //다음 페이지 버튼
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };



  const handleCreatePost = () => {        //게시글 생성하기
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
          alert("게시글이 성공적으로 생성되었습니다")
          console.log("게시글이 성공적으로 생성되었습니다:", res.data);
          
          // 게시글 생성 후 게시글 리스트 업데이트
          fetchPosts();
        })
        .catch((error) => {
          alert("글 내용은 최대 255자까지만 허용됩니다.")
          console.error("게시글 생성 중 오류가 발생했습니다:", error);
        });
    } else {
      console.log('작성이 취소되었습니다.');
    }
  };
  


  const handleClick = (postId) => {        //클릭한 특정 게시물 상세 정보 가져오기
      try {
        axios({
          url: `http://localhost:8080/post/read/${postId}`,
          method: "GET",
          withCredentials: true,
          headers: {
            'Authorization': token
          }
        })
          .then((res) => {
            if (res.data) {
              setPost(res.data)
              setsecondOpen(true)
              console.log(post)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
  };


  const handleUpdatePost = (postId) => {        //게시글 수정하기

    if (window.confirm("게시글을 수정하시겠습니까?")) {
      axios({
        url: `http://localhost:8080/post/update/${postId}`,
        method: "PATCH",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        data: {
          postId: postId,
          title: title,
          content: content,
        },
      })
        .then((res) => {
          alert("게시글이 수정되었습니다")
          console.log("게시글이 수정되었습니다:", res.data); 
          // 게시글 수정 후 게시글 리스트 업데이트
          fetchPosts();
          setTitle('');
          setContent('');
          setUpdateOpen(false);
        })
        .catch((error) => {
          alert("글 내용은 최대 255자까지만 허용됩니다.")
          console.error("게시글 수정 중 오류가 발생했습니다:", error);
        });
    } else {
      console.log('수정이 취소되었습니다.');
    }
  };

  const openUpdateModal = (postId) => {         //글 수정하기 버튼 눌렀을 때 모달창이 등장하는 함수
    if (post.user.username === user.username) { 
      try {
        axios({
          url: `http://localhost:8080/post/read/${postId}`,
          method: "GET",
          withCredentials: true,
          headers: {
            'Authorization': token
          }
        })
          .then((res) => {
            if (res.data) {
              setPost(res.data);
              setTitle(res.data.title);
              setContent(res.data.content);
              setsecondOpen(false);
              setUpdateOpen(true);
              console.log(post);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }else{
      alert('자신의 게시글만 수정이 가능합니다')
    }
  };


  const handlePostDelete = (postId) => {        //클릭한 특정 게시물 삭제하기
    if(post.user.username === user.username){
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        try {
          axios({
            url: `http://localhost:8080/post/delete/${postId}`,
            method: "DELETE",
            withCredentials: true,
            headers: {
              'Authorization': token
            }
          })
            .then((res) => {
              if (res.data) {
                alert("게시글이 삭제되었습니다")
                fetchPosts();
                setPost(res.data)
                setsecondOpen(false)
                // console.log(postId)
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }else{
      alert('자신의 게시글만 삭제할 수 있습니다.')
    }
    
};


    
      return (
        <>
          <div style={{ display: 'flex' }}>
            <div className="sidebar">
                <h2 id="sidepaneltitle">
                <img src={gnuhan} style={{ width: '300px', height: '60px', marginBottom: '10px'}}alt="GNU 로고" />
                 경상국립대학교<br />체육시설 커뮤니티</h2><br />
                <h4>
                ⛹️‍♂️ {user.username} 님
                <button  onClick={logout} style={{float: 'right', backgroundColor: 'white'}}>Logout</button>
                </h4><br />
                <h4><Link style={{ textDecoration: 'none', fontWeight: '800' }} to="/">홈 화면으로 이동하기  </Link></h4><br/>
            </div>

            <div>

              {/* 글쓰기 버튼 */}


              <div className="board">
              <h1 className="board-title">게시판</h1> 
                <div className="board-button">
                  <Button variant="primary" onClick={() => setIsOpen(true)}>글쓰기</Button>
                </div>
                <div className="post-list">
                  {posts.reverse().map((post) => (
                    <div key={post.id} className="post" onClick={() => handleClick(post.id)}>
                      <h3 className="post-title">◾ 제목 : {post.title}</h3>
                      {/* <p className="post-content">{post.id}</p> */}
                      <h4 className="post-author">▫ 작성자 : {post.user.username}</h4>
                    </div>
                  ))}
                </div><br/>
                <div className="pagination-buttons">
                  <Button
                    variant="secondary"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                  >
                    &lt; 이전
                  </Button>
                  <span className="pagination-button-gap" style={{ width: '10px' }} />
                  {Array.from({ length: displayedPageButtons  }, (_, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      onClick={() => goToPage(index)}
                      disabled={currentPage === index}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <span className="pagination-button-gap" style={{ width: '10px' }} />
                  <Button
                    variant="secondary"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    &gt; 다음
                  </Button>
                </div>
              </div>

              {/* 글쓰기 모달 창 */}
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
                        maxLength={20}
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
                        maxLength={255}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setIsOpen(false)}>닫기</Button>
                  <Button variant="primary" onClick={handleCreatePost}>게시글 생성</Button>
                </Modal.Footer>
              </Modal>

               {/* 글수정 모달 창 */} 
              <Modal show={updateOpen} onHide={() => setIsClose(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>게시글 수정</Modal.Title>
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
                        maxLength={20}
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
                        maxLength={255}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setIsClose(false)}>닫기</Button>
                  <Button variant="primary" onClick={()=> handleUpdatePost(post.id)}>게시글 수정</Button>
                </Modal.Footer>
              </Modal>


              <Modal show={secondOpen} onHide={() => setsecondOpen(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{post && post.user && post.user.username}님의 게시글</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {post && (
                  <>
                    <h4>제목 : {post.title}</h4><br/>
                    <p style={{ wordWrap: 'break-word', maxWidth: '100%' }}>{post.content}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {post && post.user && user && post.user.username === user.username && (
                    <>
                      <Button variant="outline-danger" onClick={() => handlePostDelete(post.id)} style={{marginRight: '5px'}}>글 삭제</Button>
                      <Button variant="outline-success" onClick={() => openUpdateModal(post.id)} >수정하기</Button>
                    </>
                  )}
                </div>
                    <Button variant="secondary" onClick={() => setsecondOpen(false)}>닫기</Button>
              </Modal.Footer>
              </Modal>
            </div>
        </div>  
      </>
      );
    };
    

export default Communi;
