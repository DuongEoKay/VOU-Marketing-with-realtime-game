package com.vanduong.reportservice.services;


import com.vanduong.reportservice.entities.PlayData;
import com.vanduong.reportservice.repos.PlayDataRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
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
        System.out.println("Save play data " + playData);
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

    public Map<String, Integer> getTotalPlayByGame() {
        List<PlayData> playDataList = repository.findAll();
        System.out.println("Play data list " + playDataList);
        return playDataList.stream()
                .filter(playData -> playData.getGameId() != null) // Filter out null game IDs
                .collect(Collectors.groupingBy(
                        PlayData::getGameId,
                        Collectors.collectingAndThen(
                                Collectors.counting(),
                                Long::intValue
                        )
                ));
    }

    public int getPlayByToday() {
        List<PlayData> playDataList = repository.findAll();
        LocalDate today = LocalDate.now();

        List<PlayData> todayPlayData = playDataList.stream()
                .filter(playData -> {
                    ObjectId objectId = playData.getId();
                    Date date = new Date(objectId.getTimestamp() * 1000L);
                    LocalDate playDate = Instant.ofEpochMilli(date.getTime())
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    return playDate.equals(today);
                })
                .collect(Collectors.toList());

        return todayPlayData.size();
    }


    public int getPlayByLastWeek()
    {
        List<PlayData> playDataList = repository.findAll();
        LocalDate today = LocalDate.now();
        LocalDate lastWeek = today.minusWeeks(1);

        List<PlayData> lastWeekPlayData = playDataList.stream()
                .filter(playData -> {
                    ObjectId objectId = playData.getId();
                    Date date = new Date(objectId.getTimestamp() * 1000L);
                    LocalDate playDate = Instant.ofEpochMilli(date.getTime())
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    return playDate.isAfter(lastWeek) && playDate.isBefore(today);
                })
                .collect(Collectors.toList());

        return lastWeekPlayData.size();
    }

    public int getPlayByLastMonth()
    {
        List<PlayData> playDataList = repository.findAll();
        LocalDate today = LocalDate.now();
        LocalDate lastMonth = today.minusMonths(1);

        List<PlayData> lastMonthPlayData = playDataList.stream()
                .filter(playData -> {
                    ObjectId objectId = playData.getId();
                    Date date = new Date(objectId.getTimestamp() * 1000L);
                    LocalDate playDate = Instant.ofEpochMilli(date.getTime())
                            .atZone(ZoneId.systemDefault())
                            .toLocalDate();
                    return playDate.isAfter(lastMonth) && playDate.isBefore(today);
                })
                .collect(Collectors.toList());

        return lastMonthPlayData.size();
    }
}


