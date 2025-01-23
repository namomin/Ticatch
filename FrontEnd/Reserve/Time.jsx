import React, { useEffect, useState } from 'react';
import cssTime from '../css/Main.module.css';

export default function Time({ time, setSelectTime, selectDate }) {
    // timeString에서 괄호 안의 값을 추출하는 함수
    const extractTimes = (timeString) => {
        const match = timeString.match(/\(([^)]+)\)/); // 괄호 안의 값 추출
        if (match) {
            return match[1].split(/\s*,\s*/); // 쉼표(,)와 공백(\s*)을 정규식으로 처리
        }
        return [];
    };

    // 주어진 time을 배열로 변환
    const times = time ? extractTimes(time) : [];
    const [selectTime, setSelectedTime] = useState(null);
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null); // 선택된 시간의 인덱스값을 저장

    // 클릭 시 선택된 시간과 그 인덱스를 상태에 저장
    const handleClick = (data, index) => {
        setSelectedTime(data); // 선택된 시간 저장
        setSelectedTimeIndex(index); // 선택된 시간의 인덱스 저장
        setSelectTime(data); // 부모 컴포넌트에 시간 값 전달
    };

    // 날짜 변경 시 선택된 회차 초기화
    useEffect(() => {
        setSelectedTime(null);
        setSelectedTimeIndex(null);
    }, [selectDate]);

    console.log('회차 인덱스 : ' + selectedTimeIndex);

    return (
        <ul className={cssTime.product_time_choice_ul}>
            {!selectDate ? (
                <li className={cssTime.product_time_choice_li}>
                    <span className={cssTime.product_time_choice_message}>
                        예매 날짜를 선택해주세요
                    </span>
                </li>
            ) : (
                times.map((time, index) => (
                    <li className={cssTime.product_time_choice_li} key={index}>
                        <button
                            className={
                                selectTime === time
                                    ? cssTime.product_time_choice_btn_selected
                                    : cssTime.product_time_choice_btn
                            }
                            onClick={() => handleClick(time, index)} // 시간과 인덱스를 전달
                        >
                            <span className={cssTime.product_time_choice_span}>
                                {time.replace(':', '시 ') + '분'}
                            </span>
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
}
