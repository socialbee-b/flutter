package com.revature.services;

import com.revature.repositories.PostRepository;
import com.revature.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PostService postService;
    @Test
    void findByCredentials() {
        UserService userService = new UserService(userRepository,postService);
    }

    @Test
    void register() {
    }
}