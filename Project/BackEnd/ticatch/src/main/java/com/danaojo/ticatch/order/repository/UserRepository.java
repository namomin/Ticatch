package com.danaojo.ticatch.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danaojo.ticatch.order.Entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{

	UserEntity findByUserId(String userId);

	UserEntity findByseqUserId(Long seqUserId);

}
