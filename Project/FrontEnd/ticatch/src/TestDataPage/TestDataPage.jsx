import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TestDataPage = () => {
  const navigate = useNavigate();
  const [seqId, setSeqId] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    axios
      .get("/api/order")
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => console.error("데이터 가져오기 에러:", error));
  }, []);

  const handleSubmit = () => {
    if (!selectedDay || !selectedTime || !seqId) {
      alert("공연 날짜와 회차 및 공연 제목 또한 선택해주세요.");
      return;
    }

    // 선택된 데이터를 /order 페이지로 전달 (상세페이지 만드는 사람에게도 이렇게 전달해달라고 말했음)
    navigate("/order", {
      state: {
        seqId,
        selectedDay,
        selectedTime,
      },
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>공연 날짜 및 회차 선택</h1>
      <div style={{ margin: "20px" }}>
        <label htmlFor="seqId">공연 제목:</label>
        <select
          id="seqId"
          value={seqId}
          onChange={(e) => setSeqId(e.target.value)}
          style={{ marginLeft: "10px", padding: "10px" }}
        >
          <option value="">공연 ID를 선택해주세요</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="date-select">공연 날짜:</label>
        <select
          id="date-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          style={{ marginLeft: "10px", padding: "10px" }}
        >
          <option value="">날짜를 선택하세요</option>
          <option value="2024-12-11">2024-12-11</option>
          <option value="2024-12-18">2024-12-18</option>
          <option value="2024-12-22">2024-12-22</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="time-select">공연 회차:</label>
        <select
          id="time-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{ marginLeft: "10px", padding: "10px" }}
        >
          <option value="">회차를 선택하세요</option>
          <option value="0">1회</option>
          <option value="1">2회</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#004d7c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        다음으로
      </button>
    </div>
  );
};

export default TestDataPage;
