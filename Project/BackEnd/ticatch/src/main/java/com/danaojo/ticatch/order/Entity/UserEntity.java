package com.danaojo.ticatch.order.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Users")
@Getter
@Setter
@ToString
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_user_id_seq")
    @SequenceGenerator(name = "seq_user_id_seq", sequenceName = "SEQ_USER_ID_SEQ", allocationSize = 1)
    @Column(name = "SEQ_USER_ID")
    private Long seqUserId;

    @Column(name = "USER_ID", nullable = false, unique = true)
    private String userId;

    @Column(name = "USER_PW", nullable = false)
    private String password;

    @Column(name = "USER_NAME")
    private String name;

    @Column(name = "USER_EMAIL", unique = true)
    private String email;

    @Column(name = "USER_PHONE")
    private String phone;

    @Column(name = "LOGIN_TYPE")
    private String loginType;

    @Column(name = "U_CREATE_DATE")
    private Date createDate;

    @Column(name = "U_UPDATE_DATE")
    private Date updateDate;

	public UserEntity() {}

	public UserEntity(Long sequserid, String userId, String password, String name, String email, String phone,
			String loginType, Date createDate, Date updateDate) {
		super();
		this.seqUserId = sequserid;
		this.userId = userId;
		this.password = password;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.loginType = loginType;
		this.createDate = createDate;
		this.updateDate = updateDate;
	};
	
}
