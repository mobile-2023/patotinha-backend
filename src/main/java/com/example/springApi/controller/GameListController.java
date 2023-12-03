package com.example.springApi.controller;

import com.example.springApi.repository.IGameListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/gameList")
public class GameListController {
    @Autowired
    private IGameListRepository gameListRepository;
}
