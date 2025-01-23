package com.danaojo.ticatch.api.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class KopisRepository {
	@PersistenceContext
	private final EntityManager em;
	
	// PFJoinDB 저장
	public void savePFJoinList(PFJoin pfjoin) {
		em.persist(pfjoin);
	}
}