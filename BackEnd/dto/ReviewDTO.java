package com.danaojo.ticatch.detail.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewDTO {
	private Long seq_review_id;
	private String user_id;
	private Long seq_pfjoin_id;
	private String review_content;
	private LocalDateTime review_date;
	private int rating;
	
}
