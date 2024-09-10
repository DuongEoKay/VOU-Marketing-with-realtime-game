package com.vanduong.reportservice.services;


import com.vanduong.reportservice.entities.PlayData;
import com.vanduong.reportservice.repos.PlayDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ReportService {

    private final PlayDataRepository repository;

    @Autowired
    public ReportService(PlayDataRepository repository) {
        this.repository = repository;
    }

    public PlayData save(PlayData playData) {
        return repository.save(playData);
    }
}
