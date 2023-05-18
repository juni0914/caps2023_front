import { useEffect, useRef } from 'react';
import { Container as MapDiv, NaverMap, Marker, useNavermaps, mapOptions, } from 'react-naver-maps'
import { Link } from "react-router-dom";
// import mapmarker from "../components/mapmarker";


const maparray = [
  { "id": 1, "name": "칠암캠운동장", Lat : 35.181368, Lng: 128.092885},
  { "id": 2, "name": "칠암캠체육관", Lat : 35.180550, Lng: 128.092695  },
  { "id": 3, "name": "칠암캠농구장", Lat : 35.181707, Lng: 128.092445  },
  { "id": 4, "name": "칠암캠풋살장", Lat : 35.181853, Lng: 128.092303  },
  { "id": 5, "name": "칠암캠테니스장", Lat : 35.181990, Lng: 128.093008  },
  { "id": 6, "name": "칠암캠족구장", Lat : 35.181878, Lng: 128.092629 },

  { "id": 7, "name": "가좌캠풋살장", Lat : 35.154370, Lng: 128.103407 },
  { "id": 8, "name": "가좌캠교직원테니스장", Lat : 35.156537, Lng: 128.102683  },
  { "id": 9, "name": "가좌캠테니스장", Lat : 35.154181, Lng: 128.102844 },
  { "id": 10, "name": "가좌캠족구장", Lat : 35.154658, Lng: 128.102755  },
  { "id": 11, "name": "가좌캠농구장", Lat : 35.154627, Lng: 128.102903  },
  { "id": 12,"name": "가좌캠대운동장", Lat : 35.154850, Lng: 128.104504 },
  { "id": 13, "name": "가좌캠운동장", Lat : 35.151364, Lng: 128.100821 },
  { "id": 14, "name": "가좌캠체육관", Lat : 35.155414, Lng: 128.103060 },

  { "id": 15, "name": "통염캠운동장1", Lat : 34.838744, Lng: 128.399730  },
  { "id": 16,"name": "통염캠운동장2", Lat : 34.836729, Lng: 128.400170 },
  { "id": 17, "name": "통염캠체육관", Lat : 34.838022, Lng: 128.399127  },
  { "id": 18, "name": "통염캠테니스장", Lat : 34.838553, Lng: 128.398888  }
]

function Map() {
  const mapElement = useRef(null);

  let markers = [];
  let infoWindows = [];

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(35.180260, 128.092037);

    const map = new naver.maps.Map(mapElement.current);
    map.setCenter(location);
    map.setZoom(15)

    for (let i = 0; i < maparray.length; i++) {
      const otherMarkers = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          maparray[i].Lat,
          maparray[i].Lng
        ),
        map : map,
        title : maparray[i].name
      });
      markers.push(otherMarkers);
      infoWindows.push(infoWindows)
    }
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