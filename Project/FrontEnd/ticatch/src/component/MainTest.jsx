import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainTest = () => {
  const navigate = useNavigate();
  const productId = 123;  // 하드코딩된 productId

  const handleClick = () => {
    // 버튼 클릭 시 productId를 전달하여 상세 페이지로 이동
    navigate(`/detail/${productId}/view`);
  };

  return (
    <div>
      <h1>상품 목록</h1>
      {/* 버튼 클릭 시 상세 페이지로 이동 */}
      <button onClick={handleClick}>상품 상세 보기</button>
    </div>
  );
};

export default MainTest;
