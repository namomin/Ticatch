package com.danaojo.ticatch.order.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class UserDTO {
    private Long seqUserId;
    private String userId;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String loginType;
    private Date createDate;
    private Date updateDate;
    private String token;

    public UserDTO() {}

	public UserDTO(Long seqUserId, String userId, String password, String name, String email, String phone,
			String loginType, Date createDate, Date updateDate, String token) {
		super();
		this.seqUserId = seqUserId;
		this.userId = userId;
		this.password = password;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.loginType = loginType;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.token = token;
	}


}