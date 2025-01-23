import { useEffect, useState } from "react";
import axios from 'axios';
import cssSeat from '../css/Main.module.css';

export default function Seat({ seqPfjoinId, selectDate, selectTime }) {
    const [seatData, setSeatData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // selectDate가 존재하면 하루 전 날짜로 변경
                let adjustedDate = selectDate;
                if (selectDate) {
                    const dateObj = new Date(selectDate);
                    dateObj.setDate(dateObj.getDate() - 1 + 1); // 하루 전으로 설정. 근데 -1만하면 -2씩 돼서 +1 붙여줌
                    adjustedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
                }

                console.log('수정된 날짜 : ' + adjustedDate);

                // 서버에 수정된 날짜를 보내기
                const response = await axios.get(`http://localhost:9090/detail/seat/${seqPfjoinId}/${adjustedDate}/${selectTime}/view`);
                
                if (response.data !== undefined && response.data !== null) {
                    setSeatData(response.data);
                } else {
                    setSeatData(null);
                }
                setError(null);
            } catch (err) {
                setSeatData(null);
                setError("잔여 좌석을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (selectDate && selectTime) {
            fetchData();
        } else {
            setSeatData(null); // 날짜 또는 시간값이 없으면 초기화
        }
    }, [selectDate, selectTime, seqPfjoinId]);

    const isDateOrTimeInvalid = !selectDate || !selectTime;
    const totalSeats = seatData !== null ? seatData : 160;

    return (
        <>
            <div className={cssSeat.product_step}>
                <div className={cssSeat.product_step_text}>잔여좌석</div>
                <div className={cssSeat.product_title}>수량</div>
            </div>
            <div className={cssSeat.product_seat_remain}>
                <ul className={cssSeat.product_seat_remain_ul}>
                    {isDateOrTimeInvalid || loading ? (
                        <li className={cssSeat.product_seat_remain_li}>
                            <span className={cssSeat.product_seat_grade}>
                                {isDateOrTimeInvalid
                                    ? '예매 날짜/회차를 선택해주세요'
                                    : '로딩 중...'}
                            </span>
                        </li>
                    ) : (
                        <li className={cssSeat.product_seat_remain_li}>
                            <span className={cssSeat.product_seat_grade}>잔여좌석</span>
                            <div className={cssSeat.product_seat_counttext}>
                                <span className={cssSeat.product_seat_count}>
                                    {totalSeats}
                                </span>
                                <span className={cssSeat.product_Seat_text}>석</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
