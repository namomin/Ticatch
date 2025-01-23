import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// 프론트-백 연결 테스트 코드

const DetailList = () => {
  const { seqpfjoinId } = useParams(); // URL에서 seqpfjoinId 파라미터를 가져옴
  const [productData, setProductData] = useState(null); // 초기값을 null로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  console.log(seqpfjoinId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 상태 시작
        const response = await axios.get(`http://localhost:9090/detail/${seqpfjoinId}/view`);
        setProductData(response.data); // 데이터 설정
        setError(null); // 에러 초기화
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, [seqpfjoinId]); // seqpfjoinId가 변경될 때마다 호출

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!productData) return <div>데이터가 없습니다.</div>;

  return (
    <div>
      <h1>상세 정보</h1>
      <ul>
        {Array.isArray(productData) ? (
          productData.map((product, index) => (
            <li key={index}>
              <h2>{product.p_title}</h2>
              <p>{product.p_start_date} ~ {product.p_end_date}</p>
              <img src={product.p_poster} alt={product.p_title} />
              <p>{product.pd_location}</p>
              <p>{product.p_genre}</p>
            </li>
          ))
        ) : (
          <div>
            <h2>{productData.p_title}</h2>
            <p>{productData.p_start_date} ~ {productData.p_end_date}</p>
            <img src={productData.p_poster} alt={productData.p_title} />
            <p>{productData.pd_location}</p>
            <p>{productData.p_genre}</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default DetailList;
