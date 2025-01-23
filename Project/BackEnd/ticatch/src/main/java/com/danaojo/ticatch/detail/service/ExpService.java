package com.danaojo.ticatch.detail.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.danaojo.ticatch.detail.Repository.ExpRepository;
import com.danaojo.ticatch.detail.domain.Expectation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpService {
	
	@Autowired
	private final ExpRepository expRepository;
	
	// 기대평 갯수 조회
		public Long countExps(Long seq_pfjoin_id) {
			return expRepository.countExps(seq_pfjoin_id);
		}
	
	// 해당 공연의 기대평 조회
	@Transactional(readOnly = true)
	public List<Expectation> findExps(Long seq_pfjoin_id) {
		return expRepository.findExps(seq_pfjoin_id);
	}

	// 기대평 저장
	@Transactional
	public void saveExp(Expectation expectation) {
		expRepository.save(expectation);
	}

	// 기대평 삭제
	@Transactional
	public Long deleteExp(Long seq_exp_id) {
		return (long) expRepository.deleteExp(seq_exp_id);
	}

}
