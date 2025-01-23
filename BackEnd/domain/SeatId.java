package com.danaojo.ticatch.detail.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter @Setter
public class SeatId {
	
	@Column(name="seq_pfjoin_id")
	private Long seqPfjoinId;
	@Column(name="select_date")
	private String selectDate;
	@Column(name="select_time")
	private String selectTime;

}
