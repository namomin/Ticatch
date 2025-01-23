package com.danaojo.ticatch.order.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SaveDTO {
	private int seqsaveid;
	private String userid;
	private Long seqpfjoinid;
	// 이거 추가하니 오류 난다?
//	private String ppposter;
	
	public SaveDTO() {}

	public SaveDTO(int seqsaveid, String userid, Long seqpfjoinid
//			,String ppposter
			) {
		super();
		this.seqsaveid = seqsaveid;
		this.userid = userid;
		this.seqpfjoinid = seqpfjoinid;
//		this.ppposter = ppposter;
	}

}
