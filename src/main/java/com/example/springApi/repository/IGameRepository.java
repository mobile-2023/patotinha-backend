package com.example.springApi.repository;

import com.example.springApi.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IGameRepository extends JpaRepository<Game, UUID> {
}
