package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByCredentials(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()) {
            //User extractedUser = user.get();
            //return Optional.of(extractedUser);
            return user; // not sure if this is right
        }
        return Optional.empty(); // definitely not sure if this is right
    }
}
