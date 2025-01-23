package com.danaojo.ticatch.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danaojo.ticatch.api.kopis.Kopis;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public String test() {
    	Kopis kopis = new Kopis();
    	String data = kopis.callConcertList();
    	System.out.println("응답");

        return data;
    }

}