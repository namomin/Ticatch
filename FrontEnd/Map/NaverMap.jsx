import { useEffect } from "react";
import { useRef } from "react";

export default function NaverMap({ lat, lng, addr }) {
    const mapRef = useRef(null);

    console.log("lat : " + lat + ", lng : " + lng + ", 주소 : " + addr);

    // 네이버 길찾기 주소
    const directionUrl = `https://map.naver.com/v5/directions/-/${lat},${lng},${encodeURIComponent(
        addr
      )}/-/transit?c=15.00,0,0,0,dh`;

    useEffect(() => {
        const { naver } = window;
        if (mapRef.current && naver) {
          const location = new naver.maps.LatLng(lat, lng);
          const map = new naver.maps.Map(mapRef.current, {
            center: location,
            zoom: 19, // 지도 확대 정도
          });
          new naver.maps.Marker({
            position: location,
            map,
          });
        }
      }, []);
  return (
    <>
      <div ref={mapRef} style={{ width: "1400px", height: "648px" }}></div>
      <div>
        <button className="location_search_btn"><a href={directionUrl} className="location_search_btn_link">빠른 길찾기</a></button>
      </div>
    </>
  );
}