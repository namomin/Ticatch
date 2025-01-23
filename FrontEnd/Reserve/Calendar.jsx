import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import cssCal from "../css/Calendar.module.css";

export default function Calendar({ startDate, endDate, time, setSelectDate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // console.log('selectedDate : ' + selectedDate);

  // startDate와 endDate를 Date 객체로 변환
  const minSelectableDate = new Date(startDate); // startDate부터 선택 가능
  const maxSelectableDate = new Date(endDate); // endDate까지 선택 가능

  // time 데이터에서 요일만 추출 (ex. "수요일" -> 3)
  const availableDays = time.split(",").map((t) => {
    const day = t.split("(")[0].trim();
    switch (day) {
      case "일요일":
        return 0;
      case "월요일":
        return 1;
      case "화요일":
        return 2;
      case "수요일":
        return 3;
      case "목요일":
        return 4;
      case "금요일":
        return 5;
      case "토요일":
        return 6;
      default:
        return -1;
    }
  });

  // 선택할 수 있는 날짜만 필터링
  const filterDates = (date) => {
    const dayOfWeek = date.getDay();
    return availableDays.includes(dayOfWeek);
  };

  // 주말 텍스트 색상 설정
  const getDayClassName = (date) => {
    const day = date.getDay();
    if (day === 0) return "react-datepicker__day--sunday";
    if (day === 6) return "react-datepicker__day--saturday";
    return "";
  };

  // 선택한 날짜 데이터값 포맷
  const handleDateChange = (date) => {
    const selectDate = format(date, "yyyy.MM.dd");
    // console.log("-----------------------------")
    // console.log('Calendar-Formatted Date:', selectDate);
    setSelectedDate(selectDate);
    setSelectDate(selectDate); // Reserve한테 전달
    // console.log('Calendar : ', selectDate);
    // console.log("-----------------------------")
  };

  return (
    <>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        minDate={
          minSelectableDate > new Date() ? minSelectableDate : new Date()
        } // startDate가 과거일 경우 오늘 날짜부터 선택 가능
        maxDate={maxSelectableDate} // endDate까지 선택 가능
        selected={new Date(selectedDate)} // Date 객체를 포맷팅된 문자열로 다시 변환하여 전달
        onChange={(date) => handleDateChange(date)} // 날짜 선택 시 날짜를 포맷팅하여 업데이트
        inline // 항상 달력 출력
        locale={ko} // 한글 설정
        dayClassName={getDayClassName} // 날짜별 클래스 동적 적용
        filterDate={filterDates} // filterDate로 날짜 필터링
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className={cssCal.custom_header}>
            <button className={cssCal.custom_header_button} onClick={decreaseMonth}>&lt;</button>
            <span
              className={cssCal.custom_header_span}
            >{`${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
              2,
              "0"
            )}`}</span>
            <button
              className={cssCal.custom_header_button}
              onClick={increaseMonth}
            >
              &gt;
            </button>
          </div>
        )}
      />
    </>
  );
}
