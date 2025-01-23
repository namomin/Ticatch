import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReviewRate() {
    const { seqpfjoinId } = useParams(); // 경로에서 공연 시퀀스 아이디값 가져옴
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 로딩 상태 시작
                const response = await axios.get(`http://localhost:9090/detail/${seqpfjoinId}/review/avg`);
                setProductData(response.data); // 서버에서 받아온 데이터 저장
                setError(null); // 에러 초기화
            } catch (err) {
                setError("별점 평균내기 실패");
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchData();
    }, [seqpfjoinId]);

    // 로딩 중, 에러, 리뷰 수 출력 처리
    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // 소숫점 1자리까지 출력 (없으면 0으로 표시)
    const formattedData = productData ? productData.toFixed(1) : 'N/A';

    return(
        <>
            {formattedData}
        </>
    );
}
