import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // UUID를 생성하기 위해 라이브러리 사용

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"; // 테스트용키
// const customerKey = "_cMnaHj7WK7r8NSVnw-IX"; // 계속 만들기 싫어서 주석 후 비회원으로만 결제 가능하게 만듬

export function CheckoutPage() {
  const uniqueOrderId = uuidv4(); // UUID 생성 (orderId 6자 이상이여야되서 seq로는 안됨)
  const navigate = useNavigate(); // 이걸로 페이지 이동함
  // 이전 페이지에서 오는거 받는거
  const location = useLocation();
  const orderData = location.state;
  // 받은 데이터가 없으면 아래를 화면에 출력함
  if (!orderData) {
    return <p>전달된 데이터가 없습니다.</p>;
  }
  // 있으면 알맞게 매핑
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: orderData.totalPrice, // 앞 페이지에서 가지고온 값으로 매핑
  });

  let tossdata = {
    seqPfjoinIds: orderData.seqPfjoinIds,
    selectedDate: orderData.selectedDate,
    selectedTime: orderData.selectedTime,
    //   seat: orderData.selectedSeatsInfo,
    totalPrice: orderData.totalPrice,
    selectedSeatsInfo: orderData.selectedSeatsInfo,
    userId: sessionStorage.getItem("userId"),
  };
  // console.log(userId);

  // 제목을 문자열로 보내줘야되서 함(난 좌석선택된걸로 보내줌)
  const titleSeats = `좌석: ${orderData.selectedSeatsInfo
    .map((seat) => seat.seat)
    .join(", ")}`;

  console.log(orderData.selectedSeatsInfo);
  console.log(JSON.stringify(orderData.selectedSeatsInfo));

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);

      // 비회원으로 해서 저기 위에 있는 customerKey를 안쓰고(저거 계속 랜덤하게 만들어야됨)
      // 그냥 저장할거임
      // 비회원 결제
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="wrapper" style={{ maxWidth: "600px", paddingTop: "150px" }}>
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />

        <br />

        {/* 결제하기 버튼 */}
        <button
          style={{
            backgroundColor: "#004d7c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontsize: "16px",
            cursor: "pointer",
            width: "11%",
            padding: "13px",
            display: "flex" /* Flexbox 사용 */,
            alignitems: "center" /* 수직 중앙 정렬 */,
          }}
          disabled={!ready}
          onClick={async () => {
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.

              // 난 반대로했음 결제요청하고 다 되면 급액 서버에 저장함
              await widgets.requestPayment({
                // 여기있는건 결제창에 이름이랑 뜨는거
                orderId: uniqueOrderId,
                orderName: titleSeats, // 좌석 정보가 제품명임

                // 이 아래 값들은 나중에 유저 테이블되면 앞에서 부터 가지고 오던 세션에서 가지고오기(?)
                // 아직은 모르겠음 그냥 자바에서 하는게 더 편할듯 (아 백에서 비교해야되나..?)

                // 추가내용: 아래 다 필요없는거 같다? 지금은 비회원으로만 하니

                // customerEmail: "customer123@gmail.com",
                // customerName: "김토스",
                // customerMobilePhone: "01012341234",
              });

              console.log("결제 성공!");

              // ------ 결제 성공 후 데이터 서버 전송 ------ //
              const response = await axios.post("/api/order/pay", tossdata, {
                headers: {
                  "Content-Type": "application/json",
                },
              });

              console.log("결제 정보 저장 성공: ", response.data);

              navigate("/order/success", { state: tossdata });
            } catch (error) {
              // 에러 처리하기
              console.error(error);

              // alert("구매 실패, 잠시후 다시 시도해주세요");

              // 실패하면 체크 박스 체크 안해서 위 alert 떴는데 이제 오류 나면 이 아래 문구 출력됨
              alert("약관에 동의해주세요");
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
