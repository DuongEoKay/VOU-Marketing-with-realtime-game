package com.vanduong.logservice.services;

import com.vanduong.logservice.entities.Log;
import com.vanduong.logservice.repos.LogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class LogService {

    private final LogRepository repository;

    @Autowired
    public LogService(LogRepository repository) {
        this.repository = repository;
    }

    public void save(String message) {
        Log log = new Log();
        log.setContent(message);
        repository.save(log);
    }

    public List<Log> getAllLogs() {
        return repository.findAll();
    }
}
