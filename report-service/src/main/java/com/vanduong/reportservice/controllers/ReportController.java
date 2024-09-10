package com.vanduong.reportservice.controllers;


import com.vanduong.reportservice.services.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/report")
@Slf4j
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/play-by-event/{id}")
    public int getPlayByEventReport( @PathVariable String id) {
        return reportService.getPlayByEvent("id");
    }

@GetMapping("/user-count-by-all-events")
public Map<String, Integer> getUserCountByAllEvents() {
    return reportService.getUserCountByAllEvents();
}

    @GetMapping("/play-by-game/{id}")
    public int getPlayByGameReport( @PathVariable String id) {
        return reportService.getPlayByGame("id");
    }



}
