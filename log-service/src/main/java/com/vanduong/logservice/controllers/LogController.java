package com.vanduong.logservice.controllers;

import com.vanduong.logservice.entities.Log;
import com.vanduong.logservice.services.LogService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logs")
@Slf4j
public class LogController {

    @Autowired
    private LogService logService;


    @GetMapping()
    public List<Log> getAllLogs() {
        return logService.getAllLogs();
    }
}
