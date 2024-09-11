package com.vanduong.gameservice.services;

import com.vanduong.gameservice.entities.Game;
import com.vanduong.gameservice.repos.GameRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class GameService {

    private final GameRepository repository;

    @Autowired
    public GameService(GameRepository repository) {
        this.repository = repository;
    }

    public Game save(Game game) {
        if(game == null) {
            log.error("Game is null");
            return null;
        }
        Game existingGame = this.repository.findByName(game.getName());
        if(existingGame != null) {
            // If a game with the same name exists, log an error and return null
            log.error("A game with the name " + game.getName() + " already exists");
            return null;
        }
        return this.repository.save(game);
    }

    public Game getById(ObjectId id) {
        return this.repository.findById(id).orElse(null);
    }

    public void deleteById(ObjectId id) {
        this.repository.deleteById(id);
    }

    public Game update(Game game) {
        return this.repository.save(game);
    }

    public List<Game> getAllGame() {
        return this.repository.findAll();
    }

    public int getTotalGame() {
        return this.repository.findAll().size();
    }
}
