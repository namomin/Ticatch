package com.danaojo.ticatch.detail.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Save {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_save_id")
	@SequenceGenerator(name = "seq_save_id", sequenceName = "seq_save_id", allocationSize = 1)
	private int seq_save_id;
	
	private String user_id;
	private Long seq_pfjoin_id;
	private String p_poster;
	
}
