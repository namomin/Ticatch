package com.danaojo.ticatch.api.kopis;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.danaojo.ticatch.api.util.KopisUtil;

public class KopisApiController {
	KopisUtil util = new KopisUtil();
	
	public String callConcertList() {
		StringBuilder response = new StringBuilder();
		try {
			String apiUrl = "http://kopis.or.kr/openApi/restful/pblprfr?service=";
			apiUrl += KopisConst.KOPIS_API_KEY;
			
			apiUrl += "&stdate=";
			apiUrl += util.returnNowToday();
			
			// 처음 받을때는 .yml 을 create 로 바꿔서 하는게 좋을듯 그리고 
			// 위 2개랑 아래 2개 주석하고 이거 해보면 더 가지고 와짐 (안되면 key 바꾸기) (날짜를 31일이 최대라서 하고 20250119 끝나고 20250220 을 시작으로 20250220까지 불러옴) 
			// 하면 데이터가 72개 정도 됨
			
			// 이건 오늘 기준 32일 부터 그날의 31일 이후를 저장하기
//			apiUrl += "&stdate=20250124";
//			apiUrl += "&eddate=20250224";
			
			apiUrl += "&eddate=";
			apiUrl += util.returnAfterday();
			
			// row 100이 한도임(?)
			apiUrl += "&cpage=1&rows=100";
			
			// URL API 설정
			URL url = new URL(apiUrl);
			HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setRequestMethod("GET");

			// 응답 코드 확인
			int result = httpURLConnection.getResponseCode();
			InputStream inputStream;

			if (result == 200) {
				System.out.println("200 호출 성공");
				inputStream = httpURLConnection.getInputStream();
			} else {
				inputStream = httpURLConnection.getErrorStream();
			}

			// InputStreamReader를 이용해 데이터를 읽어들임
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
			String line;

			// 데이터를 한 줄씩 읽어 StringBuilder에 저장
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		System.out.println("response" + response);
		return response.toString();
	}

	public String callConcertDetail(String concertId) {
		StringBuilder response = new StringBuilder();
		try {
			// URL API 설정
			URL url = new URL("http://www.kopis.or.kr/openApi/restful/pblprfr/"+concertId+"?service="+KopisConst.KOPIS_API_KEY);
			HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setRequestMethod("GET");

			// 응답 코드 확인
			int result = httpURLConnection.getResponseCode();

			InputStream inputStream;

			if (result == 200) {
				System.out.println("200 호출 성공");
				inputStream = httpURLConnection.getInputStream();
			} else {
				inputStream = httpURLConnection.getErrorStream();
			}

			// InputStreamReader를 이용해 데이터를 읽어들임
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
			String line;

			// 데이터를 한 줄씩 읽어 StringBuilder에 저장
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return response.toString();
	}
	
	public String callFacilityList(String facilityName) {
		StringBuilder response = new StringBuilder();
		
		try {
			// URL API 설정
			URL url = new URL("http://www.kopis.or.kr/openApi/restful/prfplc?service="+ KopisConst.KOPIS_API_KEY +"&cpage=1&rows=10&shprfnmfct="+ facilityName);
			HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setRequestMethod("GET");

			// 응답 코드 확인
			int result = httpURLConnection.getResponseCode();

			InputStream inputStream;

			if (result == 200) {
				System.out.println("200 호출 성공");
				inputStream = httpURLConnection.getInputStream();
			} else {
				inputStream = httpURLConnection.getErrorStream();
			}

			// InputStreamReader를 이용해 데이터를 읽어들임
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
			String line;

			// 데이터를 한 줄씩 읽어 StringBuilder에 저장
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return response.toString();
	}
	
	public String callFacilityDetail (String facilityId) {
		StringBuilder response = new StringBuilder();

		try {
			// URL API 설정
			URL url = new URL("http://www.kopis.or.kr/openApi/restful/prfplc/" + facilityId +"?service=" + KopisConst.KOPIS_API_KEY);
			HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
			httpURLConnection.setRequestMethod("GET");

			// 응답 코드 확인
			int result = httpURLConnection.getResponseCode();

			InputStream inputStream;

			if (result == 200) {
				System.out.println("200 호출 성공");
				inputStream = httpURLConnection.getInputStream();
			} else {
				inputStream = httpURLConnection.getErrorStream();
			}

			// InputStreamReader를 이용해 데이터를 읽어들임
			BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
			String line;

			// 데이터를 한 줄씩 읽어 StringBuilder에 저장
			while ((line = reader.readLine()) != null) {
				response.append(line);
			}

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return response.toString();
	}
}