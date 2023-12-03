package com.example.springApi.repository;

import com.example.springApi.model.GameList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class IGameListRepository extends JpaRepository<GameList, UUID> {
}
