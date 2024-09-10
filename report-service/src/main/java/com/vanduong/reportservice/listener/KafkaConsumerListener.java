package com.vanduong.reportservice.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vanduong.reportservice.entities.PlayData;
import com.vanduong.reportservice.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumerListener {

    @Autowired
    private ReportService reportService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${spring.kafka.topic.name}", groupId = "${spring.kafka.group-id}")
    public void listen(String message) {
        try {
            PlayData playData = objectMapper.readValue(message, PlayData.class);
            reportService.save(playData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}