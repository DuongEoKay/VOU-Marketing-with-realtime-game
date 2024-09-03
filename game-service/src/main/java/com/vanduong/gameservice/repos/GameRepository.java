package com.vanduong.gameservice.repos;

import com.vanduong.gameservice.entities.Game;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface GameRepository extends MongoRepository<Game, Long> {

    Game findByName(String name);
}
