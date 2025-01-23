package com.danaojo.ticatch.detail.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SeatDTO {
	private Long seq_pfjoin_id;
	private String select_date;
	private String select_time;
	private int total;
	private int sold_seat;
	
}
