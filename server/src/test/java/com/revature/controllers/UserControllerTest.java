package com.revature.controllers;

import com.revature.models.User;
import com.revature.services.PostService;
import com.revature.services.UserService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static java.util.Arrays.asList;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.when;

;

@WebMvcTest(controllers = UserController.class)
class UserControllerTest {
    @MockBean
    private UserService userService;
    @MockBean
    private PostService postService;
    @Autowired
    private MockMvc mockMvc;


    @Test
    void createUser() throws Exception {
        User testUser = new User("test.com","password","John","Doe","JDoe");
        when(userService.save(testUser)).thenReturn(testUser);

        mockMvc.perform(post("/users"))
                .andExpect(status().is(200))
                //.andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.size()", Matchers.is(1)))
                //.andExpect(jsonPath("$[0].id", Matchers.is(1)))
                .andExpect(jsonPath("$[0].email", Matchers.is("test.com")))
                .andExpect(jsonPath("$[0].password", Matchers.is("password")))
                .andExpect(jsonPath("$[0].firstName", Matchers.is("John")))
                .andExpect(jsonPath("$[0].lastName", Matchers.is("Doe")))
                .andExpect(jsonPath("$[0].username", Matchers.is("JDoe")));
                //.andExpect(jsonPath("$[0].followers", Matchers.is(null)))
                //.andExpect(jsonPath("$[0].following", Matchers.is(null)))
                //.andExpect(jsonPath("$[0].imageUrl", Matchers.is("imageUrl")));

    }

    @Test
    void getAllUsers() {
    }

    @Test
    void getUserById() {
    }

    @Test
    void findByUsername() {
    }

    @Test
    void editPassword() {
    }

    @Test
    void editEmail() {
    }

    @Test
    void editUsername() {
    }

    @Test
    void updateImageUrl() {
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