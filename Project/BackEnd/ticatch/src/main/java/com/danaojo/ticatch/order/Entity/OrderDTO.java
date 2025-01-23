package com.danaojo.ticatch.order.Entity;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDTO {

	private List<Integer> seqPfjoinIds; // 공연 ID 배열
	private String userId;
	private String selectedDate; // 선택된 날짜
	private String totalPrice; // 총 가격
	private String selectedTime; // 선택된 시간
	private List<SeatInfo> selectedSeatsInfo; // 좌석 정보 배열

	// Nested SeatInfo class
	@Getter @Setter @ToString
	public static class SeatInfo {
		private String seat; // 좌석 번호
		private String grade; // 좌석 등급
		private String price; // 좌석 가격

	}
}
