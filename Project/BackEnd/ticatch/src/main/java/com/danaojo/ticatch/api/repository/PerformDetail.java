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
@Table(name = "PERFORMDETAIL")
@Getter @Setter
public class PerformDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "performdetail_seq")
	@SequenceGenerator(name = "performdetail_seq", sequenceName = "SEQ_PD_ID", allocationSize = 1)
	private Long seq_pd_id;
	
	private String pd_id; // 공연, 전시 아이디
	private String pd_title; // 제목
	private String pd_start; // 시작일
	private String pd_end; // 종료일
	private String pd_location; // 위치
	private String pd_cast; // 출연진
	private String pd_crew; // 감독 및 연출
	private String pd_runtime; // 상영시간
	private String pd_seatprice; // 좌석가격
	private String pd_poster; // 포스터
	private String pd_genre; // 장르
	private String pd_openturn; // 오픈런
	private String pd_visit; // 현장구매
	private String pd_child; // 어린아이 허용
	private String pd_img; // 상세정보 이미지
	private String pd_time; // 공연 시간
}
