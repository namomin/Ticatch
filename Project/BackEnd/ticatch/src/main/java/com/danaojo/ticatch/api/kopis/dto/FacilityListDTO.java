package com.danaojo.ticatch.api.kopis.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FacilityListDTO {
	@JacksonXmlProperty(localName = "mt10id")
	private String fl_id; // 공연시설 ID
	
	@JacksonXmlProperty(localName = "fcltynm")
	private String fl_name; // 공연시설명
	
	@JacksonXmlProperty(localName = "mt13cnt")
	private String fl_facilityCnt; // 공연장 수 
	
	@JacksonXmlProperty(localName = "fcltychartr")
	private String fl_fcltychartr; // 시설특성
	
	@JacksonXmlProperty(localName = "sidonm")
	private String fl_sidonm; // 지역(시도)
	
	@JacksonXmlProperty(localName = "gugunnm")
	private String fl_gugunnm; // 지역(구군) 
	
	@JacksonXmlProperty(localName = "opende")
	private String fl_opende; // 개관연도 
}