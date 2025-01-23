import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Success.module.css";

import qr from "./image/ticketLink_QR.png";

export function SuccessPage() {
  const navigate = useNavigate();

  // 데이터 받기
  const location = useLocation();
  const orderData = location.state;
  // 받은 데이터가 없으면 이거 출력함
  if (!orderData) {
    return <p>전달된 데이터가 없습니다.</p>;
  }

  let tossdata = {
    seqPfjoinIds: orderData.seqPfjoinIds,
    selectedDate: orderData.selectedDate,
    selectedTime: orderData.selectedTime,
    //   seat: orderData.selectedSeatsInfo,
    totalPrice: orderData.totalPrice,
    selectedSeatsInfo: orderData.selectedSeatsInfo,
  };

  // 좌석만 출력
  const titleSeats = `${orderData.selectedSeatsInfo
    .map((seat) => seat.seat)
    .join(", ")}`;

  const formatNumberToKRW = (number) => {
    return new Intl.NumberFormat("ko-KR").format(number);
  };
  const NumberWithCommaKRW = () => {
    const number = tossdata.totalPrice; // orderData 대신 tossdata에서 가져옴
    return formatNumberToKRW(number); // 숫자를 포맷한 결과 반환
  };
  return (
    <div className={styles.payment_success}>
      <div className={styles.success_icon}>✅</div>
      <h2 className={styles.h2}>결제 완료</h2>
      {/* 이건 티켓링크로 가는 QR 코드임 */}
      <img style={{ maxWidth: "100%" }} src={qr} alt="qr코드" />
      <div className={styles.payment_details}>
        <div className={styles.detail_row}>
          <span>주문번호: </span>
          <span>{orderData.seqPfjoinIds}</span>
        </div>
        <div className={styles.detail_row}>
          <span>공연날짜: </span>
          <span>{orderData.selectedDate}</span>
        </div>
        <div className={styles.detail_row}>
          <span>회차: </span>
          <span>{orderData.selectedTime}</span>
        </div>
        <div className={styles.detail_row}>
          <span>좌석: </span>
          <span>{titleSeats}</span>
        </div>
        <div className={styles.detail_row_total}>
          <span>총 결제금액: </span>
          <span>{NumberWithCommaKRW()}원</span>
        </div>
      </div>

      <p className={styles.notice}>
        장소는 마이페이지 - 주문내역에서 조회 가능합니다
      </p>

      {/* 지금은 그냥 예매페이지로 이동함 */}
      <button
        className={styles.mypage_btn}
        onClick={() => navigate("/ThisIsMyPage")}
      >
        메인 페이지로 이동
      </button>
    </div>
  );
}
