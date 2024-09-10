package com.vanduong.logservice.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vanduong.logservice.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerListener {

    @Autowired
    private LogService logService;


    @KafkaListener(topics = "${spring.kafka.topic.name}", groupId = "${spring.kafka.group-id}")
    public void listen(String message) {
        try {
            logService.save(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}