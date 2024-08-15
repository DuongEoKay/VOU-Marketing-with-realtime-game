package com.vanduong.gameservice.services;

import com.vanduong.gameservice.entities.Game;
import com.vanduong.gameservice.repos.GameRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GameService {

    private final GameRepository repository;

    @Autowired
    public GameService(GameRepository repository) {
        this.repository = repository;
    }

    public Game save(Game game) {
        return this.repository.save(game);
    }

    public Game getById(long id) {
        return this.repository.findById(id)
                .orElse(null);
    }

    public void deleteById(long id) {
        this.repository.deleteById(id);
    }

    public Game update(Game game) {
        return this.repository.save(game);
    }
}
