package com.danaojo.ticatch.api.kopis.dto;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FacilityDetailDTO {
	@JacksonXmlProperty(localName = "mt10id")
	private String fd_name; // 공연시설 ID 
	
	@JacksonXmlProperty(localName = "fcltynm")
	private String fd_fcltynm; // 공연시설명
	
	@JacksonXmlProperty(localName = "opende")
	private String fd_opende; // 개관연도
	
	@JacksonXmlProperty(localName = "fcltychartr")
	private String fd_fcltychartr; // 시설특성 
	
	@JacksonXmlProperty(localName = "seatscale")
	private String fd_seatscale; // 객석 수
	
	@JacksonXmlProperty(localName = "mt13cnt")
	private String fd_mt13cnt; // 공연장 수
	
	@JacksonXmlProperty(localName = "telno")
	private String fd_phone; // 전화번호
	
	@JacksonXmlProperty(localName = "relateurl")
	private String fd_relateurl; // 홈페이지
	
	@JacksonXmlProperty(localName = "adres")
	private String fd_addr; // 주소
	
	@JacksonXmlProperty(localName = "la")
	private String fd_la; // 위도
	
	@JacksonXmlProperty(localName = "lo")
	private String fd_lo; // 경도
	
	@JacksonXmlProperty(localName = "restaurant")
	private String fd_restaurant; // 레스토랑
	
	@JacksonXmlProperty(localName = "cafe")
	private String fd_cafe; // 카페
	
	@JacksonXmlProperty(localName = "store")
	private String fd_store; // 편의점
	
	@JacksonXmlProperty(localName = "nolibang")
	private String fd_nolibang; // 놀이방
	
	@JacksonXmlProperty(localName = "suyu")
	private String fd_suyu; // 수유실
	
	@JacksonXmlProperty(localName = "parkbarrier")
	private String fd_parkbarrier; // 장애시설-주차장
	
	@JacksonXmlProperty(localName = "restbarrier")
	private String fd_restbarrier; // 장애시설-화장실 
	
	@JacksonXmlProperty(localName = "runwbarrier")
	private String fd_runwbarrier; // 장애시설-경사로
	
	@JacksonXmlProperty(localName = "elevbarrier")
	private String fd_elevbarrier; // 장애시설-엘리베이터
	
	@JacksonXmlProperty(localName = "parkinglot")
	private String fd_parkinglot; // 주차시설
	
	@JacksonXmlProperty(localName = "mt13s")
	private List<FacilityTypeDTO> fd_facilitytype; // 주차시설
}