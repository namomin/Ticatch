import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "../Calendar/Order_calendar.jsx";
import axios from "axios";

import style from "./Order.module.css";

const Performance = ({ selectedSeats = [], setNoSeatInfo }) => {
  const navigate = useNavigate(); // 이걸로 페이지 이동함
  const location = useLocation(); // 테스트 페이지에서 데이터 가지고 오기 위해서 (state 를) 가지고 오기위해서
  const [fetchId, setFetchId] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [maxSelectableDate, setMaxSelectableDate] = useState(
    new Date(2025, 11, 30)
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatInfo, setSeatInfo] = useState([]);

  const seqPfjoinIds = fetchId.map((item) => item.seqPfjoinId);

  // 테스트페이지에서 받은 값들
  const { selectedDay, selectedTime, seqId } = location.state || {}; // 전달된 state를 구조 분해 할당

  // 테스트 페이지에서 받아온 seqid 를 fetchDetailById 에 담기
  const fetchDetailById = useCallback(() => {
    if (!seqId) {
      console.error("seqId가 존재하지 않습니다.");
      return;
    }

    console.log("API 요청 시작: ", `/api/order/${seqId}`);

    axios
      .get(`/api/order/${seqId}`)
      .then((response) => {
        const data = response.data;
        setFetchId(data);

        if (data.length > 0 && data[0].pendDate) {
          const [year, month, day] = data[0].pendDate.split(".");
          setMaxSelectableDate(new Date(year, parseInt(month) - 1, day));
        }
      })
      .catch((error) => console.error("데이터 가져오기 에러:", error));
  }, [seqId]);

  // 테스트 페이지에서 받아온 값들이 있으면 fetchDtailByID 를 호출
  useEffect(() => {
    if (seqId) {
      fetchDetailById();
    }
  }, [seqId, fetchDetailById]);

  // 테스트 페이지에서 받아온 날짜랑 회차를 딱 한번만 초기값으로 설정해주기
  // 초기값 설정 여부를 추적하는 useRef
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      // 초기값 설정
      if (selectedDay) {
        setSelectedDate(new Date(selectedDay));
      }
      if (selectedTime) {
        setSelectedTimeIndex(parseInt(selectedTime, 10));
      }
      isInitialRender.current = false; // 초기 설정 완료 표시
    }
  }, [selectedDay, selectedTime]);

  // 결제 페이지로 값 옮기기 (checkout)
  const handleReservation = () => {
    // 세션이 비여있음 로그인으로 보냄
    if (sessionStorage.getItem("userId") === null || undefined) {
      navigate("/login");
      return;
    }
    const dataToSend = {
      seqPfjoinIds,
      selectedDate: selectedDate.toISOString().split("T")[0],
      totalPrice,
      selectedTime: currentPdTime[selectedTimeIndex],
      selectedSeatsInfo: selectedSeats.map((seat) => {
        const seatGroup = seat[0];
        const seatInfoForGroup = seatInfo.find(
          (info) => seatGroup >= info.groupStart && seatGroup <= info.groupEnd
        );
        return {
          seat,
          grade: seatInfoForGroup?.grade || "등급 없음",
          price: seatInfoForGroup?.price,
        };
      }),
    };

    console.log("전송할 데이터:", dataToSend);

    navigate("/order/checkout", { state: dataToSend });
  };

  // API 데이터 가져오기
  // const fetchDetailById = useCallback((id) => {
  //   axios
  //     .get(`/api/order/${id}`)
  //     .then((response) => {
  //       const data = response.data;
  //       setFetchId(data);

  //       if (data.length > 0 && data[0].pendDate) {
  //         const [year, month, day] = data[0].pendDate.split(".");
  //         setMaxSelectableDate(new Date(year, parseInt(month) - 1, day));
  //       }
  //     })
  //     .catch((error) => console.error("데이터 가져오기 에러:", error));
  // }, []);

  // 처음에 받고 보여주는거랑 날짜랑 회차 바꿀때 마다 데이터 전송 함수
  const sendDataToBackend = async () => {
    if (fetchId.length === 0) {
      console.log(
        "fetchId가 비어 있습니다. 데이터 로드를 기다립니다. (값은 있음)"
      );
      return;
    }

    const seqPfjoinIds = fetchId.map((item) => item.seqPfjoinId); // 다시 선언

    const dataToSend = {
      seqPfjoinIds,
      selectedDate: selectedDate.toISOString().split("T")[0], // 날짜 (YYYY-MM-DD)
      selectedTime: currentPdTime[selectedTimeIndex] || "시간 정보 없음", // 현재 선택된 시간
    };

    try {
      const response = await axios.post("/api/order/data", dataToSend);
      console.log("백엔드 전송 성공:", response.data);
      setNoSeatInfo(response.data);
    } catch (error) {
      console.error("백엔드 전송 실패:", error);
    }
  };

  // 테스트 페이지에서 올때 처음에 fetchId 가 있고 실행되서 오류 없앴음
  useEffect(() => {
    if (fetchId.length > 0) {
      sendDataToBackend(); // fetchId가 설정된 후 호출
    }
  }, [fetchId]);

  // selectedDate 변경 시 데이터 전송
  useEffect(() => {
    sendDataToBackend();
  }, [selectedDate]);

  // selectedDate 변경 시 데이터 전송
  useEffect(() => {
    sendDataToBackend();
  }, [selectedTimeIndex]);

  // 백에서 가지고온 좌석 정보 SeatBooking 으로 넘겨주는거
  useEffect(() => {
    if (selectedSeats.length === 0) {
      setNoSeatInfo("No seats selected");
    } else {
      setNoSeatInfo(`Selected seats: ${selectedSeats.join(", ")}`);
    }
  }, [selectedDate, selectedTimeIndex]);

  // 공연 시간을 포맷팅
  const formatPdTime = useCallback((pdTime) => {
    // console.log("pdTime: " + pdTime);
    try {
      // pdTime이 제대로 전달되었는지 확인
      if (!pdTime) {
        throw new Error("pdTime이 존재하지 않습니다.");
      }

      // "목요일 ~ 금요일(20:00)" 형태의 범위도 처리할 수 있도록 개선된 정규식
      const dayTimePairs = [];

      // 범위 형식이나 단일 요일과 시간을 처리할 수 있는 정규식을 사용하여 파싱
      const pattern =
        /([가-힣]+)\s?~\s?([가-힣]+)\(([^)]+)\)|([가-힣]+)\(([^)]+)\)/g;
      let match;

      // 정규식을 사용하여 pdTime에서 모든 요일과 시간을 추출
      while ((match = pattern.exec(pdTime)) !== null) {
        if (match[1] && match[2] && match[3]) {
          // 범위 형식: "목요일 ~ 금요일(20:00)"
          const startDay = match[1];
          const endDay = match[2];
          const timeStr = match[3];

          // 범위에 포함된 요일을 처리
          const days = [startDay, endDay];
          const times = timeStr.split(/\s*,\s*/); // 시간을 쉼표로 분리

          days.forEach((day) => {
            times.forEach((time) => {
              dayTimePairs.push(`${day.trim()}(${time.trim()})`);
            });
          });
        } else if (match[4] && match[5]) {
          // 단일 요일과 시간: "화요일(20:00)"
          const day = match[4];
          const timeStr = match[5];

          const times = timeStr.split(/\s*,\s*/); // 시간을 쉼표로 분리
          times.forEach((time) => {
            dayTimePairs.push(`${day.trim()}(${time.trim()})`);
          });
        }
      }

      if (dayTimePairs.length === 0) {
        throw new Error("시간 정보가 누락되었습니다.");
      }

      // console.log(dayTimePairs);
      return dayTimePairs;
    } catch (e) {
      console.error(e.message);
      return ["형식 오류"];
    }
  }, []);

  // 좌석 및 가격 정보 계산
  const calculateSeatInfo = useCallback(() => {
    const seatPrices = fetchId.reduce((prices, item) => {
      const seatPriceArray = item.pdSeatprice.split(/,(?!\d)/);
      const groupSize = Math.ceil(16 / seatPriceArray.length);
      const seatData = [];

      seatPriceArray.forEach((seatPrice, index) => {
        const match = seatPrice.trim().match(/([가-힣A-Z]+)\s([\d,]+)원/);
        if (match) {
          const price = parseInt(match[2].replace(/,/g, ""), 10);
          const startIndex = index * groupSize;
          const endIndex = startIndex + groupSize;

          seatData.push({
            grade: match[1],
            price,
            groupStart: String.fromCharCode(65 + startIndex),
            groupEnd: String.fromCharCode(65 + Math.min(endIndex, 16) - 1),
          });

          for (let i = startIndex; i < endIndex && i < 16; i++) {
            prices[String.fromCharCode(65 + i)] = price;
          }
        }
      });

      setSeatInfo(seatData);
      return prices;
    }, {});

    return seatPrices;
  }, [fetchId]);

  // 총 가격 계산
  const calculateTotalPrice = useCallback(() => {
    const seatPrices = calculateSeatInfo();
    return selectedSeats.reduce((total, seat) => {
      return total + (seatPrices[seat[0]] || 0);
    }, 0);
  }, [selectedSeats, calculateSeatInfo]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [selectedSeats, fetchId, calculateTotalPrice]);

  // 좌석 선택 시 등급과 가격 출력
  useEffect(() => {
    selectedSeats.forEach((seat) => {
      const seatGroup = seat[0];
      const seatInfoForGroup = seatInfo.find(
        (info) => seatGroup >= info.groupStart && seatGroup <= info.groupEnd
      );
      if (seatInfoForGroup) {
        console.log(
          `선택한 좌석: ${seat}, 등급: ${
            seatInfoForGroup.grade
          }, 가격: ${seatInfoForGroup.price.toLocaleString("ko-KR")}원`
        );
      }
    });
  }, [selectedSeats, seatInfo]);

  const currentPdTime =
    fetchId.length > 0 ? formatPdTime(fetchId[0].pdTime) : [];

  return (
    <div>
      <ul>
        {fetchId.map((item) => (
          <li key={item.seqPfjoinId} className={style.title}>
            <div className={style.order_title_genre}>{item.pgenre}</div>
            <h3 className={style.order_title}>{item.ptitle}</h3>
          </li>
        ))}
      </ul>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        // 이거 한개만 보내짐 배열인데 왜 한개만 보내지냐?
        availableDays={fetchId.length > 0 ? fetchId[0].pdTime : []}
        maxSelectableDate={maxSelectableDate}
      />

      {seatInfo.length > 0 ? (
        <div>
          {seatInfo.map((info, index) => (
            <div key={index} className={style.time_selector}>
              <span className={style.order_seat_price}>
                {info.grade} {info.price.toLocaleString("ko-KR")}원, 그룹:{" "}
                {info.groupStart} ~ {info.groupEnd}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div>좌석 및 가격 정보가 없습니다.</div>
      )}

      <div className={style.time_selector}>
        <button
          onClick={() =>
            setSelectedTimeIndex(Math.max(0, selectedTimeIndex - 1))
          }
          disabled={selectedTimeIndex === 0}
        >
          &lt;
        </button>
        <span className={style.order_time}>
          {currentPdTime[selectedTimeIndex]}
        </span>
        <button
          onClick={() =>
            setSelectedTimeIndex(
              Math.min(currentPdTime.length - 1, selectedTimeIndex + 1)
            )
          }
          disabled={selectedTimeIndex >= currentPdTime.length - 1}
        >
          &gt;
        </button>
      </div>
      <div className={style.order_reserve_content}>
        <h3 className={style.time_selector}>
          <div className={style.order_reserve_title}>공연날</div>
          <div className={style.order_reserve_info}>
            {selectedDate.toLocaleDateString()}
          </div>
        </h3>

        <h3 className={style.time_selector}>
          <div className={style.order_reserve_title}>선택된 좌석</div>
          <div className={style.order_reserve_info}>
            {selectedSeats.join(", ") || "없음"}
          </div>
        </h3>

        <h2 className={style.time_selector}>
          <div className={style.order_reserve_title}>총액</div>
          <div className={style.order_reserve_info}>
            {totalPrice.toLocaleString("ko-KR")}원
          </div>
        </h2>
      </div>
      <button
        className={style.reserve_button}
        onClick={() => {
          selectedSeats.length != 0
            ? handleReservation()
            : alert("좌석을 선택해주세요");
        }}
      >
        예매하기
      </button>

      {/* <button className="reserve-button" onClick={() => fetchDetailById(1)}>
        테스트 데이터 가져오기
      </button> */}
    </div>
  );
};

export default Performance;
