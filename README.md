# :pushpin: Ticatch
'티케치' 공연 정보 조회 및 예매 사이트.
`BackEnd/FrontEnd` 폴더 : 작업한 부분만 정리해 놓은 폴더. </br>
`Project` 폴더 : 프로젝트 전체 폴더.

- [FrontEnd code 보기](#4-기능) </br>
- [BackEnd code 보기](#backend-code)

</br>

## 1. 제작 기간 & 참여 인원
- 2024.11.04 ~ 2024.12.23
- 2인

</br>

## 2. 사용 기술
#### `Back-end`
- Java 17 
- Spring Boot (3.3.5)
- JPA
- JPQL
- Oracle DB

#### `Front-end`
- React
- HTML / CSS3 / JS
 
</br>

## 3. ERD 설계
![ERD](https://github.com/user-attachments/assets/255b9f9c-c2a8-4eaa-8a7c-d4e0371b0566)

</br>

## 4. 기능
#### 로그인 페이지
- 로그인/로그아웃/회원가입

#### :pushpin: 상세 페이지(FrontEnd code로 이동)
- [공연 정보 조회](https://github.com/namomin/Ticatch/blob/main/FrontEnd/Perform_Info/Info.jsx)
- [찜하기](https://github.com/namomin/Ticatch/blob/main/FrontEnd/Save/SaveBtn.jsx)
- [날짜/회차 선택 및 잔여 좌석 조회](https://github.com/namomin/Ticatch/tree/main/FrontEnd/Reserve)
- [리뷰/기대평 작성, 수정, 삭제](https://github.com/namomin/Ticatch/tree/main/FrontEnd/Review%20Expectation)
- [네이버 지도에 공연장 위치 핑 띄우기](https://github.com/namomin/Ticatch/tree/main/FrontEnd/Map)


#### 예매
- 날짜/회차 선택
- 좌석 선택 / 예매 된 좌석 표시
- 토스/카카오페이 결제

#### 마이 페이지
- 회원정보 수정
- 예매내역 조회
- 찜내역 조회

</br>

## 5. Back-end 흐름
![흐름](https://github.com/user-attachments/assets/1623c5d5-3554-43d2-96e2-2d4f10f69f49)

## BackEnd Code
- #### [Controller 코드](https://github.com/namomin/Ticatch/blob/main/Project/BackEnd/ticatch/src/main/java/com/danaojo/ticatch/detail/controller/DetailController.java)
- #### [Service 폴더](https://github.com/namomin/Ticatch/tree/main/Project/BackEnd/ticatch/src/main/java/com/danaojo/ticatch/detail/service)
- #### [Repository 폴더](https://github.com/namomin/Ticatch/tree/main/Project/BackEnd/ticatch/src/main/java/com/danaojo/ticatch/detail/Repository)

</br>
