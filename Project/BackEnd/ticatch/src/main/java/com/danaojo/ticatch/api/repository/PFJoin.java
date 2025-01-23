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
@Table(name = "PFJOIN")
@Getter @Setter
public class PFJoin {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PFJoin_seq")
	@SequenceGenerator(name = "PFJoin_seq", sequenceName = "seq_pfjoin_id", allocationSize = 1)
	private Long seq_pfjoin_id;
	
	private String p_id; // 공연 ID
	private String p_title; // 제목
	private String p_poster; // 공연 포스터
	private String p_start_date; // 공연 시작일
	private String p_end_date; // 공연 끝나는 날
	private String pd_location; // 공연 위치
	private String pd_hall_name; // 공연장 이름
	private String pd_cast; // 출연진
	private String pd_runtime; // 상영시간
	private String pd_seatprice; // 좌석가격
	private String p_genre; // 공연 장르
	private String pd_child; // 어린이 시청 여부
	private String pd_img; // 상세 이미지
	private String pd_time; // 공연 일정
	private String pl_location_sido; // 공연 지역, 시도
	private String pl_location_gun; // 공연 지역, 구군
	private String fd_phone; // 시설 전화번호
	private String fd_addr; // 시설 주소
	private String fd_latitude; // 시설 위도
	private String fd_longitude; // 시설 경도
}
