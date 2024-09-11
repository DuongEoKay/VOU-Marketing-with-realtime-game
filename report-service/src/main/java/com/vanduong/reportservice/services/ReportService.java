package com.vanduong.reportservice.services;


import com.vanduong.reportservice.entities.PlayData;
import com.vanduong.reportservice.repos.PlayDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Set;

@Service
@Slf4j
public class ReportService {

    private final PlayDataRepository repository;

    @Autowired
    public ReportService(PlayDataRepository repository) {
        this.repository = repository;
    }

    public PlayData save(PlayData playData) {
        System.out.println("Save play data "+playData);
        return repository.save(playData);
    }

    public int getPlayByEvent(String id) {
        List<PlayData> playDataList = repository.findByEventId(id);
        return playDataList.size();
    }

    public int getPlayByGame(String id) {
        List<PlayData> playDataList = repository.findByGameId(id);
        return playDataList.size();
    }

    public Map<String, Integer> getUserCountByAllEvents() {
        List<PlayData> playDataList = repository.findAll();
        System.out.println("Play data list " + playDataList);
        return playDataList.stream()
                .filter(playData -> playData.getEventId() != null) // Filter out null event IDs
                .collect(Collectors.groupingBy(
                        PlayData::getEventId,
                        Collectors.collectingAndThen(
                                Collectors.mapping(PlayData::getUserId, Collectors.toSet()),
                                Set::size
                        )
                ));
    }

}
