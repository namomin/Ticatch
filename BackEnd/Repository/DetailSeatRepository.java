package com.danaojo.ticatch.detail.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.danaojo.ticatch.detail.domain.Seat;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DetailSeatRepository {
	
	@Autowired
	private final EntityManager em;

	public int seatView(Long seqPfjoinId, String selectDate, String selectTime) {
		return em.createQuery(
				"SELECT s.total FROM Seat s WHERE s.seatId.seqPfjoinId = :seqPfjoinId AND s.seatId.selectDate = :selectDate AND s.seatId.selectTime = :selectTime", 
				Integer.class)
				.setParameter("seqPfjoinId", seqPfjoinId)
	            .setParameter("selectDate", selectDate)
	            .setParameter("selectTime", selectTime)
	            .getSingleResult();
	}

}
