package com.danaojo.ticatch.api.kopis.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FacilityTypeDTO {
	@JacksonXmlProperty(localName = "prfplcnm")
	private String ft_name; // 공연장 이름
	
	@JacksonXmlProperty(localName = "mt13id")
	private String ft_id; // 공연장 ID
	
	@JacksonXmlProperty(localName = "seatscale")
	private String ft_seatscale; // 공연장 좌석수
	
	@JacksonXmlProperty(localName = "stageorchat")
	private String ft_stageorchat; 
	
	@JacksonXmlProperty(localName = "stagepracat")
	private String ft_stagepracat; 
	
	@JacksonXmlProperty(localName = "stagedresat")
	private String ft_stagedresat; 
	
	@JacksonXmlProperty(localName = "stageoutdrat")
	private String ft_stageoutdrat;
	
	@JacksonXmlProperty(localName = "disabledseatscale")
	private String ft_disabledseatscale; 
	
	@JacksonXmlProperty(localName = "stagearea")
	private String ft_stagearea;
}