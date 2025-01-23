import { useEffect } from "react";

// const { kakao } = window;

export default function KakaoMap({ latitude, longitude }) {
    
    console.log("위도, 경도 : " + latitude + ", " + longitude);

    useEffect(() => {
        const loadMap = () => {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=026589334c6c5c51b9631e43a78bce6d&libraries=services,clusterer`;
            script.async = true;
            script.onload = () => {
                console.log("카카오맵 API 로드됨");
                if (window.kakao) {
                    const container = document.getElementById('map');
                    const options = {
                        center: new window.kakao.maps.LatLng(latitude, longitude),
                        level: 3,
                    };
                    const map = new window.kakao.maps.Map(container, options);
                }
            };
            script.onerror = () => {
                console.error("카카오맵 API 로드 실패1");
            };
            document.head.appendChild(script);
        };
        
    
        // 카카오맵 API가 로드되지 않았다면, 동적으로 스크립트 로딩
        if (!window.kakao) {
            const script = document.createElement('script');
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=026589334c6c5c51b9631e43a78bce6d&libraries=services,clusterer`;
            script.async = true;
            script.onload = loadMap;  // 스크립트 로딩 후 지도 초기화
            script.onerror = () => {
                console.error("카카오맵 API 로드 오류2");
            };
            document.head.appendChild(script);
        } else {
            loadMap();  // 이미 로드되어 있다면 즉시 지도 초기화
        }
    
    }, []);
    
    
    return <div style={{ width: "100%", height: "648px" }}></div>;
}


// export default function KakaoMap() {
//     return(
//         <>
//             <Map
//                 center={{ lat: 33.5563, lng: 126.79581 }}
//                 style={{ width: "100%", height: "648px" }}
//             >
//             <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
//                 <div style={{color:"#000"}}>위치</div>
//             </MapMarker>
//             </Map>
//         </>
//     );
// }

// const KakaoMap = () => {
//     const container = useRef(null); // 지도 컨테이너를 참조

//     useEffect(() => {
//         // 카카오맵 API 스크립트를 동적으로 삽입
//         const script = document.createElement("script");
//         script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=026589334c6c5c51b9631e43a78bce6d&libraries=services,clusterer";
//         script.async = true;

//         // 스크립트가 로드되면 카카오맵 초기화
//         script.onload = () => {
//             // const { kakao } = window;

//             // 지도 중심 위치 설정
//             const position = new kakao.maps.LatLng(33.450701, 126.570667);

//             // 지도 옵션 설정
//             const options = {
//                 center: position, // 중심 좌표
//                 level: 3, // 지도 확대 레벨
//             };

//             // 지도 객체 생성
//             const map = new kakao.maps.Map(container.current, options);
//         };

//         // 스크립트 태그를 문서 head에 추가
//         document.head.appendChild(script);

//         // 컴포넌트 언마운트 시 스크립트 제거
//         return () => {
//             document.head.removeChild(script);
//         };
//     }, []);

//     return (
//         <div
//             ref={container}
//             style={{ width: "100%", height: "648px" }} // 지도 크기 설정
//         ></div>
//     );
// };

// export default KakaoMap;
