package com.example.springApi.controller;

import com.example.springApi.repository.IGameListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/game")
public class GameController {
    @Autowired
    private IGameListRepository gameListRepository;
}
