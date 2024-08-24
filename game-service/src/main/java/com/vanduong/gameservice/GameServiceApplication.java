package com.vanduong.gameservice;

import com.vanduong.gameservice.repos.GameRepository;
import com.vanduong.gameservice.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GameServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GameServiceApplication.class, args);

	}

}
