import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import gnuhan from "../images/gnuhan.png"
import "./communi.css";
import {GoCommentDiscussion} from 'react-icons/go'
import {IoPersonCircle} from 'react-icons/io5'
import { AiOutlineSearch } from 'react-icons/ai';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

function Communi() {
  const [isLogin, setIsLogin] = useState(false);     //로그인 정보 저장
  const [user, setUser] = useState({});               // user 정보 저장
  const [title, setTitle] = useState("");            // 내가 작성하는 게시글 정보 저장
  const [content, setContent] = useState("");        // 내가 작성하는 내용 정보 저장
  const [posts, setPosts] = useState([])                 //전체 게시글의 글 전체 정보 저장
  const [comment, setComment] = useState([])             //댓글 정보 저장
  const [isOpen, setIsOpen] = useState(false);           // 글쓰기 모달 창 열림 여부
  const [secondOpen, setsecondOpen] = useState(false);     // 특정 글 조회 모달 창 열림 여부
  const [updateOpen, setUpdateOpen] = useState(false);      // 글수정 모달 창 열림 여부
  const [commentOpen, setCommentOpen] = useState(false);  // 댓글달기 모달 창 열림 여부
  const [post, setPost] = useState(null);                  //클릭하는 특정 게시글의 정보 저장
  const [postComment, setPostComment] = useState(null);            //클릭하는 특정 게시글의 댓글 정보 저장
  const [postUpdateComment, setUpdateComment] = useState(null);       //댓글수정 모달 창 열림 여부
  const [commentId, setCommentId] = useState(null);       //commentId 정보 저장
  const [size, setSize] = useState(7); // 페이지당 게시물 수
  const [page, setPage] = useState(0); // 페이지 번호
  const [totalPages, setTotalPages] = useState(0);      // 게시물 페이지 수 정보 저장
  const [currentPage, setCurrentPage] = useState(0);    // 게시물 현재 페이지 정보 저장
  const [updatedCommentIdColor, setUpdatedCommentIdColor] = useState(null); // 댓글 수정되면 수정된 댓글 색상으로 표시
  const [updatedPostIdColor, setUpdatedPostIdColor] = useState(null); // 글 수정되면 수정된 글 색상으로 표시
  const [mypost, setMyPost] = useState([]); // 자신이 작성한 모든 글 정보
  const [myCommentPost, setMyCommentPost] = useState([]);  // 자신이 작성한 댓글이 있는 글 정보
  const [myInfo, setMyInfo] = useState(false); //내 정보 모달 창 열림여부
  const [searchQuery, setSearchQuery] = useState(""); // 게시글 검색어 정보 저장
  const [updateNickname, setUpdateNickname] = useState(false); //닉네임 변경 모달 창 열림여부
  const [newNickname, setNewNickname] = useState(''); // 변경할 닉네임 정보 저장


  let token = localStorage.getItem('login-token') || '';

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.")
      localStorage.clear()
      window.location.replace('http://localhost:3000/login')
    }
  };

  useEffect(() => {       // 로그인 여부와 사용자 정보 가져오기
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

  const handleSearchInputChange = (event) => { //게시글 제목 기준으로 검색
    setSearchQuery(event.target.value);
  };


  const openNicknameUpdate = () => {   // 닉네임변경 모달 창 열기 함수
    setUpdateNickname(true);
    setMyInfo(false);
  };


  const closeNicknameUpdate = () => {   // 닉네임변경 모달 창 닫기 함수
    setUpdateNickname(false);
    setMyInfo(true);
  };



  const openMyInfoModal = () => {   // 유저 모달 창 열기 함수
    setMyInfo(true);
    getMyCommentPost();
    fetchMyPosts();
  };


  const setUpdateClose = () => {       // 글 수정창을 닫을 시 제목과 내용  state 초기화
    setTitle("");
    setContent("");
    setUpdateOpen(false);
  };


  const setCommentUpdateClose = () => {       // 댓글 수정창을 닫을 시 댓글 내용  state 초기화
    setComment("");
    setUpdateComment(false);
    setCommentOpen(true);
  };

  const setCommentClose = () => {       // 댓글 작성 창을 닫을 시 제목과 내용  state 초기화
    setTitle("");
    setContent("");
    setComment("");
    setCommentOpen(false);
  };


  const handleUpdateNickname = () => {                  //닉네임 수정하기
    if (window.confirm("닉네임을 수정하시겠습니까?")) {
      axios({
        url: 'http://localhost:8080/user/update',
        method: "PATCH",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        data: {
          nickname: newNickname,
        },
      })
        .then((res) => {
          setUser((prevUser) => ({ ...prevUser, nickname: newNickname }));
          fetchMyPosts();
          fetchPosts();
          getMyCommentPost();
          closeNicknameUpdate();
          alert("닉네임이 수정되었습니다.")
          console.log("닉네임이 수정되었습니다:", res.data); 
        })
        .catch((error) => {
          alert("글 내용은 최대 255자까지만 허용됩니다.")
          console.error("게시글 수정 중 오류가 발생했습니다:", error);
        });
      } else {
        console.log('닉네임 수정이 취소되었습니다.');
      }
  };


  const fetchPosts = async () => {           //모든 게시물 불러오기
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
        fetchMyPosts();
        // console.log(response.data.content);
        // console.log(response.data.content[1].id)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyPosts = async () => {           //자신이 작성한 모든 게시물 불러오기
    try {
      const response = await axios.get(`http://localhost:8080/post/readAll`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (response.data && response.data.content) {
        setMyPost(response.data.content);
        // console.log(response.data.content[0].title)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (postId) => {      //게시물 댓글 불러오기
    try {
      const commentRes = await axios.get(`http://localhost:8080/comment/readAll/${postId}`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });
      if (commentRes.data) {
        setPostComment(commentRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  useEffect(() => {
    fetchPosts();
    fetchMyPosts();
    // getMyCommentPost();
  }, [page, size]);



  const maxPageButtons = 5; // 페이지 이동 버튼의 최대 개수

  // 실제 렌더링할 페이지 이동 버튼 개수 계산
  const displayedPageButtons = Math.min(totalPages, maxPageButtons);

  
  const goToPage = (pageNumber) => {    //특정 페이지 버튼
    setPage(pageNumber);
  };

  const goToPreviousPage = () => {                         //이전 페이지 버튼
    if (page > 0) {
      setPage(page - 1);
    }
  };
  
  const goToNextPage = () => {                          //다음 페이지 버튼
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };



  const handleCreatePost = () => {                      //게시글 생성하기
    if (title.trim().length >= 2 && content.trim().length >= 2) { 
      if (window.confirm("게시글을 작성하시겠습니까?")) {
        const currentTime = new Date().toLocaleString();
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
            createdAt: currentTime,    // 나중에 백엔드 수정해달라 하자, 글쓴 시간 보내기 위함임
          }),
        })
          .then((res) => {
            setIsOpen(false);
            setTitle('');
            setContent('');
            alert("게시글이 성공적으로 생성되었습니다.")
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
    }else{
      alert("제목과 내용이 최소 2글자 이상이어야 합니다.")
    }  
  };
  

  const handleClick = (postId) => {                     //클릭한 특정 게시물 상세 정보 가져오기
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
              console.log(res.data)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
  };


  const handleUpdatePost = (postId) => {                  //게시글 수정하기
    if (title.trim().length >= 2 && content.trim().length >= 2) {  
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
            alert("게시글이 수정되었습니다.")
            console.log("게시글이 수정되었습니다:", res.data); 
            // 게시글 수정 후 게시글 리스트 업데이트
            fetchPosts();
            setTitle('');
            setContent('');
            setUpdateOpen(false);
            getMyCommentPost();
            // 글이 수정되었을 때 색상 표시
            setUpdatedPostIdColor(postId);
            setTimeout(() => {
              setUpdatedPostIdColor(null);
            }, 2000); // 3초 후에 원래 색상으로 되돌림
          })
          .catch((error) => {
            alert("글 내용은 최대 255자까지만 허용됩니다.")
            console.error("게시글 수정 중 오류가 발생했습니다:", error);
          });
      } else {
        console.log('수정이 취소되었습니다.');
      }
    }else{
      alert("제목과 내용이 최소 2글자 이상이어야 합니다.")
    } 
  };

  const openUpdateModal = (postId) => {               //글 수정하기 버튼 눌렀을 때 모달창이 등장하는 함수
    if (post.user.nickname === user.nickname) { 
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
              console.log(postId);
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


  const handleCreateComment = (postId) => {                 //게시글에 댓글달기
    if (comment.trim().length >= 2) {
      if (window.confirm("작성하신 댓글을 작성하시겠습니까?")) {
        axios({
          url: `http://localhost:8080/comment/create/${postId}`,
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          data: {
            content: comment
          },
        })
          .then((res) => {
            alert("댓글이 작성되었습니다.")
            console.log("댓글이 작성되었습니다:", res.data); 
            fetchPosts();
            fetchComments(postId);
            setComment('');
          })
          .catch((error) => {
            alert("댓글은 최대 100자까지만 허용됩니다.")
            console.error("댓글 작성 중 오류가 발생했습니다:", error);
          });
      } else {
        console.log('댓글 작성이 취소되었습니다.');
      }
    } else {
      alert('댓글은 최소 2글자 이상 입력해야 합니다.');
    } 
  };


  const openCommentModal = (postId) => {         //댓글보기 버튼 눌렀을 때 모달창이 등장하는 함수
      try {
        //게시글의 정보 가져오기
        axios({
          url: `http://localhost:8080/post/read/${postId}`,         //게시글의 정보 가져오기
          method: "GET",
          withCredentials: true,
          headers: {
            'Authorization': token
          }
        })
          .then((res) => {
            if (res.data) {
              // setPost(res.data);
              // setTitle(res.data.title);
              // setsecondOpen(false);
              setCommentOpen(true);
              console.log(postId)
            }
          })
          .catch((error) => {
            console.log(error);
          });

        // 게시물의 댓글 가져오기
        axios({
          url: `http://localhost:8080/comment/readAll/${postId}`,       // 게시물의 댓글 가져오기
          method: "GET",
          withCredentials: true,
          headers: {
            'Authorization': token
          }
        })
          .then((commentRes) => {
            if (commentRes.data) {
              console.log(commentRes.data)
              setPostComment(commentRes.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
          
      } catch (error) {
        console.log(error);
      }
  };


  const handlePostDelete = (postId) => {        //클릭한 특정 게시물 삭제하기
    if(post.user.nickname === user.nickname){
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
                alert("게시글이 삭제되었습니다.")
                fetchPosts();
                getMyCommentPost();
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

const handleCommentDelete = (commentId,postId) => {        //클릭한 댓글 삭제하기
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        axios({
          url: `http://localhost:8080/comment/delete/${commentId}`,
          method: "DELETE",
          withCredentials: true,
          headers: {
            'Authorization': token
          }
        })
          .then((res) => {
            if (res.data) {
              alert("댓글이 삭제되었습니다.")
              fetchPosts();
              fetchComments(postId);
              getMyCommentPost();
              // setsecondOpen(false)
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
};


const handleUpdateComment = (commentId,postId) => {                  //댓글 수정하기
  if (comment.trim().length >= 2) {
    if (window.confirm("댓글을 수정하시겠습니까?")) {
      axios({
        url: `http://localhost:8080/comment/update/${commentId}`,
        method: "PATCH",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        data: {
          content: comment
        },
      })
        .then((res) => {
          alert("댓글이 수정되었습니다.")
          console.log("댓글이 수정되었습니다:", res.data); 
          setCommentOpen(true);
          // 댓글이 수정되었을 때 색상 표시
          setUpdatedCommentIdColor(commentId);
          setTimeout(() => {
            setUpdatedCommentIdColor(null);
          }, 2000); // 3초 후에 원래 색상으로 되돌림

          // 게시글 수정 후 게시글 리스트 업데이트
          fetchComments(postId);
          setComment('');
          setUpdateComment(false);
        })
        .catch((error) => {
          alert("댓글 내용은 최대 255자까지만 허용됩니다.")
          console.error("댓글 수정 중 오류가 발생했습니다:", error);
        });
    } else {
      console.log('댓글 수정이 취소되었습니다.');
    }
  }else{
    alert("댓글은 최소 2글자 이상 입력해야 합니다.")
  }  
};


const openCommentUpdateModal = (commentId,postId) => {               //댓글 수정하기 버튼 눌렀을 때 모달창이 등장하는 함수
    try {
      axios({
        url: `http://localhost:8080/comment/readAll/${postId}`,
        method: "GET",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          if (res.data) {
            const targetComment = res.data.find(comment => comment.id === commentId);
            if (targetComment) {
              setCommentOpen(false);
              console.log(targetComment.content);
              setComment(targetComment.content);
              setCommentId(commentId);
              setUpdateComment(true);
              console.log(commentId);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
};
    
const getMyPosts = () => {   //내가 작성한 게시글 정보 불러오는 함수
  if (!user|| !mypost) {
    return []; // 사용자 정보가 없을 경우 빈 배열 반환
  }

  // 현재 로그인한 사용자의 nickname과 글을 작성한 사용자의 nickname을 비교하여 일치하는 글만 필터링
  return mypost.filter((post) => post.user.nickname === user.nickname);
};


const getMyCommentPost = () => {    //내가 작성한 댓글의 게시글 정보 불러오는 함수
  try {
    axios({
      url: "http://localhost:8080/post/postByMyComments",
      method: "GET",
      withCredentials: true,
      headers: {
        'Authorization': token
      }
    })
      .then((res) => {
        if (res.data) {
          setMyCommentPost(res.data.content);
          console.log(res.data.content);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

const handleNicknameChange = (e) => {         //닉네임 변경 글자 수 제한 함수 
  const inputValue = e.target.value;
  const maxChars = 6; // 한글 기준으로 5글자 제한

  if (inputValue.length <= maxChars) {
    setNewNickname(inputValue);
  }
};

      return (
        <>
          <div style={{ display: 'flex' }}>
            <div className="sidebar">
                <div>
                  <img src={gnuhan} style={{ width: '300px', height: '60px', marginBottom: '10px'}}alt="GNU 로고" />
                </div>
                <div>
                  <h2 id="sidepaneltitle"> 경상국립대학교<br />체육시설 커뮤니티</h2> <br />
                </div>

                
                <h4 onClick={openMyInfoModal} style={{cursor: 'pointer'}}>
                ⛹️‍♂️ {user.nickname} 님 
                <Button variant="outline-secondary" onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }} style={{
                    borderRadius: '20px', fontSize: '15px', borderWidth: '2px', marginLeft: '40px',
                    padding: '0.5rem', cursor: 'pointer' }}>Logout</Button>{' '}
                </h4><br />
                <h4 className="home-link"><Link style={{ textDecoration: 'none', fontWeight: '800', color: "#333" }} to="/">🏠 홈 화면으로 이동하기  </Link></h4><br/>
                {/* <h4 className="home-link">내가 작성한 게시글  </h4><br/>
                <div style={{ marginLeft: '10px' }}>
                  {getMyPosts().map((post) => (
                    <div key={post.id} style={{cursor: 'pointer'}}>
                      <p onClick={() => handleClick(post.id)}>◾{post.title}{' '}</p>
                    </div>
                  ))}
                </div> */}
            </div>

            <div>
              {/* 글쓰기 버튼 */}
              <div className="board">
              <h1 className="board-title" >
                경상국립대학교 체육시설 커뮤니티
                
              </h1> 

                <div className="board-button">
                  <Button variant="primary"size="lg" onClick={() => setIsOpen(true)}>글쓰기</Button>
                  <InputGroup     className='search_form' >
                    <InputGroup.Text id="basic-addon1">
                      <AiOutlineSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="제목으로 검색"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                  </InputGroup>
                </div>
                <div className="post-list">
                  {posts.filter((post) => post.title.includes(searchQuery)).map((post) => (
                    <div key={post.id} className={`post ${updatedPostIdColor === post.id ? 'updated' : ''}`} onClick={() => handleClick(post.id)}>
                      <h3 className="post-title">◾ 제목 : {post.title} 
                        {post.user && user && user.nickname === post.user.nickname ? 
                        (<span style={{ color: '#8282FF', marginRight: '10px' }}>ㅤ(내가 쓴 글)</span>) : null}
                        <div style={{ display: 'flex', justifyContent: 'center',  flexDirection: 'column',alignItems: 'center', width: '50px', height: '50px', borderRadius: '20%', backgroundColor: '#f8fcff', marginLeft: '10px', float: 'right' }}>
                        <span style={{ fontSize: '17px', marginTop: '5px',marginBottom: '-20px' }}>{post.commentSize}</span><br/><p style={{fontSize: '10px', margin: '0'}}>댓글</p>
                      </div></h3>
                        
                      <h4 className="post-author" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>▫ 작성자: {post.user.nickname}</span>
                        <span>작성일: {post.createdAt}</span>
                      </h4>
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
                    다음 &gt; 
                  </Button>
                </div>
              </div>
              

              <Modal show={myInfo} onHide={() => setMyInfo(false)} size="lg" >      {/* 내 정보 모달 창 */}
                <Modal.Header closeButton >
                  <Modal.Title><IoPersonCircle/> 내 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                                    borderRadius: '10px',
                                    padding: '20px',
                                    }}>
                  <Form>
                    <Form.Group>
                      <Form.Label><h4><strong>아이디 : {user.username}</strong></h4></Form.Label><br/>
                      <Form.Label><h4><strong>닉네임 : {user.nickname}</strong></h4></Form.Label> <Button variant="outline-secondary" onClick={openNicknameUpdate} style={{
                   borderRadius: '20px', fontSize: '15px', borderWidth: '2px', marginLeft: '40px', padding: '0.5rem', cursor: 'pointer' }}>
                    닉네임 변경</Button>
                    </Form.Group>
                    <Form.Group>

                    <hr style={{ borderTop: '1px solid #808080'}} />
                    <div style={{ display: 'flex' }}>
                      <div style={{ flex: 1 , marginRight: '10px'}}>
                        <Form.Label style={{
                   marginLeft: '15px' }}><HiOutlinePencilSquare/> 내가 작성한 게시글</Form.Label>
                        <div style={{ marginLeft: '10px'}}>
                          {getMyPosts().map((post) => (
                            <div key={post.id} style={{ cursor: 'pointer' }}>
                                <div key={post.id} className={`post ${updatedPostIdColor === post.id ? 'updated' : ''}`} onClick={() => handleClick(post.id)}>
                                  <h4 className="post-title" style={{fontSize: '15px'}}>◾ 제목 : {post.title}
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '45px', height: '45px', borderRadius: '20%', backgroundColor: '#f8fcff', marginLeft: '10px', float: 'right' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.commentSize}</span>
                                  </div></h4>
                                    
                                  <h4 className="post-author" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>▫ 작성자: {post.user.nickname}</span>
                                    <span>작성일: {post.createdAt}</span>
                                  </h4>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      <div style={{ flex: 1}}>
                        <Form.Label style={{ marginLeft: '15px' }}><GoCommentDiscussion/> 내가 댓글단 글</Form.Label>
                        <div style={{ marginLeft: '10px' }}>
                          {myCommentPost.map((post) => (
                              <div key={post.id} style={{ cursor: 'pointer' }}>
                                <div key={post.id} className={`post ${updatedPostIdColor === post.id ? 'updated' : ''}`} onClick={() => handleClick(post.id)}>
                                  <h3 className="post-title" style={{fontSize: '15px'}}>◾ 제목 : {post.title}
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '45px', height: '45px', borderRadius: '20%', backgroundColor: '#f8fcff', marginLeft: '10px', float: 'right' }}>
                                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{post.commentSize}</span>
                                  </div></h3>
                                    
                                  <h4 className="post-author" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>▫ 작성자: {post.user.nickname}</span>
                                    <span>작성일: {post.createdAt}</span>
                                  </h4>
                                </div>
                              </div>
                              ))}
                          </div>
                        </div>
                      </div>  
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setMyInfo(false)}>닫기</Button>

                </Modal.Footer>
              </Modal>


              {/* 글쓰기 모달 창 */}
              <Modal show={isOpen} onHide={() => setIsOpen(false)}>                         {/* 글쓰기 모달 창 */}
                <Modal.Header closeButton>
                  <Modal.Title>📝 게시글 작성</Modal.Title>
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
                        maxLength={30}
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
              <Modal show={updateOpen} onHide={() => {setUpdateClose(false); setsecondOpen(true);}}>          {/* 글수정 모달 창 */} 
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
                  <Button variant="secondary" onClick={() => setUpdateClose(false)}>닫기</Button>
                  <Button variant="primary" onClick={()=> handleUpdatePost(post.id)}>게시글 수정</Button>
                </Modal.Footer>
              </Modal>

              {/* 댓글 모달 창 */} 
              <Modal show={commentOpen} onHide={() => setCommentClose(false)}>                    {/* 댓글 모달 창 */} 
                <Modal.Header closeButton>
                  <Modal.Title>작성자 : {post && post.user && post.user.nickname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {post && (
                    <>
                      <div>
                      <h4 style={{ marginTop: '10px' }}>
                        제목 : {post.title}
                      </h4><br/>
                        <p style={{ wordWrap: 'break-word', maxWidth: '100%', marginBottom: '30px' }}>
                          {post.content}
                        </p>
                        {/* <hr style={{ borderTop: '1px solid #808080' , marginTop: '30px'}} /> */}
                        <div className="p-1 bg-info bg-opacity-10 border border-info border-start-0 border-end-0"
                        style={{textAlign: 'center', marginBottom: '20px'}}>
                          <GoCommentDiscussion/> 이 게시글의 댓글
                        </div>
                      </div>
                      <div>
                        {postComment && postComment.map((comment) => (
                          <div key={comment.id} 
                          className={`comment ${updatedCommentIdColor === comment.id ? 'updated' : ''}`}>
                            <p style={{ wordWrap: 'break-word', maxWidth: '70%' }}>🙋‍♂️ {comment.user.nickname}님
                              {user && comment.user.nickname === user.nickname && <span> (나)</span>}의 댓글 : {comment.content}
                            </p>
                            {postComment && comment.user && user && comment.user.nickname === user.nickname && (
                              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-40px' }}>
                                <Button variant="outline-success" onClick={()=> openCommentUpdateModal(comment.id,post.id)} 
                                size="sm" style={{marginRight: '5px'}}>수정하기</Button>
                                <Button variant="outline-danger" onClick={()=> handleCommentDelete(comment.id,post.id)} 
                                size="sm" >댓글 삭제</Button>

                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* <hr style={{ borderTop: '1px solid #808080' , marginTop: '20px'}} /> */}

                    </>
                  )}
                  <Form>
                    <Form.Group>
                      <Form.Label>댓글</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        maxLength={20}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setCommentClose(false)}>닫기</Button>
                  <Button variant="primary" onClick={()=> handleCreateComment(post.id)}>작성하기</Button>
                </Modal.Footer>
              </Modal>



              {/* 댓글수정 모달 창 */} 
              <Modal show={postUpdateComment} onHide={() => setCommentUpdateClose()}>   {/* 댓글수정 모달 창 */} 
                <Modal.Header closeButton>
                  <Modal.Title>댓글 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                      <Form.Label>댓글</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        maxLength={10}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setCommentUpdateClose(false)}>닫기</Button>
                  <Button variant="primary" onClick={()=> handleUpdateComment(commentId,post.id)}>댓글 수정</Button>
                </Modal.Footer>
              </Modal>





              {/* 특정 글 조회 모달 창 */} 
              <Modal show={secondOpen} onHide={() => setsecondOpen(false)}>                            {/* 특정 글 조회 모달 창 */}          
              <Modal.Header >
                <Modal.Title>📑 {post && post.user && post.user.nickname}님의 게시글</Modal.Title>
                {post && post.user && user && post.user.nickname === user.nickname && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="outline-danger" onClick={() => handlePostDelete(post.id)} style={{marginRight: '5px'}}>글 삭제</Button>
                      <Button variant="outline-success" onClick={() => openUpdateModal(post.id)} >수정하기</Button>
                    </div>
                  )}
              </Modal.Header>
              <Modal.Body>
              {post && (
                  <>
                    <h4>제목 : {post.title}</h4><br/>
                    <p style={{ wordWrap: 'break-word', maxWidth: '100%' }}>{post.content}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer style={{ display: 'flex',  justifyContent: 'space-between'  }}>
                <div>
                  <Button variant="warning" onClick={() => openCommentModal(post.id)}>댓글보기</Button>
                </div>
                    <Button variant="secondary" onClick={() => setsecondOpen(false)}>닫기</Button>
              </Modal.Footer>
              </Modal>


              <Modal show={updateNickname} onHide={closeNicknameUpdate}>   {/* 닉네임수정 모달 창 */} 
                <Modal.Header closeButton>
                  <Modal.Title>닉네임 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        value={newNickname}
                        onChange={handleNicknameChange}
                        placeholder="수정할 닉네임을 입력하세요"
                        maxLength={6}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closeNicknameUpdate}>닫기</Button>
                  <Button variant="primary" onClick={handleUpdateNickname}>닉네임 수정</Button>
                </Modal.Footer>
              </Modal>
            </div>
        </div>  
      </>
      );
    };
    

export default Communi;
