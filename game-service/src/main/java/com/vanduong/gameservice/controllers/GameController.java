package com.vanduong.gameservice.controllers;

import com.vanduong.gameservice.entities.Game;
import com.vanduong.gameservice.services.GameService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@Slf4j
public class GameController {

    @Autowired
    private GameService gameService;


    @PostMapping
    public Game save(@RequestBody Game game) {
        return gameService.save(game);
    }

    @GetMapping("/{id}")
    public Game getById(@PathVariable long id) {
        return gameService.getById(id);
    }

    @GetMapping("/")
    public List<Game> getAllGame() {
        return gameService.getAllGame();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable long id) {
        gameService.deleteById(id);
    }

    @PutMapping
    public Game update(@RequestBody Game game) {
        return gameService.update(game);
    }

}
