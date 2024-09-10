package com.vanduong.reportservice.repos;


import com.vanduong.reportservice.entities.PlayData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PlayDataRepository extends MongoRepository<PlayData, ObjectId> {
    List<PlayData> findByEventId(String id);
    List<PlayData> findByGameId(String id);


}
