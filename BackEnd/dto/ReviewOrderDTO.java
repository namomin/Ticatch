package com.danaojo.ticatch.detail.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewOrderDTO {
	private Long seqReviewId;
    private String userId;
    private String reviewContent;
    private LocalDateTime reviewDate;
    private int rating;
    private String viewDate;
    private String viewTime;
    
    public ReviewOrderDTO(Long seqReviewId, String userId, String reviewContent, LocalDateTime reviewDate, int rating, String viewDate, String viewTime) {
        this.seqReviewId = seqReviewId;
        this.userId = userId;
        this.reviewContent = reviewContent;
        this.reviewDate = reviewDate;
        this.rating = rating;
        this.viewDate = viewDate;
        this.viewTime = viewTime;
    }

}
