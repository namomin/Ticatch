import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Location.css'
import KakaoMap from './KakaoMap';
import NaverMap from './NaverMap';

export default function Location() {
    const { seqpfjoinId } = useParams(); // 경로에서 공연 시퀀스 아이디값 가져옴
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 상태 시작
                const response = await axios.get(`http://localhost:9090/detail/${seqpfjoinId}/view`);
                setProductData(response.data);
                setError(null); // 에러 초기화
            } catch (err) {
                setError("위치 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchData();
    }, [seqpfjoinId]);
    
    // if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div className="wrap">
            {Array.isArray(productData) ? (
                productData.map((location, index) => (
                    <div className="location_wrap" key={index}>
                        <div className='location_header'>
                            <h2 className='location_header_title'>공연장 위치 정보</h2>
                        </div>
                        <div className="location_text_box">
                            <div className="location_text">
                                <span className="location_title">장소</span>
                                <span>{location.pd_hall_name}</span>
                            </div>
                            <div className="location_text">
                                <span className="location_title">주소</span>
                                <span>{location.fd_addr}</span>
                            </div>
                            <div className="location_text">
                                <span className="location_title">대표번호</span>
                                <span>{location.fd_phone}</span>
                            </div>
                        </div>

                        <div className='location_map_wrap'>
                            <div className='location_map_box'>
                            <NaverMap lat={location.fd_latitude} lng={location.fd_longitude} addr={location.fd_addr}/>
                            </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <>
                        <p>아마도 뭔가 잘 못 불러오는 중임</p>
                    </>
                )}
        </div>
    );
}