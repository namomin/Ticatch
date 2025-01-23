import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./OrderPage.module.css";
import SeatBooking from "../Seats/SeatBooking.jsx";
import Order from "../Orders/Order.jsx";

const OrderPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [noSeatInfo, setNoSeatInfo] = useState(null); // 공통 상태 생성

  const navigate = useNavigate();

  const handleReserve = () => {
    navigate(-1);
  }

  return (
    <div className={style.app_container}>
      <div className={style.left}>
        <div className={style.detail_return}>
        <button onClick={handleReserve} className={style.detail_return_button}>
            <div className={style.detail_return_lt}>&lt;</div>
            <div className={style.detail_return_text}>돌아가기</div>
          </button>
        </div>
        <SeatBooking
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          noSeatInfo={noSeatInfo}
        />
      </div>
      <div className={style.right}>
        <div className={style.r}>
          <Order selectedSeats={selectedSeats} setNoSeatInfo={setNoSeatInfo} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
