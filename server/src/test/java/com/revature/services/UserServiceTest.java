package com.revature.services;

import com.revature.models.User;
import com.revature.repositories.UserRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PostService postService;


    @Test
    void findByCredentialsSuccessTest() {
        UserService userService = new UserService(userRepository,postService);
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        when(userRepository.findByEmailAndPassword("test.com", "password")).thenReturn(Optional.of(mockUser));
        Optional<User> resultUser = userService.findByCredentials("test.com","password");
        assertEquals(resultUser.get().getEmail(),mockUser.getEmail());
        assertEquals(resultUser.get().getPassword(),mockUser.getPassword());

    }


    @Test
    void findByIdSuccessTest() {
        UserService userService = new UserService(userRepository,postService);
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        mockUser.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(mockUser));
        Optional<User> resultUser = userService.findById(1);
        assertEquals(resultUser.get().getId(), mockUser.getId());
    }
}