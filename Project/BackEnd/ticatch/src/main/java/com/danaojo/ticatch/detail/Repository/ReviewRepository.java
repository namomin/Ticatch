package com.danaojo.ticatch.detail.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import com.danaojo.ticatch.detail.domain.Review;
import com.danaojo.ticatch.detail.dto.ReviewOrderDTO;

import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityManagerFactory;
//import jakarta.persistence.EntityTransaction;
//import jakarta.persistence.Persistence;
import lombok.RequiredArgsConstructor;


@Repository
@RequiredArgsConstructor
public class ReviewRepository {
	
	@Autowired
	private final EntityManager em;
	
	// 공연 리뷰 갯수 count
	public Long countReviews(Long seq_pfjoin_id) {
	    return em.createQuery(
	            "SELECT COUNT(r) FROM Review r WHERE r.seq_pfjoin_id = :seq_pfjoin_id", 
	            Long.class)
	            .setParameter("seq_pfjoin_id", seq_pfjoin_id)
	            .getSingleResult();
	}
	
	// 리뷰 별점 평균
	public Double avgRate(Long seq_pfjoin_id) {
	    // AVG() 결과가 없을 경우 null을 반환
	    return em.createQuery(
	            "SELECT AVG(r.rating) FROM Review r WHERE r.seq_pfjoin_id = :seq_pfjoin_id",
	            Double.class)
	            .setParameter("seq_pfjoin_id", seq_pfjoin_id)
	            .getSingleResult();
	}
	
	// 리뷰 조회
	public List<Review> findReviews(Long seq_pfjoin_id) {
		return em.createQuery(
				"SELECT r FROM Review r WHERE seq_pfjoin_id = :seq_pfjoin_id ORDER BY r.review_date DESC", 
				Review.class)
				.setParameter("seq_pfjoin_id", seq_pfjoin_id)
				.getResultList();
	}
	
	// 관람자 표시를 위한 리뷰 조회
	public List<ReviewOrderDTO> findReviewsOrders(Long seqPfjoinId) {
		 return em.createQuery(
		            "SELECT new com.danaojo.ticatch.detail.dto.ReviewOrderDTO(r.seq_review_id, r.user_id, r.review_content, r.review_date, r.rating, o.viewDate, o.viewTime) " +
		            "FROM Review r JOIN OrderEntity o ON r.seq_pfjoin_id = o.seqPfjoinId " +
		            "WHERE o.seqPfjoinId = :seqPfjoinId AND CONCAT(o.viewDate, ' ', o.viewTime) <= CURRENT_TIMESTAMP " +
		            "ORDER BY r.review_date DESC",
		            ReviewOrderDTO.class)
		            .setParameter("seqPfjoinId", seqPfjoinId)
		            .getResultList();
	}

	// 리뷰 저장
	public void save(Review review) {
		em.persist(review);
	}

	// 리뷰 삭제
	public int deleteReview(Long seq_review_id) {
	    return em.createQuery("DELETE FROM Review r WHERE r.seq_review_id = :seq_review_id")
	             .setParameter("seq_review_id", seq_review_id)
	             .executeUpdate();
	}

	// 리뷰 하나 조회
	public Review findOne(Long seq_review_id) {
		return em.find(Review.class, seq_review_id);
	}
	
	
	// 리뷰 작성자가 관람자인지 Orders 테이블에서 조회
//	public List<OrderEntity> viewUser(Long seq_review_id) {
//		return em.createQuery(
//				"SELECT view_date, view_time FROM OrederEntity o WHERE seq_review_id = :seq_review_id", 
//				OrderEntity.class)
//				.setParameter("seq_review_id", seq_review_id)
//				.getResultList();
//	}

}
