import Main from "./Main";
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import {IoPersonCircle} from 'react-icons/io5'
import gnuhan from "../images/gnuhan.png"

function SidePanel() {
  const [isLogin, setIsLogin] = useState(false); //로그인 정보 저장
  const [user, setUser] = useState({});         // user 정보 저장
  const [reserveData, setReserveData] = useState([]); //예약데이터 정보 저장
  const [reservecenterId, setReservecenterId] = useState([]);   //예약ID 정보 저장
  const [reserveId, setReserveId] = useState([]);   //센터ID 정보 저장
  const [reservationInfo, setReservationInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);  //모달 열고 닫는 정보를 저장
  const [loading, setLoading] = useState(false);   //로딩 표시 정보 저장
  const [deletedReservations, setDeletedReservations] = useState([]);  // 예약 삭제 정보 저장

  const [myInfo, setMyInfo] = useState(false); //내 정보 모달 창 열림여부  
  const [updateNickname, setUpdateNickname] = useState(false); //닉네임 변경 모달 창 열림여부
  const [newNickname, setNewNickname] = useState(''); // 변경할 닉네임 정보 저장  

  const [openPoint, setOpenPoint] = useState(false); // 포인트 충전 모달 창 열림여부
  const [point, setPoint] = useState(""); // 포인트 상태 정보 저장

  const server_api = process.env.REACT_APP_SERVER_API;

  let token = localStorage.getItem('login-token') || '';

  const openPointCharge = () => {
    setOpenPoint(true);
  }

  const closePointCharge  = () => {
    setOpenPoint(false);
    setPoint("");
  }

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
    // getMyCommentPost();
    // fetchMyPosts();
  };

  const handleCloseModal = () => { //예약모달창 닫기 버튼함수
    setShowModal(false);
  };


