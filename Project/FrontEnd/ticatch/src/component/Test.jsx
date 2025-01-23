import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [pfJoin, setPfJoin] = useState(""); // 상태 선언
  const [seqPfjoinId, setSeqPfjoinId] = useState(1); // seq_pfjoin_id 관리용 상태 선언

  // seqPfjoinId 변경 시 데이터 가져오기
  useEffect(() => {
    console.log(seqPfjoinId);
    axios
      .get(`/detail/${seqPfjoinId}`)
      .then((response) => {
        setPfJoin(response.data); // 서버 응답에 따라 데이터 설정
      })
      .catch((err) => console.error(err));
  }, [seqPfjoinId]); // seqPfjoinId 변경 시 실행

  return (
    <div>
      <h2>id: {seqPfjoinId}</h2>
      <button onClick={() => setSeqPfjoinId(2)}>Change to ID 2</button>
      <button onClick={() => setSeqPfjoinId(3)}>Change to ID 3</button>
    </div>
  );
};

export default App;
