package com.danaojo.ticatch.order.Entity;

import jakarta.persistence.Column;
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
@Table(name = "Save")
@Getter
@Setter
@ToString
public class SaveEntity {

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_SAVE_ID")
    @SequenceGenerator(name = "SEQ_SAVE_ID", sequenceName = "SEQ_SAVE_ID", allocationSize = 1)
    @Column(name = "seq_save_id")
	private int seqsaveid;
	@Column(name = "user_id")
	private String userid;
	@Column(name = "seq_pfjoin_id")
	private Long seqpfjoinid;
	@Column(name = "p_poster")
	private String pposter;
	
	public SaveEntity() {}

	public SaveEntity(int seqsaveid, String userid, Long seqpfjoinid, String pposter) {
		super();
		this.seqsaveid = seqsaveid;
		this.userid = userid;
		this.seqpfjoinid = seqpfjoinid;
		this.pposter = pposter;
	}
	
}
