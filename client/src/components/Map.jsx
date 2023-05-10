import { useEffect, useRef } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps, mapOptions, } from 'react-naver-maps'
import { Link } from "react-router-dom";

function Map() {
  const mapElement = useRef(null);


  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(35.180260, 128.092037);

    const map = new naver.maps.Map(mapElement.current);
    map.setCenter(location);
    map.setZoom(15)


    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);


  return ( 
    <>
    <div ref={mapElement} 
      style={{ width: '100%', height: '700px' }} 
      
       />
       <div>
       <Link  to="/">메인 사이트로 이동  </Link>
       </div>
       </>
  )
}

export default Map;