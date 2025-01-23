package com.danaojo.ticatch.api;

import com.danaojo.ticatch.api.kopis.Kopis;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class ApiTestMain {

	public static void main(String[] args) throws JsonMappingException, JsonProcessingException {

		Kopis kp = new Kopis();
		kp.PfDBList();

	}
}
