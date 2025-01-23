package com.danaojo.ticatch.detail.dto;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ExpectationDTO {
	private String seq_exp_id;
	private String user_id;
	private Long seq_pfjoin_id;
	private String exp_content;
	private LocalDateTime exp_date;

}
