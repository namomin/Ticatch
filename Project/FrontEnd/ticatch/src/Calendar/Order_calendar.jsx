import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// import style from "./Order_calendar.module.css";
// import "./Order_calendar.module.css";
// module 쓰니 css 깨진다
import "./Order_calendar.css";

export default function Calendar({
  selectedDate,
  setSelectedDate,
  availableDays,
  maxSelectableDate,
}) {
  const getDayClassName = (date) => {
    const day = date.getDay();
    // if (day === 0) return style.sunday; // 일요일 클래스
    // if (day === 6) return style.saturday; // 토요일 클래스
    if (day === 0) return "react-datepicker__day--sunday";
    if (day === 6) return "react-datepicker__day--saturday";
    return "";
  };

  const filterDate = (date) => {
    const dayNames = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return availableDays.includes(dayNames[date.getDay()]);
  };

  console.log("availableDays: " + availableDays);

  return (
    // <div className={style.calendar_main}>
    <div className="calendar_main">
      <DatePicker
        dateFormat="yyyy.MM.dd"
        minDate={new Date()}
        maxDate={maxSelectableDate}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        filterDate={filterDate}
        inline
        locale={ko}
        dayClassName={getDayClassName}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          // <div className={style.custom_header}>
          <div className="custom_header">
            <button
              // className={style.custom_header_button}
              className="custom_header_button"
              onClick={decreaseMonth}
            >
              &lt;
            </button>
            {/* <span className={style.custom_header_span}> */}
            <span className="custom_header_span">
              {`${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
                2,
                "0"
              )}`}
            </span>
            <button
              // className={style.custom_header_button}
              className="custom_header_button"
              onClick={increaseMonth}
            >
              &gt;
            </button>
          </div>
        )}
      />
    </div>
  );
}
