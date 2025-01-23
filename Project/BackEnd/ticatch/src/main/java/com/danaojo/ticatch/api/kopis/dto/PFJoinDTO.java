package com.danaojo.ticatch.api.kopis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PFJoinDTO {
	private String pf_id; // 공연 ID
	private String pf_title; // 제목
	private String pf_poster; // 공연 포스터
	private String pf_start_date; // 공연 시작일
	private String pf_end_date; // 공연 끝나는 날
	private String pf_location; // 공연 위치
	private String pf_hall_name; // 공연장 이름
	private String pf_cast; // 출연진
	private String pf_runtime; // 상영시간
	private String pf_seatprice; // 좌석가격
	private String pf_genre; // 공연 장르
	private String pf_child; // 어린이 시청 여부
	private String pf_img; // 상세 이미지
	private String pf_time; // 공연 일정
	private String pf_location_sido; // 공연 지역, 시도
	private String pf_location_gun; // 공연 지역, 구군
	private String pf_phone; // 시설 전화번호
	private String pf_addr; // 시설 주소
	private String pf_la; // 시설 위도
	private String pf_lo; // 시설 경도
}