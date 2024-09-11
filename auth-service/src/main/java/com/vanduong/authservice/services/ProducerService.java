// ProducerService.java
package com.vanduong.authservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProducerService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;



    private final ObjectMapper objectMapper = new ObjectMapper();

    public void sendMessage(String topicName, Object message) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(message);
            kafkaTemplate.send(topicName, jsonMessage);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}