package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import com.revature.repositories.PostRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.annotations.Authorized;
import com.revature.models.Post;
import com.revature.services.PostService;

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

        if (!postOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(postOptional.get());
    }

    @PostMapping("editPost/{id}")
    public ResponseEntity<Post> editPost(@PathVariable int id, @RequestBody String editString) {
        Optional<Post> oldPost = postService.findById(id);
        Post newPost = oldPost.get();
        newPost.setText(editString);
        return ResponseEntity.ok(this.postService.upsert(newPost));
    }
    @PutMapping("/{id}/like")
    public ResponseEntity<Post> addPostLikes(@PathVariable int id) {
        Optional<Post> postOptional = postService.findById(id);
        if(!postOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        Post post = postOptional.get();
        post.setLikes(post.getLikes() + 1);
        return ResponseEntity.ok(postService.upsert(post));
    }

    @PutMapping("/{id}/unlike")
    public ResponseEntity<Post> removePostLikes(@PathVariable int id) {
        Optional<Post> postOptional = postService.findById(id);
        if(!postOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        Post post = postOptional.get();
        post.setLikes(post.getLikes() - 1);
        return ResponseEntity.ok(postService.upsert(post));

    }
}
