package com.revature.services;

import com.revature.models.Post;
import com.revature.models.PostType;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
    void findByCredentialsSuccessFail() {
        UserService userService = new UserService(userRepository,postService);
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        when(userRepository.findByEmailAndPassword("test.com", "password")).thenReturn(Optional.of(mockUser));
        Optional<User> resultUser = userService.findByCredentials("test.com","password");
        assertNotEquals("com.test",mockUser.getEmail());
        assertNotEquals("drowssap",mockUser.getPassword());
        assertNotEquals(resultUser.get().getEmail(),"com.test");
        assertNotEquals(resultUser.get().getPassword(),"drowssap");

    }


    @Test
    void findByIdTestSuccess() {
        UserService userService = new UserService(userRepository,postService);
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        mockUser.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(mockUser));
        Optional<User> resultUser = userService.findById(1);
        assertEquals(resultUser.get().getId(), mockUser.getId());
    }

    @Test
    void findByIdTestFail() {
        UserService userService = new UserService(userRepository,postService);
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        mockUser.setId(1);
        when(userRepository.findById(1)).thenReturn(Optional.of(mockUser));
        Optional<User> resultUser = userService.findById(1);
        assertNotEquals(resultUser.get().getId(), 100);
        assertNotEquals(100, mockUser.getId());
    }



    @Test
    void saveTestSuccess() {
        UserService userService = new UserService(userRepository,postService);
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        when(userRepository.save(mockUser)).thenReturn(mockUser);
        User resultUser = userService.save(mockUser);
        verify(userRepository, times(1)).save(mockUser);
        assertEquals(mockUser, resultUser);
    }
    @Test
    void saveTestFail() {
        UserService userService = new UserService(userRepository,postService);
        //mockUser object intentionally has a null username field in order to fail test and trigger exception
        User mockUser = new User("test.com","password","John","Doe", null);
        //using Exceptions for failing methods that don't return an object when succeeding
        when(userRepository.save(mockUser)).thenThrow(new IllegalArgumentException());
        /*assertThrows takes in 2 arguments(exceptions) and compares the first exception to the second
        using a lambda function that contains the code that should throw the exception*/
        assertThrows(IllegalArgumentException.class, () -> userService.save(mockUser));
        /*verify method is used to check if the method was executed. Verify testing the save method of userRepository
        one time and takes in mockUser as the argument of save
        */
        verify(userRepository, times(1)).save(mockUser);
    }

    @Test
    void getAllUsersTestSuccess() {
        //instantiating a UserService object to use it's methods
        UserService userService = new UserService(userRepository,postService);
        //creating test user
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        //creating empty ArrayList
        List<User> expectedList = new ArrayList<User>();
        //adding mockUser to the list of users
        expectedList.add(mockUser);
        //testing Repository method, when findAll is mocked it should return our expectedList
        when(userRepository.findAll()).thenReturn(expectedList);
        //using the user Service method and saving the result as an ArrayList
        List<User> resultList = userService.getAll();
        //using asserEquals to compare the expected size (1) to the actual result size
        assertEquals(1, resultList.size());
        //using assertEquals to compare the mockUser from our expectedList to the 1st user returned from
        //our actual result list
        assertEquals(expectedList.get(0), resultList.get(0));
    }
    @Test
    void getAllUsersTestFail() {
        //instantiating a UserService object to use it's methods
        UserService userService = new UserService(userRepository,postService);
        //creating test user
        User mockUser = new User("test.com","password","John","Doe", "JDoe");
        //creating empty ArrayList
        List<User> expectedList = new ArrayList<User>();
        //adding mockUser to the list of users
        expectedList.add(mockUser);
        //testing Repository method, when findAll is mocked it should return our expectedList
        when(userRepository.findAll()).thenReturn(expectedList);
        //using the user Service method and saving the result as an ArrayList
        List<User> resultList = userService.getAll();
        //using asserEquals to compare the expected size (1000) to the actual result size
        assertNotEquals(1000, resultList.size());
        assertNotEquals(expectedList.size(), 1000);
        //using assertEquals to compare the mockUser from our expectedList to the 1st user returned from
        //our actual result list
        assertNotEquals(null, resultList.get(0));
        assertNotEquals(expectedList.get(0), null);
    }



    @Test
    void findByUsername() {
    }

    @Test
    void findByEmail() {
    }

    @Test
    void addFollower() {
    }

    @Test
    void removeFollower() {
    }

    @Test
    void getFeedForUser() {
    }
}