package com.example.springApi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private LocalDate startedAt;
    private LocalDate finishedAt;
    @ManyToMany(mappedBy = "games")
    private List<GameList> gameLists;
    @OneToMany(mappedBy = "game")
    private List<Comment> comments;

}
