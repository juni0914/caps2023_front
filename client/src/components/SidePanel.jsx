import Main from "./Main";
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import gnuhan from "../images/gnuhan.png"

function SidePanel() {
  const [isLogin, setIsLogin] = useState(false); //로그인 정보 저장
  const [user, setUser] = useState({});         // user 정보 저장
  const [reserveData, setReserveData] = useState([]); //예약데이터 정보 저장
  const [reservecenterId, setReservecenterId] = useState([]);   //예약ID 정보 저장
  const [reserveId, setReserveId] = useState([]);   //센터ID 정보 저장
  const [reservationInfo, setReservationInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);  //모달 열고 닫는 정보를 저장
  const [loading, setLoading] = useState(false);
  const [deletedReservations, setDeletedReservations] = useState([]);
  


  const handleCloseModal = () => { //예약모달창 닫기 버튼함수
    setShowModal(false);
  };

  let token = localStorage.getItem('login-token') || '';


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
      window.location.replace('http://localhost:3000/login')
    }
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

   useEffect(() => {  // 예약 데이터 가져오기
    try {
      axios({
        url: "http://localhost:8080/center/reservations",
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
        url: `http://localhost:8080/center/${centerId}/reservation/${reservationId}`,
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
        url: `http://localhost:8080/center/${centerId}/reservation/${reservationId}`,
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
          // fetchReservations();
          // 성공적으로 삭제되었을 때 추가적인 작업 수행
          // 예를 들어, 삭제된 예약 정보를 갱신하거나 목록을 새로고침하는 등의 동작을 수행할 수 있다.
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
        backgroundColor: "#b4fedb",
        // width: "22vw",
        padding: '2rem',
        minHeight: "95vh",
        color: '#5a635f',
        borderRadius: '20px',
        marginLeft: '20px',
        marginTop: "20px",
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
      }}>
      <h2 id="sidepaneltitle" style={{ fontWeight: '600' }}>
      <img src={gnuhan} style={{ width: '300px', height: '60px', marginBottom: '10px'}}alt="GNU 로고" /> 경상국립대학교<br />체육시설 예약 사이트
      </h2><br />
      <h4>
        ⛹️‍♂️ {user.username} 님
        <Button  variant="outline-secondary"onClick={logout} 
        style={{ borderRadius: '20px', fontSize: '15px', borderWidth: '2px', 
        marginLeft: '120px', padding: '0.5rem', cursor: 'pointer'}}>
          Logout
        </Button>{' '}      </h4><br />
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
    </div>
  )
}

export default SidePanel;
