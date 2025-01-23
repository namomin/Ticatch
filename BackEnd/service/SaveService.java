package com.danaojo.ticatch.detail.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.danaojo.ticatch.detail.Repository.SaveRepository;
import com.danaojo.ticatch.detail.domain.Save;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaveService {
	
	@Autowired
	private final SaveRepository saveRepository;
	
	// 찜하기 저장 및 삭제
	@Transactional
	public String performSave(Save save) {
	    // 동일한 user_id와 seq_pfjoin_id 조합이 존재하는지 확인
	    Save existingSave = saveRepository.findByUserIdAndSeqPfjoinId(save.getUser_id(), save.getSeq_pfjoin_id());

	    if (existingSave != null) {
	        // 존재하면 삭제
	        saveRepository.delete(existingSave);
	        return "removed";
	    } else {
	        // 존재하지 않으면 새로 저장
	        saveRepository.save(save);
	        return "added";
	    }
	}
	

}
