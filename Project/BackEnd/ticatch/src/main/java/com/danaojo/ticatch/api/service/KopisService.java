package com.danaojo.ticatch.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.danaojo.ticatch.api.kopis.Kopis;
import com.danaojo.ticatch.api.kopis.dto.PFJoinDTO;
import com.danaojo.ticatch.api.repository.KopisRepository;
import com.danaojo.ticatch.api.repository.PFJoin;
import com.danaojo.ticatch.api.util.KopisUtil;

import jakarta.transaction.Transactional;

@Service
public class KopisService {
	@Autowired
	private KopisRepository kopisRepository;

	@Transactional
	public void savePFJoin() {
		Kopis kopis = new Kopis();
		KopisUtil util = new KopisUtil();
		
		// DTO를 받고
		List<PFJoinDTO> pList = kopis.PfDBList();
		// 변환을 하고
		List<PFJoin> saveData = util.returnPFJoinList(pList);
		
		System.out.println("pList SIZE : " + pList.size());
		System.out.println("saveData Size : " + saveData.size());
		// 저장을 한다.
		for(int i=0; i<saveData.size(); i++) {
			kopisRepository.savePFJoinList(saveData.get(i));
		}
	}	
}