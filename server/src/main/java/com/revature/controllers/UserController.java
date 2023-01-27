package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.PostService;
import com.revature.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Testing Method: Adds a User
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(this.userService.save(user));
    }

    // Testing Method: Get All Users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(this.userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        Optional<User> userOptional = userService.findById(id);
        if (!userOptional.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userOptional.get());
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> findByUsername(@PathVariable String username) {
        Optional<User> userOptional = userService.findByUsername(username);
        if(!userOptional.isPresent()){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userOptional.get());
    }
//    @GetMapping("/user")
//    public ResponseEntity<User> findByUsername(@RequestBody String username) {
//        Optional<User> userOptional = userService.findByUsername(username);
//        if(!userOptional.isPresent()){
//            return ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok(userOptional.get());
//    }

}
