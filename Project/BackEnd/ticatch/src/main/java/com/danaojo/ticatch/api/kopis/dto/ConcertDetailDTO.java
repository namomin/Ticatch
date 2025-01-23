package com.danaojo.ticatch.api.kopis.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ConcertDetailDTO { // 공연 상세 DTO
	@JacksonXmlProperty(localName = "mt20id")
	private String pd_id;	// 공연/전시 아이디
	
	@JacksonXmlProperty(localName = "prfnm")
	private String pd_title;	// 제목
	
	@JacksonXmlProperty(localName = "prfpdfrom")
	private String pd_start;	// 시작일
	
	@JacksonXmlProperty(localName = "prfpdto")
	private String pd_end;	// 종료일
	
	@JacksonXmlProperty(localName = "fcltynm")
	private String pd_location;	// 위치
	
	@JacksonXmlProperty(localName = "prfcast")
	private String pd_cast;	// 출연진
	
	@JacksonXmlProperty(localName = "prfcrew")
	private String pd_crew;	// 감독 및 연출 
	
	@JacksonXmlProperty(localName = "prfruntime")
	private String pd_runtime;	// 상영 시간
	
	@JacksonXmlProperty(localName = "pcseguidance")
	private String pd_seatprice;	// 좌석가격
	
	@JacksonXmlProperty(localName = "poster")
	private String pd_poster;	// 포스터
	
	@JacksonXmlProperty(localName = "genrenm")
	private String pd_genre;	// 장르
	
	@JacksonXmlProperty(localName = "openrun")
	private String pd_openturn;	// 오픈런
	
	@JacksonXmlProperty(localName = "visit")
	private String pd_visit;	// 현장구매
	
	@JacksonXmlProperty(localName = "child")
	private String pd_child;	// 어린아이 허용
	
//	@JacksonXmlProperty(localName = "styurls")
//	private List<String> pd_img;	// 상세정보 이미지
	
	@JacksonXmlProperty(localName = "dtguidance")
	private String pd_time;	// 공연 시간
}