package com.example.springApi.controller;

import com.example.springApi.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(value = "/comment")
public class CommentController {
    @Autowired
    private ICommentRepository commentRepository;
}
