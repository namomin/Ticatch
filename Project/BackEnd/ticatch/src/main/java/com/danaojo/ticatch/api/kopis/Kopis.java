package com.danaojo.ticatch.api.kopis;

import java.util.ArrayList;
import java.util.List;

import com.danaojo.ticatch.api.kopis.dto.FacilityDetailDTO;
import com.danaojo.ticatch.api.kopis.dto.FacilityListDTO;
import com.danaojo.ticatch.api.kopis.dto.PFJoinDTO;
import com.danaojo.ticatch.api.kopis.dto.PerformDetailDTO;
import com.danaojo.ticatch.api.kopis.dto.PerformListDTO;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class Kopis extends KopisApiController {
	public List<PFJoinDTO> PfDBList() {
    
		 // 최종 리턴 리스트
	    List<PFJoinDTO> resultList = new ArrayList<>();
	    
		int suc = 0; 
		int idFail = 0;
		int listFail = 0;
		
	    try {
	        // 공연 목록 조회 및 매핑
	        String performStr = callConcertList();
	        List<PerformListDTO> performList = mappingPerformList(performStr);
	        System.out.println("공연 목록 개수: " + performList.size());

	        // 공연 목록 순회
	        for (PerformListDTO perform : performList) {
	            try {
	                // 공연 ID로 세부 공연 정보 조회 및 매핑
	                String pfDetailStr = callConcertDetail(perform.getPl_id());
	                List<PerformDetailDTO> pfDetailList = mappingPerformDetail(pfDetailStr);

	                for (PerformDetailDTO pfDetail : pfDetailList) {
	                    // 공연장 상세 정보 조회 및 매핑
	                    String fcDetailStr = callFacilityDetail(pfDetail.getPd_facility_id());
	                    List<FacilityDetailDTO> fcDetailList = mappingFacilityDetail(fcDetailStr);

	                    for (FacilityDetailDTO fcDetail : fcDetailList) {
	                        // 공연장 이름으로 추가 정보 조회
	                        String facilityStr = callFacilityList(fcDetail.getFd_fcltynm());
	                        List<FacilityListDTO> facilityList = mappingFacilityList(facilityStr);
	                        suc++;

	                        // 최종 데이터 매핑
	                        for (FacilityListDTO facility : facilityList) {
	                        	PFJoinDTO resultStr = new PFJoinDTO();
	                        	
	                        	resultStr.setPf_id(perform.getPl_id());
	                        	resultStr.setPf_title(perform.getPl_title());
	                        	resultStr.setPf_poster(perform.getPl_poster());
	                        	resultStr.setPf_start_date(perform.getPl_start_date());
	                        	resultStr.setPf_end_date(perform.getPl_end_date());
	                        	resultStr.setPf_location(perform.getPl_location());
	                        	resultStr.setPf_hall_name(pfDetail.getPd_location());
	                        	resultStr.setPf_cast(pfDetail.getPd_cast());
	                        	resultStr.setPf_runtime(pfDetail.getPd_runtime());
	                        	resultStr.setPf_seatprice(pfDetail.getPd_seatprice());
	                        	resultStr.setPf_time(pfDetail.getPd_time());
	                        	resultStr.setPf_genre(pfDetail.getPd_genre());
	                        	resultStr.setPf_child(pfDetail.getPd_child());

	                        	// 임시로 null처리
//	                        	resultStr.setPf_img(null);
	                        	List<String> imageUrls = pfDetail.getPd_img(); // 여러 이미지 URL을 리스트로 가져온다고 가정
	                        		if (imageUrls != null && !imageUrls.isEmpty()) {
	                        			// 첫번째 이미지 URL만 저장
	                        			resultStr.setPf_img(imageUrls.get(0)); // 첫번쨰 이미지인 0번쨰 인덱스만 저장함
	                        			// for 문으로 있는거 다 가지고와서 , 로 붙이고 front 에서 map 으로 사용하면 되겠지만 시간이 없음
	                        		}

	                        	resultStr.setPf_time(pfDetail.getPd_time());
	                        	resultStr.setPf_location_sido(facility.getFl_sidonm());
	                        	resultStr.setPf_location_gun(facility.getFl_gugunnm());
	                        	resultStr.setPf_phone(fcDetail.getFd_phone());
	                        	resultStr.setPf_addr(fcDetail.getFd_addr());
	                        	resultStr.setPf_la(fcDetail.getFd_la());
	                        	resultStr.setPf_lo(fcDetail.getFd_lo());
	                        	
	                        	resultList.add(resultStr);
	                        }
	                    }
	                }
	            } catch (Exception e) {
	            	idFail++;
	                System.err.println("Error processing performance ID: " + perform.getPl_id());
	                e.printStackTrace();
	            }
	        }
	    } catch (Exception e) {
	    	listFail++;
	        System.err.println("Error processing performance list");
	        e.printStackTrace();
	    }

	    System.out.println("성공 : " + suc + " ID 실패 : " + idFail + " List실패 : " + listFail);
	    System.out.println("총 처리된 데이터: " + resultList.size());
	    return resultList;
	}
	
	public List<FacilityListDTO> mappingFacilityList(String facilityStr) throws JsonMappingException, JsonProcessingException {
		XmlMapper xmlMapper = new XmlMapper();
		
		// xmlMapper 설정, 불필요한거 스킵
		xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		
		List<FacilityListDTO> fList = new ArrayList<>();
		
		fList = xmlMapper.readValue(facilityStr, new TypeReference<List<FacilityListDTO>>() {
		});
		
		// 테스트 출력
//		for(FacilityListDTO f : fList) {
//			System.out.println("공연시설 ID : " + f.getFl_id());
//			System.out.println("공연시설명 : " + f.getFl_name());
//			System.out.println("공연장 수 : " + f.getFl_facilityCnt());
//			System.out.println("시설특성 : " + f.getFl_fcltychartr());
//			System.out.println("지역(시도) : " + f.getFl_sidonm());
//			System.out.println("지역(구군) : " + f.getFl_gugunnm());
//			System.out.println("개관연도 : " + f.getFl_opende());
//		}
		return fList;
	}

	public List<FacilityDetailDTO> mappingFacilityDetail(String fcDetailStr) throws JsonMappingException, JsonProcessingException {
		XmlMapper xmlMapper = new XmlMapper();

		// xmlMapper 설정, 불필요한거 스킵
		xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		
		List<FacilityDetailDTO> fList = new ArrayList<>();
		
		fList = xmlMapper.readValue(fcDetailStr, new TypeReference<List<FacilityDetailDTO>>() {
		});
		
		// 테스트 출력
//		for(FacilityDetailDTO f : fList) {
//			System.out.println("-- 공연 상세 리스트");
//			System.out.println("공연시설 ID : " + f.getFd_name());
//			System.out.println("공연시설명 : " + f.getFd_fcltynm());
//			System.out.println("개관연도 : " + f.getFd_opende());
//			System.out.println("시설특성 : " + f.getFd_fcltychartr());
//			System.out.println("객석 수 : " + f.getFd_seatscale());
//			System.out.println("공연장 수 : " + f.getFd_mt13cnt());
//			System.out.println("전화번호 : " + f.getFd_phone());
//			System.out.println("홈페이지 : " + f.getFd_relateurl());
//			System.out.println("주소 : " + f.getFd_addr());
//			System.out.println("위도 : " + f.getFd_la());
//			System.out.println("경도 : " + f.getFd_lo());
//			System.out.println("레스토랑 : " + f.getFd_restaurant());
//			System.out.println("카페 : " + f.getFd_cafe());
//			System.out.println("편의점 : " + f.getFd_store());
//			System.out.println("놀이방 : " + f.getFd_nolibang());
//			System.out.println("수유실 : " + f.getFd_suyu());
//			System.out.println("장애시설-주차장 : " + f.getFd_parkbarrier());
//			System.out.println("장애시설-화장실 : " + f.getFd_restbarrier());
//			System.out.println("장애시설-경사로 : " + f.getFd_runwbarrier());
//			System.out.println("장애시설-엘리베이터 : " + f.getFd_elevbarrier());
//			System.out.println("주차시설 : " + f.getFd_parkinglot());
//			System.out.println();
//			
//			List<FacilityTypeDTO> ft = f.getFd_facilitytype();
//			for(FacilityTypeDTO ff : ft) {
//				System.out.println("-- 공연장 내부 상세");
//				System.out.println("공연이름 : " + ff.getFt_name());
//				System.out.println("공연장 ID : " + ff.getFt_id());
//				System.out.println("공연장 좌석수 : " + ff.getFt_seatscale());
//				System.out.println("ft_stageorchat : " + ff.getFt_stageorchat());
//				System.out.println("ft_stagepracat : " + ff.getFt_stagepracat());
//				System.out.println("ft_stagedresat : " + ff.getFt_stagedresat());
//				System.out.println("ft_stageoutdrat : " + ff.getFt_stageoutdrat());
//				System.out.println("ft_disabledseatscale : " + ff.getFt_disabledseatscale());
//				System.out.println("ft_stagearea : " + ff.getFt_stagearea());
//				System.out.println("------------------------------------");
//				System.out.println();
//			}
//		}
		return fList;
	}

	public List<PerformDetailDTO> mappingPerformDetail(String pfDetailStr)
			throws JsonMappingException, JsonProcessingException {

		XmlMapper xmlMapper = new XmlMapper();

		// xmlMapper 설정, 불필요한거 스킵
		xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);


		List<PerformDetailDTO> pList = new ArrayList<>();

		pList = xmlMapper.readValue(pfDetailStr, new TypeReference<List<PerformDetailDTO>>() {
		});

		// 테스트 출력
//		for (PerformDetailDTO c : pList) {
//			System.out.println("공연 ID : " + c.getPd_id());
//			System.out.println("공연시설 ID : " + c.getPd_facility_id());
//			System.out.println("공연명 : " + c.getPd_title());
//			System.out.println("공연시작일 : " + c.getPd_start());
//			System.out.println("공연종료일 : " + c.getPd_end());
//			System.out.println("공연시설명 : " + c.getPd_location());
//			System.out.println("출연진 : " + c.getPd_cast());
//			System.out.println("감독 및 연출 : " + c.getPd_crew());
//			System.out.println("상영 시간 : " + c.getPd_runtime());
//			System.out.println("공연 관람 연령 : " + c.getPd_age());
//			System.out.println("제작사 : " + c.getPd_production());
//			System.out.println("기획사 : " + c.getPd_agency());
//			System.out.println("주최 : " + c.getPd_host());
//			System.out.println("주관 : " + c.getPd_subject());
//			System.out.println("좌석가격 : " + c.getPd_seatprice());
//			System.out.println("포스터 이미지 경로 : " + c.getPd_poster());
//			System.out.println("줄거리 : " + c.getPd_story());
//			System.out.println("장르 : " + c.getPd_genre());
//			System.out.println("공연 상태 : " + c.getPd_state());
//			System.out.println("오픈런 : " + c.getPd_openturn());
//			System.out.println("현장구매 : " + c.getPd_visit());
//			System.out.println("어린아이 허용 : " + c.getPd_child());
//			System.out.println("대학로 : " + c.getPd_daehakro());
//			System.out.println("축제 : " + c.getPd_festival());
//			System.out.println("뮤지컬 라이센스 : " + c.getPd_musicallicense());
//			System.out.println("뮤지컬 창작 : " + c.getPd_musicalcreate());
//			System.out.println("최종 수정일 : " + c.getPd_updatedate());
//			System.out.println("공연 시간 : " + c.getPd_runtime());
//			System.out.println("-----------------------------------");
//			System.out.println();
//		}
    
		return pList;
	}

	public List<PerformListDTO> mappingPerformList(String performStr)
			throws JsonMappingException, JsonProcessingException {
		XmlMapper xmlMapper = new XmlMapper();
		// xmlMapper 설정, 불필요한거 스킵
		xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

		List<PerformListDTO> pList = new ArrayList<>();

		pList = xmlMapper.readValue(performStr, new TypeReference<List<PerformListDTO>>() {
		});

		// 테스트 출력
//		for (PerformListDTO pDto : pList) {
//			System.out.println("공연ID : " + pDto.getPl_id());
//			System.out.println("공연명 : " + pDto.getPl_hall_name());
//			System.out.println("공연시작일 : " + pDto.getPl_start_date());
//			System.out.println("공연종료일 : " + pDto.getPl_end_date());
//			System.out.println("공연시설명 : " + pDto.getPl_hall_name());
//			System.out.println("포스터이미지 : " + pDto.getPl_poster());
//			System.out.println("공연지역 : " + pDto.getPl_location());
//			System.out.println("공연장르 : " + pDto.getPl_genre());
//			System.out.println("공연상태코드 : " + pDto.getPl_state());
//			System.out.println("--------------------------------");
//			System.out.println();
//		}
		return pList;
	}
}