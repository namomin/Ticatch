package com.danaojo.ticatch.order.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orders")
@Getter
@Setter
@ToString
public class OrderEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orders_seq_gen")
	@SequenceGenerator(name = "orders_seq_gen", sequenceName = "orders_seq", allocationSize = 1)
	private Long seqOrderId;

	private String userId; // 사용자 ID
	private String cancelStatus; // 취소 상태
	private String cancelDate; // 취소일
	private String buyDate; // 결제일
	private String totalSum; // 결제 총합
	private String totalTicket; // 구매한 티켓 개수
	private String seqPfjoinId; // 공연 시퀀스 아이디
	private String viewDate; // 관람일
	private String viewTime; // 관람 회차
	private String seatNum; // 좌석 번호
	private String place; // 관람 장소 이름

	public OrderEntity() {}

	public OrderEntity(Long seqOrderId, String userId, String cancelStatus, String cancelDate, String buyDate,
			String totalSum, String totalTicket, String seqPfjoinId, String viewDate, String viewTime, String seatNum,
			String place) {
		super();
		this.seqOrderId = seqOrderId;
		this.userId = userId;
		this.cancelStatus = cancelStatus;
		this.cancelDate = cancelDate;
		this.buyDate = buyDate;
		this.totalSum = totalSum;
		this.totalTicket = totalTicket;
		this.seqPfjoinId = seqPfjoinId;
		this.viewDate = viewDate;
		this.viewTime = viewTime;
		this.seatNum = seatNum;
		this.place = place;
	}

}
