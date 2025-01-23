package com.danaojo.ticatch.detail.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Seat {
	
	@EmbeddedId
	private SeatId seatId;
	
	private int total;
	private int sold_seat;
}
