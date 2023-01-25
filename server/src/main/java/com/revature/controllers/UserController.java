package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.PostService;
import com.revature.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"}, allowCredentials = "true")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    public ResponseEntity<User> upsertUser (@RequestBody User user) {
//
//    }
    @GetMapping(value="/{username}")
    public ResponseEntity<Optional<User>> findByUsername(@PathVariable String username){
        return ResponseEntity.ok(this.userService.findByUsername(username));
    }
}
