package com.danaojo.ticatch.order.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "seat")
@IdClass(SeatId.class) // 복합키를 정의
@Getter
@Setter
@ToString
public class SeatEntity {

    @Id
    @Column(name = "seq_pfjoin_id", nullable = false)
    private Long seqPfjoinId; // 공연 시퀀스 아이디 (PK/FK)

    @Id
    @Column(name = "select_date", nullable = false, length = 255)
    private String selectDate; // 날짜 (PK)

    @Id
    @Column(name = "select_time", nullable = false, length = 255)
    private String selectTime; // 회차 (PK)

    @Column(name = "total", nullable = false, columnDefinition = "NUMBER DEFAULT 160")
    private Integer total; // 총 잔여 좌석 수 (기본값 160)

    @Column(name = "sold_seat", length = 255)
    private String soldSeat; // 판매된 좌석 수

    public SeatEntity() {
    }

    public SeatEntity(Long seqPfjoinId, String selectDate, String selectTime, Integer total, String soldSeat) {
        super();
        this.seqPfjoinId = seqPfjoinId;
        this.selectDate = selectDate;
        this.selectTime = selectTime;
        this.total = total;
        this.soldSeat = soldSeat;
    }
}
