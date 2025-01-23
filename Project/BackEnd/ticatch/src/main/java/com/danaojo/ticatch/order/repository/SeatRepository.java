package com.danaojo.ticatch.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danaojo.ticatch.order.Entity.SeatEntity;
import com.danaojo.ticatch.order.Entity.SeatId;

public interface SeatRepository extends JpaRepository<SeatEntity, SeatId> {

}
