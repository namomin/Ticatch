import React, { useEffect } from 'react';
import axios from 'axios';

const TestConnection = () => {
  useEffect(() => {
    // 서버에 GET 요청을 보내서 "pong" 응답이 오는지 확인
    axios.get('http://localhost:9090/test/ping')
      .then(response => {
        console.log('서버 응답:', response.data);  // "pong"이 출력되어야 함
      })
      .catch(error => {
        console.error('서버 연결 오류:', error);
      });
  }, []);

  return (
    <div>
      <h1>서버 연결 테스트 중...</h1>
    </div>
  );
};

export default TestConnection;