const updateReservationData = (centerId, reservationId) => {
  // 기존 예약 내역에서 삭제된 예약을 제외하고 업데이트된 예약 내역을 생성합니다.
  const updatedReserveData = reserveData.filter((name, index) => reservecenterId[index] !== centerId || reserveId[index] !== reservationId);
  const updatedReserveIds = reserveId.filter((id, index) => reservecenterId[index] !== centerId || id !== reservationId);
  const updatedCenterIds = reservecenterId.filter((id, index) => id !== centerId || reserveId[index] !== reservationId);
  
  // 예약 내역 상태를 업데이트합니다.
  setReserveData(updatedReserveData);
  setReserveId(updatedReserveIds);
  setReservecenterId(updatedCenterIds);

  // 삭제된 예약 내역을 업데이트합니다.
  const updatedDeletedReservations = reserveData.filter((name, index) => reservecenterId[index] !== centerId || reserveId[index] !== reservationId);
  setDeletedReservations(updatedDeletedReservations);
};
  

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.")
      localStorage.clear()
      window.location.replace("/login")
    }
  };

  useEffect(() => { // 로그인 여부와 사용자 정보 가져오기
    try {
      axios({
        url: `${server_api}/user/success`,
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


  const handleUpdateNickname = () => {                  //닉네임 수정하기
    if (window.confirm("닉네임을 수정하시겠습니까?")) {
      axios({
        url: `${server_api}/user/update`,
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

const PointCharge = () => {                  //포인트 충전하기
  if (window.confirm(`입력하신 포인트만큼 충전하시겠습니까?`)) {
    const minChargeAmount = 5000;
    const chargepoint = parseInt(point,10);
    if (chargepoint >= minChargeAmount) {
      axios({
        url: `${server_api}/user/point`,
        method: "PATCH",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        params: {
          chargePoint: chargepoint,
        },
      })
        .then((res) => {
          setOpenPoint(false);
          setPoint("");
          alert(`${chargepoint}포인트가 충전되었습니다.`)
          console.log("포인트가 충전되었습니다:", res.data); 
          axios({
            url: `${server_api}/user/success`,
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
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          alert("포인트 충전 중 오류가 발생했습니다.");
          console.error("포인트 충전 중 오류가 발생했습니다:", error);
        });
      } else {
        alert(`최소 충전금액은 ${minChargeAmount}원입니다.`);
      }
    } else {
      console.log('포인트 충전이 취소되었습니다.');
    }
};


    const handleNicknameChange = (e) => {         //닉네임 변경 글자 수 제한 함수 
      const inputValue = e.target.value;
      const maxChars = 6; // 한글 기준으로 5글자 제한

      if (inputValue.length <= maxChars) {
      setNewNickname(inputValue);
      }
    };


    const handlePointCharge = (e) => {         //포인트 충전 한도 제한 함수 
      const inputValue = e.target.value;
      const maxChars = 6; // 한글 기준으로 5글자 제한

      const numericValue = inputValue.replace(/[^0-9]/g, '');       // 입력값에서 숫자만 추출

      if (inputValue.length <= maxChars) {
        setPoint(numericValue);
      }
    };


   useEffect(() => {  // 예약 데이터 가져오기
    try {
      axios({
        url: `${server_api}/centerReservation/reservations`,
        method: "GET",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          if (res.data && res.data.content) {   
            console.log(res.data)
            const reserveNames = res.data.content.map((item) => item.name); //예약된 체육시설을 이름 배열로 저장
            const ReserveIds = res.data.content.map((item) => item.reservationId); //예약된 ID를 배열로 저장
            const CenterIds = res.data.content.map((item) => item.centerId); //예약된 센터ID를 배열로 저장
            setReserveData(reserveNames);
            setReserveId(ReserveIds);
            setReservecenterId(CenterIds);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  function handleReservationClick(index) {    //사이드패널 예약목록 h6태그 클릭시 함수
    //예약된 체육시설 센터ID랑 예약ID 추출
    const centerId = reservecenterId[index];  
    const reservationId = reserveId[index];
    setShowModal(true);

    try {   //해당 체육시설 상세 예약정보 가져오기
      axios({
        url: `${server_api}/centerReservation/${centerId}/reservation/${reservationId}`,
        method: "GET",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          setReservationInfo(res.data);
          console.log(res.data);
          // console.log(reservationInfo.reservingDate)
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = () => {      //예약 취소하기
    setLoading(true);
    const { centerId, reservationId } = reservationInfo;
  
    if (window.confirm("정말로 예약을 취소하시겠습니까?")) {
      axios({
        url: `${server_api}/centerReservation/${centerId}/reservation/${reservationId}`,
        method: "DELETE",
        withCredentials: true,
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          console.log(res.data);
          alert('예약이 취소되었습니다.')
          updateReservationData(centerId, reservationId);
          axios({
            url: `${server_api}/user/success`,
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
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
  
          // 삭제 실패 시 에러 처리 로직 추가
        })
        .finally(() => {
          setLoading(false);
          setShowModal(false); // 모달 창 닫기
        });
    } else {
      setLoading(false);

    }
  };

    const isReservationDeleted = (centerId, reservationId) => {
      // reservecenterId와 reserveId 배열에서 주어진 centerId와 reservationId를 가진 예약의 인덱스를 찾습니다.
      const index = reservecenterId.findIndex((id, idx) => id === centerId && reserveId[idx] === reservationId);
      
      // 예약을 찾지 못했거나 해당 예약의 인덱스가 -1인 경우 예약이 삭제된 것으로 간주합니다.
      if (index === -1) {
        return true; // 예약이 삭제되었음
      } else {
        return false; // 예약이 유효함
      }
    };


    
    
  return (
    <div
      style={{
        backgroundColor: "#f0fff0",
        // width: "22vw",
        padding: '2rem',
        minHeight: "95vh",
        color: '#5a635f',
        borderRadius: '20px',
        marginLeft: '20px',
        marginTop: "20px",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
            <img src={gnuhan} style={{ width: '300px', height: '60px', marginBottom: '10px'}}alt="GNU 로고" />
        </div>
        <div>
            <h2 id="sidepaneltitle"> 경상국립대학교<br />체육시설 커뮤니티</h2> <br />
        </div>
      <h4 onClick={openMyInfoModal} style={{cursor: 'pointer'}}> 
        ⛹️‍♂️ {user.nickname} 님
        <Button  variant="outline-secondary"onClick={(e) => {
                    e.stopPropagation();
                    logout();
                  }}
        style={{ borderRadius: '20px', fontSize: '15px', borderWidth: '2px', marginLeft: '40px', padding: '0.5rem', cursor: 'pointer' }}>
          Logout
        </Button>{' '}</h4><br />
        <h4 onClick={openMyInfoModal} style={{cursor: 'pointer'}}><strong>💰 나의 보유 포인트 : {user.point} 원</strong></h4><br />
      <h4><Link style={{  textDecoration: 'none', fontWeight: '800', fontSize: '20px' }} to="/community">👨‍👨‍👧‍👧 체육시설 커뮤니티 바로가기  </Link></h4>

      <h4 style={{marginLeft: '-5px', marginTop: '20px' }}>📌 나의 예약현황 <p style={{ fontSize: "15px", marginLeft: '45px' }}>(최대 20개까지만 표시)</p></h4>
        {reserveData.map((name, index) => {
          const centerId = reservecenterId[index];
          const reservationId = reserveId[index];
          if (isReservationDeleted(centerId, reservationId)) {
            return null; // 삭제된 예약이라면 출력하지 않음
          }
          return (
            <h6 key={index} style={{ marginLeft: '20px', cursor: "pointer" }} onClick={() => handleReservationClick(index)}>
             ✔ {index + 1}. {name}
            </h6>
          );
        })}


      <Container>
          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>예약 상세 정보</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
              {reservationInfo ? (
                    <Form>
                      <Form.Group className="mb-3">
                        {reservationInfo && reservationInfo.imgUrl && (
                          <img src={reservationInfo.imgUrl} style={{width: '465px', height: '280px', borderRadius: '10px'}}/>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>✔ 시설명 : {reservationInfo && reservationInfo.name}</Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>📅 내가 예약한 날짜 : {reservationInfo && reservationInfo.reservingDate}</Form.Label> 
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>⌚ 내가 예약한 시간 : {(reservationInfo && reservationInfo.reservingTime).join(", ")}
                        </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>⛹️‍♂️ 예약 인원 수 : {(reservationInfo && reservationInfo.headCount)}명
                        </Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>💰 가격 : {reservationInfo && reservationInfo.price}원</Form.Label>
                      </Form.Group>
                    </Form>
                    ) : (
                      <Spinner animation="border" />
                  )}
          
              </Modal.Body>
          <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Button variant="danger" onClick={handleDelete} >
                취소하기
              </Button>
            </div>
            <Button variant="secondary" onClick={handleCloseModal}>
              닫기
            </Button>

          </Modal.Footer>
        </Modal>
      </Container>

              <Modal show={myInfo} onHide={() => setMyInfo(false)}  >      {/* 내 정보 모달 창 */}
                <Modal.Header closeButton >
                  <Modal.Title><IoPersonCircle/> 내 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{borderRadius: '10px',padding: '20px'}}>
                  <Form>
                    <Form.Group>
                      <Form.Label><h4><strong>🍀 아이디 : {user.username}</strong></h4></Form.Label><br/>
                      <Form.Label><h4><strong>🍙 닉네임 : {user.nickname}</strong></h4></Form.Label> <Button variant="outline-secondary" onClick={openNicknameUpdate} 
                      style={{borderRadius: '20px', fontSize: '15px', borderWidth: '2px', marginLeft: '40px', marginBottom:'10px',
                              padding: '0.5rem', cursor: 'pointer' }}>
                    닉네임 변경</Button>
                    </Form.Group>
                    <hr style={{ borderTop: '1px solid #808080', marginBottom: '20px'}} />
                    <Form.Label><h4><strong>💰 나의 보유 포인트 : {user.point} 원</strong></h4></Form.Label>
                    <Button variant="outline-secondary" onClick={openPointCharge} 
                      style={{borderRadius: '20px', fontSize: '15px', borderWidth: '2px', marginLeft: '40px', marginBottom:'10px',
                              padding: '0.5rem', cursor: 'pointer' }}>
                    포인트 충전</Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setMyInfo(false)}>닫기</Button>
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


              <Modal show={openPoint} onHide={closePointCharge}>   {/* 포인트충전 모달 창 */} 
                <Modal.Header closeButton>
                  <Modal.Title>💰 포인트 충전</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        value={point}
                        onChange={handlePointCharge}
                        placeholder="충전할 포인트를 입력하세요"
                        maxLength={6}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={closePointCharge}>닫기</Button>
                  <Button variant="primary" onClick={PointCharge}>포인트 충전</Button>
                </Modal.Footer>
              </Modal>
    </div>
  )
}

export default SidePanel;
