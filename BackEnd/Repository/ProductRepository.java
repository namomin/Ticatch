package com.danaojo.ticatch.detail.Repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.danaojo.ticatch.api.repository.PFJoin;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ProductRepository {
	
	@Autowired
	private final EntityManager em;
	
	// 상품 시퀀스 아이디
	public PFJoin findOne(Long seq_pfjoin_id) {
		return em.find(PFJoin.class, seq_pfjoin_id);
	}
	
	// 시퀀스 아이디로 해당 공연의 상세정보 조회
	public List<PFJoin> detailList(Long seq_pfjoin_id) {
	    return em.createQuery(
	        "SELECT p FROM PFJoin p WHERE p.seq_pfjoin_id = :seq_pfjoin_id", 
	        PFJoin.class)
	        .setParameter("seq_pfjoin_id", seq_pfjoin_id)
	        .getResultList();
	}

	public List<PFJoin> detailTab(Long seq_pfjoin_id) {
		return em.createQuery(
				"SELECT p.p_start_date, p.p_end_date, p.pd_img, p.pd_time FROM PFJoin p WHERE p.seq_pfjoin_id = :seq_pfjoin_id ",
				PFJoin.class)
				.setParameter("seq_pfjoin_id", seq_pfjoin_id)
				.getResultList();
	}

}
