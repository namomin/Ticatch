import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import descImage from '../images/pirate_noti_1008_1438.jpg';
import cssDesc from '../css/Desc.module.css';

export default function Description() {
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
            setError("공연 정보를 불러오는 데 실패했습니다.");
            } finally {
            setLoading(false); // 로딩 상태 종료
            }
    };
    
        fetchData();
    }, [seqpfjoinId]);
    
      if (loading) return <div className={cssDesc.div}>로딩 중...</div>;
      if (error) return <div className={cssDesc.div}>{error}</div>;
      if (!productData) return <div className={cssDesc.div}>데이터가 없습니다.</div>;

    return(
        <div className={cssDesc.wrap}>
            {Array.isArray(productData) ? (
                productData.map((product, index) => (
                <div className={cssDesc.desc_wrap} key={index}>
                    <div className={cssDesc.desc_text_container}>
                        <h3 className={cssDesc.desc_content_submit}>공연 시간 정보</h3>
                        <span className={cssDesc.desc_text}>* 공연 기간 : {product.p_start_date} ~ {product.p_end_date}</span><br/>
                        <span className={cssDesc.desc_text}>* 공연 시간 : {product.pd_time}</span>
                    </div>
                    <div className={cssDesc.desc_img_container}>
                        <img src={product.pd_img} className={cssDesc.img}></img>
                        <img src={descImage} className={cssDesc.img}></img>
                    </div>
                </div>
                ))
            ) : (
                <>
                    <p className={cssDesc.p}>아마도 뭔가 잘 못 불러오는 중임</p>
                </>
            )}
        </div>
    );
}