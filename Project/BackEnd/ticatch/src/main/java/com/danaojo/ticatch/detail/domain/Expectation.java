package com.danaojo.ticatch.detail.domain;

import java.time.LocalDateTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Expectation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_exp_id")
	@SequenceGenerator(name = "seq_exp_id", sequenceName = "seq_exp_id", allocationSize = 1)
	private int seq_exp_id;
	
	private String user_id;
	private Long seq_pfjoin_id;
	private String exp_content;
	private LocalDateTime exp_date;

}
