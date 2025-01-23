package com.danaojo.ticatch.api.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PERFORMLIST")
@Getter @Setter
public class PerformList {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "performlist_seq")
	@SequenceGenerator(name = "performlist_seq", sequenceName = "SEQ_PL_ID", allocationSize = 1)
	private Long seq_pl_id;

	private String pl_id; // 공연ID
	private String pl_title; // 공연명
	private String pl_start_date; // 공연시작일
	private String pl_end_date; // 공연종료일
	private String pl_hall_name; // 공연시설명(공연장명)
	private String pl_poster; // 포스터이미지경로
	private String pl_location; // 공연지역
	private String pl_genre; // 공연 장르명
}
