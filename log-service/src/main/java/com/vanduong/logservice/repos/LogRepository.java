package com.vanduong.logservice.repos;

import com.vanduong.logservice.entities.Log;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LogRepository extends MongoRepository<Log, ObjectId> {


}
