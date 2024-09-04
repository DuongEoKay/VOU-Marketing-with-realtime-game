package com.vanduong.authservice.services;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisService {

    private final StringRedisTemplate redisTemplate;
    private final ValueOperations<String, String> valueOperations;


    public RedisService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.valueOperations = redisTemplate.opsForValue();
    }

    public void setOtp(String username, String otp) {
        valueOperations.set(username, otp, 3, TimeUnit.MINUTES);
    }

    public String getOtp(String username) {
        return valueOperations.get(username);
    }

    public void setRegisterOtp(String phone, String otp) {
        valueOperations.set(phone, otp, 3, TimeUnit.MINUTES);
    }

    public String getRegisterOtp(String phone) {
        return valueOperations.get(phone);
    }
}