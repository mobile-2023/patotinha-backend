package com.example.springApi.controller;

import com.example.springApi.model.Comment;
import com.example.springApi.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequestMapping(value = "/comment")
public class CommentController {
    @Autowired
    private ICommentRepository commentRepository;

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return new ResponseEntity<>(comments, HttpStatus.OK); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable UUID id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        return optionalComment.map(comment -> new ResponseEntity<>(comment, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentRepository.save(comment);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable UUID id, @RequestBody Comment comment) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            comment.setId(id);
            Comment updateComment = commentRepository.save(comment);
            return new ResponseEntity<>(updateComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable UUID id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
