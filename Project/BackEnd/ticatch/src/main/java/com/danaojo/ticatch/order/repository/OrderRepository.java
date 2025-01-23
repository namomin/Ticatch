package com.danaojo.ticatch.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danaojo.ticatch.order.Entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long>{

	List<OrderEntity> findByUserId(String userId);

}
