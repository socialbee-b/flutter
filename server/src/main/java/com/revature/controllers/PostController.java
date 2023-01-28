package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import com.revature.repositories.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.annotations.Authorized;
import com.revature.models.Post;
import com.revature.services.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class PostController {

	private final PostService postService;
    private final PostRepository postRepository;

    public PostController(PostService postService,
                          PostRepository postRepository) {
        this.postService = postService;
        this.postRepository = postRepository;
    }
    

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
    	return ResponseEntity.ok(this.postService.getAll());
    }
    
    @Authorized
    @PutMapping
    public ResponseEntity<Post> upsertPost(@RequestBody Post post) {
    	return ResponseEntity.ok(this.postService.upsert(post));
    }

    @GetMapping("/feed")
    public ResponseEntity<List<Post>> getAllTopPosts() {
        return ResponseEntity.ok(this.postService.getAllTop());
    }


    // Testing Method: Create/Add A Post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(this.postService.upsert(post));
    }

    // Testing Method: Get a Post By Id
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable int id) {
        Optional<Post> postOptional = postService.findById(id);

        if (!postOptional.isPresent()){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(postOptional.get());
    }
}
