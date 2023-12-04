package com.example.springApi.controller;

import com.example.springApi.model.GameList;
import com.example.springApi.repository.IGameListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/gamelist")
public class GameListController {

    @Autowired
    private IGameListRepository gameListRepository;

    @GetMapping
    public ResponseEntity<List<GameList>> getAllGameLists() {
        List<GameList> gameLists = gameListRepository.findAll();
        return new ResponseEntity<>(gameLists, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameList> getGameListById(@PathVariable UUID id) {
        Optional<GameList> optionalGameList = gameListRepository.findById(id);
        return optionalGameList.map(gameList -> new ResponseEntity<>(gameList, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<GameList> createGameList(@RequestBody GameList gameList) {
        GameList createdGameList = gameListRepository.save(gameList);
        return new ResponseEntity<>(createdGameList, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameList> updateGameList(@PathVariable UUID id, @RequestBody GameList gameList) {
        Optional<GameList> optionalGameList = gameListRepository.findById(id);
        if (optionalGameList.isPresent()) {
            gameList.setId(id);
            GameList updatedGameList = gameListRepository.save(gameList);
            return new ResponseEntity<>(updatedGameList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGameList(@PathVariable UUID id) {
        if (gameListRepository.existsById(id)) {
            gameListRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
