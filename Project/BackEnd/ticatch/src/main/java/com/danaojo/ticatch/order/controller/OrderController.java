package com.danaojo.ticatch.order.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.danaojo.ticatch.order.Entity.OrderDTO;
import com.danaojo.ticatch.order.Entity.OrderEntity;
import com.danaojo.ticatch.order.Entity.PFJoinDTO;
import com.danaojo.ticatch.order.Entity.SaveDTO;
import com.danaojo.ticatch.order.Entity.SaveEntity;
import com.danaojo.ticatch.order.Entity.UserDTO;
import com.danaojo.ticatch.order.repository.OrderRepository;
import com.danaojo.ticatch.order.repository.PFJoinRepository;
import com.danaojo.ticatch.order.repository.UserRepository;
import com.danaojo.ticatch.order.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor // lombok 에서 지원하는 의존성 주입 따로 안적어도되게 해주는거
public class OrderController {

	private final PFJoinRepository pfjoinRepository;

	private final OrderRepository orderRepository;
	
	private final OrderService orderService;

	private final UserRepository userRepository;

	// 전체 조회
	@GetMapping
	public List<PFJoinDTO> Order() {
		List<PFJoinDTO> order = pfjoinRepository.findAll();

		return order;
	}

	// seqPfjoinId 로 동일한 값만 조회
	@GetMapping("/{seqPfjoinId}")
	public List<PFJoinDTO> getOrderById(@PathVariable("seqPfjoinId") Long seqPfjoinId) {
		List<PFJoinDTO> findBySeqPfJoinId = pfjoinRepository.findBySeqPfjoinId(seqPfjoinId);

		return findBySeqPfJoinId;
	}

	// 날짜 및 회차 바꾸면 이거 실행됨 계속 올바른 값 조회해서 돌려줌
	@PostMapping("/data")
	public ResponseEntity<String> getNewData(@RequestBody OrderDTO seatDTO) {
		String result = orderService.getSoldSeats(seatDTO);

		return ResponseEntity.ok(result);
	}

	// 예매 버튼 눌르면 여기로 옴 테이블에 데이터 저장 하는거임 (토스페이 결제 API)
	@PostMapping("/pay")
	public ResponseEntity<String> createReservation(@RequestBody OrderDTO orderListDTO) {
		String result = orderService.createOrder(orderListDTO);

		return ResponseEntity.ok(result);
	}

	// 메인 페이지 매핑 (뒤에서부터 값 가지고옴 중에 좌석 팔린 순서로 랭킹 할거임)
	@GetMapping("/rank")
	public List<PFJoinDTO> Rank() {
		Sort descSort = Sort.by(Sort.Direction.DESC, "seqPfjoinId");
		List<PFJoinDTO> rank = pfjoinRepository.findAll(descSort);

		// 이거 좌석 하려고 적었던거임 아무것도 없음 (랭킹을 좌석 판매순으로 하고 싶었지만 시간 부족)
//	    String result = orderService.findRank();

		// 5개만 보낼거임 (화면 깨짐;;)
		if (rank.size() > 5) {
			return rank.subList(0, 5);
		}

		return rank; // 데이터가 5개보다 적으면 다 보냄
	}

	// 로그인
	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
		try {
			UserDTO response = orderService.login(userDTO);
			System.out.println("Login successful");
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(400).body(null); // 오류 나면 400 돌려줌
		}
	}

	// 회원가입
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody UserDTO userDTO) {
		return orderService.saveUser(userDTO);
	}
	
	// 마이페이지 유저 정보 보내는거 (이거도 그냥 list 현식으로 보내고 싶네)
	@PostMapping("/userInfo")
	public ResponseEntity<Map<String, String>> userInfo(@RequestBody UserDTO userDTO) {
	    return orderService.userInfo(userDTO);
	}
	
	// 마이페이지 주문 내역 보내는거
	@GetMapping("/orders")
//	ResponseEntity<?>는 Spring Boot에서 HTTP 응답을 나타내는 클래스입니다. 
//	이 클래스는 응답 본문과 상태 코드뿐만 아니라 헤더를 포함하는 HTTP 응답을 표현하는 데 사용됩니다. 
//	<?>는 응답 본문이 어떤 타입이든 상관없다는 의미로, 유연한 응답을 처리할 수 있도록 해줍니다.
//	ResponseEntity<?>는 자동으로 형변환을 해주지 않습니다. 
//	<?>는 단지 해당 응답 본문의 타입이 무엇이든 될 수 있음을 의미하는 제네릭 타입입니다. 
//	즉, ResponseEntity<?>는 응답 본문의 타입을 지정하지 않거나, 
//	여러 타입을 처리할 수 있도록 해주는 용도로 사용됩니다.
	public ResponseEntity<?> OrderList(@RequestParam("userId") String userId) {
	    List<OrderEntity> orderList = orderRepository.findByUserId(userId);
	    
	    if (orderList.isEmpty()) {
	        // 값이 없을 경우, 간단한 메시지를 반환
	        return ResponseEntity.ok("주문 내역이 없습니다.");
	    }
	    // 값이 있을 경우, 데이터를 반환
	    return ResponseEntity.ok(orderList);
	}

	// 회원 정보 수정
	@PostMapping("/updateUserInfo")
	public ResponseEntity<?> UpdateUserInfo(@RequestBody UserDTO userDTO){
		return orderService.updateUserInfo(userDTO);
	}
	
	// 찜 내역 조회해서 정보 가지고 오기
	@PostMapping("/getSaves")
	public ResponseEntity<?> getOrderByUserId(@RequestBody SaveDTO saveDTO) {
        return orderService.getSaveDTO(saveDTO);
    }

	
	
}
