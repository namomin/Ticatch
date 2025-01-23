package com.danaojo.ticatch.api.kopis.dto;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PerformDetailDTO {
	@JacksonXmlProperty(localName = "mt20id")
	private String pd_id; // 공연 ID
	
	@JacksonXmlProperty(localName = "mt10id")
	private String pd_facility_id; // 공연시설 ID

	@JacksonXmlProperty(localName = "prfnm")
	private String pd_title; // 공연명

	@JacksonXmlProperty(localName = "prfpdfrom")
	private String pd_start; // 공연시작일

	@JacksonXmlProperty(localName = "prfpdto")
	private String pd_end; // 공연종료일
	
	@JacksonXmlProperty(localName = "fcltynm")
	private String pd_location; // 공연시설명(공연장명)
	
	@JacksonXmlProperty(localName = "prfcast")
	private String pd_cast; // 공연출연진
	
	@JacksonXmlProperty(localName = "prfcrew")
	private String pd_crew; // 공연제작진
	
	@JacksonXmlProperty(localName = "prfruntime")
	private String pd_runtime; // 공연런타임
	
	@JacksonXmlProperty(localName = "prfage")
	private String pd_age; // 공연 관람 연령
	
	@JacksonXmlProperty(localName = "entrpsnmP")
	private String pd_production; // 제작사
	
	@JacksonXmlProperty(localName = "entrpsnmA")
	private String pd_agency; // 기획사
	
	@JacksonXmlProperty(localName = "entrpsnmH")
	private String pd_host; // 주최
	
	@JacksonXmlProperty(localName = "entrpsnmS")
	private String pd_subject; // 주관
	
	@JacksonXmlProperty(localName = "pcseguidance")
	private String pd_seatprice; // 티켓가격
	
	@JacksonXmlProperty(localName = "poster")
	private String pd_poster; // 포스터 이미지 경로
	
	@JacksonXmlProperty(localName = "sty")
	private String pd_story; // 줄거리
	
	@JacksonXmlProperty(localName = "genrenm")
	private String pd_genre; // 공연장르명
	
	@JacksonXmlProperty(localName = "prfstate")
	private String pd_state; // 공연 상태
	
	@JacksonXmlProperty(localName = "openrun")
	private String pd_openturn; // 오픈런
	
	@JacksonXmlProperty(localName = "visit")
	private String pd_visit; // 내한
	
	@JacksonXmlProperty(localName = "child")
	private String pd_child; // 아동
	
	@JacksonXmlProperty(localName = "daehakro")
	private String pd_daehakro; // 대학로
	
	@JacksonXmlProperty(localName = "festival")
	private String pd_festival; // 축제
	
	@JacksonXmlProperty(localName = "musicallicense")
	private String pd_musicallicense; // 뮤지컬 라이센스
	
	@JacksonXmlProperty(localName = "musicalcreate")
	private String pd_musicalcreate; // 뮤지컬 창작
	
	@JacksonXmlProperty(localName = "updatedate")
	private String pd_updatedate; // 최종수정일
	
	@JacksonXmlProperty(localName = "styurls")
	private List<String> pd_img;	// 상세정보 이미지
	
	@JacksonXmlProperty(localName = "dtguidance")
	private String pd_time; //공연 시간 
}