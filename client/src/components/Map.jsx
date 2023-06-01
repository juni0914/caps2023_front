import { useEffect, useRef, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps, mapOptions, } from 'react-naver-maps'
import { Link } from "react-router-dom";
import SidePanel from './SidePanel';
import axios from "axios";
import ReactDOMServer from 'react-dom/server';
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap';
import "./map.css";

// import mapmarker from "../components/mapmarker";


function Map() {
  const mapElement = useRef(null);
  const navermaps = useNavermaps();

  let markers = [];
  let infoWindows = [];

    const chilam = new navermaps.LatLng(35.180722, 128.094018); // 초기위치 및 칠암캠퍼스 위치
    const gajwa = new navermaps.LatLng(35.154299, 128.102384); // 가좌캠퍼스 위치
    const tongyeong = new navermaps.LatLng(34.838744, 128.399730); // 통영캠퍼스 위치


    const [showModal, setShowModal] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [reservationInfo, setReservationInfo] = useState(null); //선택된 마커의 예약 정보를 저장

    const handleButtonClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
    // handleClose = () => this.setState({ show: false });
    // handleShow = () => this.setState({ show: true });



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
        
              
              
              const content = (
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
        
        
              naver.maps.Event.addListener(otherMarkers, 'click', function(e){
                map.panTo(e.coord);
                console.log(maparray[i].name);
                if (infoWindows[i].getMap()) {
                  infoWindows[i].close();
              } else {
                infoWindows[i].open(map, otherMarkers);
                setSelectedMarker(maparray[i]);
                const button = document.querySelector('.markerinfo_div button'); //예약버튼 눌렀을 때 함수 작동하는 코드
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

  function generateReservationButtons() {
    // 이용 가능 시간 추출
    const { openTime, closeTime } = reservationInfo.center;
    const startTime = parseInt(openTime.split(":")[0]); // 시작 시간 (ex: 9)
    const endTime = parseInt(closeTime.split(":")[0]); // 종료 시간 (ex: 17)
  
    // 버튼 생성
    const buttons = [];
    for (let i = startTime; i < endTime; i++) {
      const hour = i.toString().padStart(2, "0");
      buttons.push(
        <Button key={i} variant="outline-success" className="w-25">
          {hour}:00
        </Button>
      );
      buttons.push(
        <Button key={i + 0.5} variant="outline-success" className="w-25">
          {hour}:30
        </Button>
      );
    }
  
    return buttons;
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
                      <Form.Label>✔ 예약 시간:</Form.Label><br/>
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
            <Button variant="primary" onClick={handleCloseModal}>
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