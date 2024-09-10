package com.vanduong.reportservice.repos;


import com.vanduong.reportservice.entities.PlayData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PlayDataRepository extends MongoRepository<PlayData, ObjectId> {


}
