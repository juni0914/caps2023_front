import { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps, mapOptions, } from 'react-naver-maps'
import { Link } from "react-router-dom";
import SidePanel from './SidePanel';
import axios from "axios";
import ReactDOMServer from 'react-dom/server';
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import "./map.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import mapmarker from "../components/mapmarker";


function Map() {
  const mapElement = useRef(null);
  const navermaps = useNavermaps();
  const token = localStorage.getItem('login-token') || ''; 

    let markers = [];
    let infoWindows = [];

    const chilam = new navermaps.LatLng(35.180722, 128.094018); // 초기위치 및 칠암캠퍼스 위치
    const gajwa = new navermaps.LatLng(35.154299, 128.102384); // 가좌캠퍼스 위치
    const tongyeong = new navermaps.LatLng(34.838744, 128.399730); // 통영캠퍼스 위치


    const [showModal, setShowModal] = useState(false);  //모달 열고 닫는 정보를 저장
    const [selectedMarker, setSelectedMarker] = useState(null); // 마커 정보 저장
    const [reservationInfo, setReservationInfo] = useState(null); //선택된 마커의 예약 정보를 저장
    const [selectedReservationTime, setSelectedReservationTime] = useState(null); // 선택한 예약시간을 저장
    const [selectedButton, setSelectedButton] = useState(null); //시간 중복 선택정보 저장
    const [selectedDate, setSelectedDate] = useState(null); //날짜 정보 저장

    const handleButtonClick = () => { //예약모달창 열기 버튼함수
      setShowModal(true);
    };
  
    const handleCloseModal = () => { //예약모달창 닫기 버튼함수
      setShowModal(false);
    };
    // handleClose = () => this.setState({ show: false });
    // handleShow = () => this.setState({ show: true });

    const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log(date)
    };



  useEffect(() => { // 마커 데이터 지도에 표시하는 첫번째 useEffect
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    const map = new naver.maps.Map(mapElement.current);
    
    map.setCenter(chilam); 
    map.setZoom(17);



    // 특정 좌표로 이동하는 예시 (버튼 클릭 시 호출되도록 작성)
    const handleButtonClick1 = () => {
      map.setCenter((chilam));
    };
    // 버튼 클릭 시 특정 좌표로 이동하는 이벤트 핸들러를 연결합니다.
    const button1 = document.getElementById('moveButton1');
    button1.addEventListener('click', handleButtonClick1);

    const handleButtonClick2 = () => {
      map.setCenter((gajwa));
    };
    // 버튼 클릭 시 가좌캠으로 이동하는 이벤트 핸들러를 연결합니다.
    const button2 = document.getElementById('moveButton2');
    button2.addEventListener('click', handleButtonClick2);

    const handleButtonClick3 = () => {
      map.setCenter((tongyeong));
    };
    // 버튼 클릭 시 통영캠으로 이동하는 이벤트 핸들러를 연결합니다.
    const button3 = document.getElementById('moveButton3');
    button3.addEventListener('click', handleButtonClick3);

    
    try {
      axios({
        url: "http://localhost:8080/center/all",
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data) {
            // console.log(res.data);
            const maparray = res.data.content;
            for (let i = 0; i < maparray.length; i++) {    // 마커관련 함수
              naver.maps.Event.addListener(map, "click", ClickMap(i));
              const otherMarkers = new naver.maps.Marker({
                position: new naver.maps.LatLng(
                  maparray[i].lat,
                  maparray[i].lnt
                ),
                map : map,
                title : maparray[i].centerId
              });
        
              
              
              const content = (  // 마커 클릭시 infoWindow 내용
                <div className="markerinfo_div" style={{ 
                width: '320px', height: '300px', border: 'none',backgroundColor: '#fff',
                borderRadius: '20px',
                border: 'none',
                boxShadow: '0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)',
                margin: '0 auto',
                padding: '10px 10px' }}>
                  <h4 className="markerinfo_h4" style={{
                    cursor: 'pointer',
                    fontWeight: '550'}}>
                    {maparray[i].name}
                    <button onClick={handleButtonClick} style={{backgroundColor: "white",border: '0.3rm',borderRadius: '20px', 
                    borderColor:'#0068c3', color: '#5a635f', float: 'right', marginTop: '-3px',cursor: 'pointer'}}>예약</button>
                  </h4>                  
                  <img referrerPolicy="no-referrer" src={maparray[i].imgUrl} style={{ width: '300px', height: '180px' }} />
                  <p className="markerinfo_h4">주소 : {maparray[i].address}</p>
                  <p className="markerinfo_h4">이용가격 : {maparray[i].price}원</p>
                </div>
              );
              
              
        
              const infoWindow = new naver.maps.InfoWindow({
                content: ReactDOMServer.renderToString(content),
                borderWidth: 0
              });
              infoWindows.push(infoWindow);
        
              
        
        
              function ClickMap(i) { // 마커 이외의 영역 클릭 시 마커 창 닫기
                return function () {
                  var infowindow = infoWindows[i];
                  infowindow.close()
                }
              }
        
        
              naver.maps.Event.addListener(otherMarkers, 'click', function(e){ //마커 클릭시 동작하는 함수
                map.panTo(e.coord);
                console.log(maparray[i].name);
                if (infoWindows[i].getMap()) {
                  infoWindows[i].close();
              } else {
                infoWindows[i].open(map, otherMarkers);
                setSelectedMarker(maparray[i]);
                const button = document.querySelector('.markerinfo_div button'); 
                if (button) {
                  button.addEventListener('click', handleButtonClick);
                }
              }
                });
              markers.push(otherMarkers);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } 
  }, []);


  useEffect(() => { // selectMarker 상태가 변경될 때마다 실행, 선택된 마커의 centerId를 사용하여 예약 정보 가져옴
    if (selectedMarker) {
      try {
        axios({
          url: `http://localhost:8080/center/${selectedMarker.centerId}/reservation`,
          method: "GET",
          withCredentials: true,
        })
          .then((res) => {
            if (res.data) {
              setReservationInfo(res.data);
              console.log(res.data)
              // console.log(res.data.reservedTimes)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [selectedMarker]);



  function generateReservationButtons() {  //예약시간 버튼 생성 함수
    // 이용 가능 시간 추출
    const { openTime, closeTime } = reservationInfo.center;
    const startTime = parseInt(openTime.split(":")[0]).toString().padStart(2, "0");; // 시작 시간 (ex: 09)
    const endTime = parseInt(closeTime.split(":")[0]); // 종료 시간 (ex: 17)
    const reservedTimes = reservationInfo.reservedTimes || []; // 이미 예약된 시간

    
    const buttons = [];

  for (let i = startTime; i < endTime; i++) {
    const hour = i.toString().padStart(2, "0");
    const buttonId1 = `${hour}:00`;
    const buttonId2 = `${hour}:30`;

    const isReserved1 = reservedTimes.includes(buttonId1);
    const isReserved2 = reservedTimes.includes(buttonId2);
    const isDisabled1 = isReserved1; // 09:00 또는 09:30이 예약되었으면 09:00 버튼 비활성화
    const isDisabled2 = isReserved2; // 09:00 또는 09:30이 예약되었으면 09:30 버튼 비활성화

    buttons.push(
      <Button
        key={buttonId1}
        variant={isSelected(buttonId1) ? "success" : isDisabled1 ? "light" : "outline-success"}
        className={`w-25 ${isSelected(buttonId1) ? "selected" : ""}`}
        onClick={() => handleReservationTimeSelect(buttonId1)}
        disabled={isDisabled1}
      >
        {buttonId1}
      </Button>
    );

    buttons.push(
      <Button
        key={buttonId2}
        variant={isSelected(buttonId2) ? "success" : isDisabled2 ? "light" : "outline-success"}
        className={`w-25 ${isSelected(buttonId2) ? "selected" : ""}`}
        onClick={() => handleReservationTimeSelect(buttonId2)}
        disabled={isDisabled2}
      >
        {buttonId2}
      </Button>
    );
  }

  return buttons;
}

  function isSelected(buttonId) {
    if (selectedReservationTime === null) { // 선택된 예약 시간이 없는 경우 false를 반환
      return false;
    }
    
    return selectedReservationTime.includes(buttonId); // 선택된 예약 시간 배열에 버튼 ID가 포함되어 있는지 확인하여 결과를 반환
  }
  
  
  function handleReservationTimeSelect(buttonId) {  // 예약된 시간 버튼 정보 함수
    let updatedSelectedTime = [];
  
    if (selectedReservationTime !== null) { // 선택된 예약 시간이 이미 있는 경우, 새로운 배열에 기존 선택된 시간들을 복사합니다.
      updatedSelectedTime = [...selectedReservationTime];
    }
  
    if (updatedSelectedTime.includes(buttonId)) {
      // 이미 선택된 버튼인 경우 선택 해제
      updatedSelectedTime = updatedSelectedTime.filter((time) => time !== buttonId);
    } else {
      // 새로운 버튼을 선택한 경우 추가
      updatedSelectedTime.push(buttonId);
    }
  
    setSelectedReservationTime(updatedSelectedTime); // 업데이트된 선택된 예약 시간 배열을 설정
    console.log("선택한 시간대:", updatedSelectedTime);
 
  }



  function handleReservation() {  //모달창 예약하기 버튼
    const selectedDateString  = selectedDate.toISOString().split('T')[0] // Format selectedDate as "YYYY-MM-DD"

    if (!selectedReservationTime || selectedReservationTime.length === 0 ) {
      // 예약 시간을 선택하지 않은 경우 처리
      alert("예약 시간을 선택해주세요.");
      return;
    }

    if (!selectedDateString || selectedDateString.length === 0) {
      alert("날짜를 선택해주세요!");
      return;
    }
    
    // 서버로 예약정보 POST 요청 보내기
    try {
      axios({
        url: `http://localhost:8080/center/${selectedMarker.centerId}/reservation`,
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`
        },
        data: JSON.stringify({
          reservingTimes: selectedReservationTime,
          reservingDate: selectedDateString
        })
      })
        .then((res) => {
          console.log(res.data);
          setSelectedReservationTime([]);
          alert(`시설 이름 : ${selectedMarker.name}\n예약 시간: ${selectedReservationTime}에 예약되었습니다.`)
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  

  return ( 
    <>  
      <div style={{  width: "22vw", height: '700px', float: 'left' }}>
        <SidePanel/>
       </div>
      <div>
          <div style={{
            position: 'relative',
            zIndex:'2',
            width: 'auto', height: '805px',
            padding: '2rem',
            minHeight: '97%',
            color: 'white',
            minWidth: '100px',
            borderRadius: '20px',
            marginLeft: '-500px',
            marginRight: "20px",
            marginTop: '20px'}}  ref={mapElement}
          >
          <div className="btn1" style={{position: 'absolute', zIndex:'1',marginLeft: '-10px', marginTop: '-10px'}}>
            <button id="moveButton1" >칠암캠퍼스로 이동하기</button> 
            <button id="moveButton2">가좌캠퍼스로 이동하기</button> 
            <button id="moveButton3">통영캠퍼스로 이동하기</button> 
          </div>
        </div>
        <Container>
          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>예약 창</Modal.Title>
          </Modal.Header>
          
              <Modal.Body>
              {reservationInfo ? (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>✔ 시설명 : {reservationInfo && reservationInfo.center.name}</Form.Label>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>✔ 주소 : {reservationInfo && reservationInfo.center.address}</Form.Label>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>✔ 이용가능시간 : {reservationInfo && reservationInfo.center.openTime} ~ {reservationInfo && reservationInfo.center.closeTime}
                        </Form.Label>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>✔ 가격 : {reservationInfo && reservationInfo.center.price}원</Form.Label>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>✔ 날짜 선택</Form.Label><br/>
                        <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                      </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>✔ 예약 시간</Form.Label><br/>
                      <Form.Label style={{fontSize:'13px'}}>ex) 09:00 ~ 10:00 1시간 예약을 희망할 경우 09:00과 09:30클릭</Form.Label><br/>
                      {generateReservationButtons()}
                    </Form.Group>
                    </Form>
                    ) : (
                    <p>Loading reservation information...</p>
                  )}
          
              </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              닫기
            </Button>
            <Button variant="primary" onClick={handleReservation} >
              예약하기
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
       </div>

    </>
  )
}

export default Map;