package com.danaojo.ticatch.order.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "PFJOIN") // 예약어가 아닌 기존 테이블 이름으로 설정
@Getter
@Setter
@ToString
public class PFJoinDTO {

	@Id
	@Column(name = "SEQ_PFJOIN_ID")
	private Long seqPfjoinId;

	@Column(name = "FD_ADDR")
	private String fdAddr;

	@Column(name = "FD_LATITUDE")
	private String fdLatitude;

	@Column(name = "FD_LONGITUDE")
	private String fdLongitude;

	@Column(name = "FD_PHONE")
	private String fdPhone;

	@Column(name = "P_END_DATE")
	private String pEndDate;

	@Column(name = "P_GENRE")
	private String pGenre;

	@Column(name = "P_ID")
	private String pId;

	@Column(name = "P_POSTER")
	private String pPoster;

	@Column(name = "P_START_DATE")
	private String pStartDate;

	@Column(name = "P_TITLE")
	private String pTitle;

	@Column(name = "PD_CAST")
	private String pdCast;

	@Column(name = "PD_CHILD")
	private String pdChild;

	@Column(name = "PD_HALL_NAME")
	private String pdHallName;

	@Column(name = "PD_IMG")
	private String pdImg;

	@Column(name = "PD_LOCATION")
	private String pdLocation;

	@Column(name = "PD_RUNTIME")
	private String pdRuntime;

	@Column(name = "PD_SEATPRICE")
	private String pdSeatprice;

	@Column(name = "PD_TIME")
	private String pdTime;

	@Column(name = "PL_LOCATION_GUN")
	private String plLocationGun;

	@Column(name = "PL_LOCATION_SIDO")
	private String plLocationSido;

	public PFJoinDTO() {
	}

}
