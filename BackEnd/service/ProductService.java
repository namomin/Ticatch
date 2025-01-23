package com.danaojo.ticatch.detail.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.danaojo.ticatch.api.repository.PFJoin;
import com.danaojo.ticatch.detail.Repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

	@Autowired
	private final ProductRepository productRepository;
	
	// 공연 시퀀스 아이디 조회
	public PFJoin findOne(Long seq_pfjoin_id) {
		return productRepository.findOne(seq_pfjoin_id);
	}
	
	// 전달받은 시퀀스 아이디에 해당하는 공연의 상세정보 데이터 출력
	public List<PFJoin> detailList(Long seq_pfjoin_id) {
		return productRepository.detailList(seq_pfjoin_id);
	}

	public List<PFJoin> detailTab(Long seq_pfjoin_id) {
		return productRepository.detailTab(seq_pfjoin_id);
	}

	
}
