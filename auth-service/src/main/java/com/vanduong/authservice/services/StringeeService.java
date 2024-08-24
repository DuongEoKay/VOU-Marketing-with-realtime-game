package com.vanduong.authservice.services;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class StringeeService {

    private String apiKeySid;
    private String apiKeySecret;
    private String brandName;

    public StringeeService(String apiKeySid, String apiKeySecret, String brandName) {
        this.apiKeySid = apiKeySid;
        this.apiKeySecret = apiKeySecret;
        this.brandName = brandName;
    }

    public String generateJwt() {
        long nowMillis = System.currentTimeMillis() / 1000;
        long expMillis = nowMillis + 3600;

        Map<String, Object> header = new HashMap<>();
        header.put("cty", "stringee-api;v=1");

        // Convert apiKeySecret to a SecretKey
        SecretKeySpec key = new SecretKeySpec(apiKeySecret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());

        String jwt = Jwts.builder()
                .setHeader(header)
                .claim("jti", apiKeySid + "-" + nowMillis)
                .claim("iss", apiKeySid)
                .claim("exp", expMillis)
                .claim("rest_api", 1)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return jwt;
    }

public boolean callOtp(String phoneNumber, String otp) {
    String jwt = generateJwt();

    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.set("X-STRINGEE-AUTH", jwt);
    headers.set("Content-Type", "application/json");

    Map<String, String> from = new HashMap<>();
    from.put("type", "external");
    from.put("number", "842471007730");
    from.put("alias", "STRINGEE_NUMBER");

    Map<String, String> to = new HashMap<>();
    to.put("type", "external");
    //to.put("number", phoneNumber);
    to.put("number", phoneNumber);
    //spam em kiet
    to.put("alias", "TO_NUMBER");

    List<Map<String, String>> toList = new ArrayList<>();
    toList.add(to);

    Map<String, String> action = new HashMap<>();
    action.put("action", "talk");
    action.put("text", "Helle cu otp của cu là " + otp );


    List<Map<String, String>> actionsList = new ArrayList<>();
    actionsList.add(action);

    Map<String, Object> body = new HashMap<>();
    body.put("from", from);
    body.put("to", toList);
    body.put("answer_url", "https://example.com/answerurl");
    body.put("actions", actionsList);

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

    try {
        ResponseEntity<String> response = restTemplate.exchange("https://api.stringee.com/v1/call2/callout", HttpMethod.POST, entity, String.class);
        System.out.println("Response status code: " + response.getStatusCode());
        System.out.println("Response body: " + response.getBody());
        return true;
    } catch (Exception e) {
        System.out.println("Error making call: " + e.getMessage());
        e.printStackTrace();
        return false;

    }
}

}

