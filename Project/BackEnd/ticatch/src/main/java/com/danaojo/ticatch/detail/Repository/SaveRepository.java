package com.danaojo.ticatch.detail.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.danaojo.ticatch.detail.domain.Save;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SaveRepository {

	@Autowired
	private final EntityManager em;
	
	// 공연 시퀀스 아이디와 유저 아이디의 조합이 존재하는지 조회
	public Save findByUserIdAndSeqPfjoinId(String user_id, Long seq_pfjoin_id) {
	    List<Save> result = em.createQuery(
	            "SELECT s FROM Save s WHERE s.user_id = :user_id AND s.seq_pfjoin_id = :seq_pfjoin_id", 
	            Save.class)
	        .setParameter("user_id", user_id)
	        .setParameter("seq_pfjoin_id", seq_pfjoin_id)
	        .getResultList();
	    
	    return result.isEmpty() ? null : result.get(0);
	}
	
	// 찜하기 저장
	public void save(Save save) {
		em.persist(save);
	}
	
	// 찜하기 삭제
	public void delete(Save save) {
	    em.remove(em.contains(save) ? save : em.merge(save));
	}
	
}
