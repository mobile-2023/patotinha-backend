package com.example.springApi.controller;

import com.example.springApi.model.User;
import com.example.springApi.repository.IUserRepository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private IUserRepository userService;

    @GetMapping
    public User getUsers() {
        return (User) userService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable UUID id) {
        if (userService.existsById(id)) {
            return userService.findById(id);
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User user) {
        if (userService.existsById(id)) {
            return userService.save(user);
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable UUID id) {
        if (userService.existsById(id)) {
            userService.deleteById(id);
            return ("Usuário deletado");
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

}
