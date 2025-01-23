package com.danaojo.ticatch.order.Entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SeatId implements Serializable {

    private Long seqPfjoinId; // 공연 시퀀스 아이디
    private String selectDate; // 날짜
    private String selectTime; // 회차

    // 기본 생성자
    public SeatId() {
    }

    // 매개변수 생성자
    public SeatId(Long seqPfjoinId, String selectDate, String selectTime) {
        this.seqPfjoinId = seqPfjoinId;
        this.selectDate = selectDate;
        this.selectTime = selectTime;
    }

    // `hashCode`와 `equals` 구현
    @Override
    public int hashCode() {
        return Objects.hash(seqPfjoinId, selectDate, selectTime);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true; // 같은 객체 참조 시 동일
        if (obj == null || getClass() != obj.getClass())
            return false; // 다른 클래스인 경우
        SeatId that = (SeatId) obj;
        // 필드 값을 비교하여 동일 여부 결정
        return Objects.equals(seqPfjoinId, that.seqPfjoinId) && Objects.equals(selectDate, that.selectDate)
                && Objects.equals(selectTime, that.selectTime);
    }
}
