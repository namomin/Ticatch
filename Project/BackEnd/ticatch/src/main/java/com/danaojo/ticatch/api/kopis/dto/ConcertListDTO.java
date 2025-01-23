package com.danaojo.ticatch.api.kopis.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ConcertListDTO { // 공연 목록 DTO
	@JacksonXmlProperty(localName = "mt20id")
	private String pl_id; // 공연ID

	@JacksonXmlProperty(localName = "prfnm")
	private String pl_title; // 공연명

	@JacksonXmlProperty(localName = "prfpdfrom")
	private String pl_start_date; // 공연시작일

	@JacksonXmlProperty(localName = "prfpdto")
	private String pl_end_date; // 공연종료일

	@JacksonXmlProperty(localName = "fcltynm")
	private String pl_hall_name; // 공연시설명(공연장명)

	@JacksonXmlProperty(localName = "poster")
	private String pl_poster; // 포스터이미지경로

	@JacksonXmlProperty(localName = "area")
	private String pl_location; // 공연지역

	@JacksonXmlProperty(localName = "genrenm")
	private String pl_genre; // 공연 장르명
}