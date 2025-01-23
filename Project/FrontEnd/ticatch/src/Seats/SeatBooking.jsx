import React, { useEffect } from "react";
import style from "./Seats.module.css";

const rows = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
];
const seatsPerRow = 10;

const SeatBooking = ({ selectedSeats, setSelectedSeats, noSeatInfo }) => {
  const handleSeatClick = (row, number) => {
    const seat = `${row}${number}`;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  // 배열 초기화
  useEffect(() => {
    setSelectedSeats([]);
  }, []);

  // 회차 및 날짜 변경시 선택된 좌석 선택 해제
  useEffect(() => {
    setSelectedSeats([]);
  }, [noSeatInfo]);

  const parseAndCompare = (selectedSeats, noSeatInfo) => {
    // noSeatInfo가 null 또는 undefined인 경우 빈 배열로 처리
    const parsedNoSeatInfo = noSeatInfo
      ? noSeatInfo.split(",").map((info) => info.trim())
      : [];

    // validSeats: A1 ~ P10 범위의 좌석
    const validSeats = rows.flatMap((row) =>
      Array.from({ length: seatsPerRow }, (_, index) => `${row}${index + 1}`)
    );

    // selectedSeats에서 validSeats와 일치하는 좌석만 필터링
    const filteredSeats = selectedSeats.filter((seat) =>
      validSeats.includes(seat)
    );

    // filteredSeats와 parsedNoSeatInfo 간의 교집합
    const matches = parsedNoSeatInfo.filter((info) =>
      filteredSeats.includes(info)
    );

    return { validSeats, filteredSeats, parsedNoSeatInfo, matches };
  };

  const { parsedNoSeatInfo } = parseAndCompare(selectedSeats, noSeatInfo);

  return (
    <div className={style.main_body}>
      <div className={style.stage_container}>
        <div className={style.stage_box}>STAGE</div>
      </div>
      <div className={style.seat_groups}>
        {rows.map((row) => (
          <div key={row} className={style.seat_row}>
            {/* 알파벳 표시 */}
            <div className={style.row_label}>{row}</div>
            <div className={style.seat_container}>
              {Array.from({ length: seatsPerRow }, (_, index) => (
                <div
                  key={index}
                  className={`${style.seat} ${
                    parsedNoSeatInfo.includes(`${row}${index + 1}`)
                      ? style.unavailable // parsedNoSeatInfo에 포함된 좌석은 "seat-unavailable"
                      : selectedSeats.includes(`${row}${index + 1}`)
                      ? style.selected // 선택된 좌석은 "selected"
                      : style.available // 나머지 좌석은 "available"
                  }`}
                  onClick={
                    parsedNoSeatInfo.includes(`${row}${index + 1}`)
                      ? undefined // seat-unavailable인 좌석은 클릭 비활성화
                      : () => handleSeatClick(row, index + 1)
                  }
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatBooking;
