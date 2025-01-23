package com.danaojo.ticatch.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danaojo.ticatch.order.Entity.SaveEntity;

public interface OrderSaveRepository extends JpaRepository<SaveEntity, Integer>{

	List<SaveEntity> findByUserid(String userid);

}
