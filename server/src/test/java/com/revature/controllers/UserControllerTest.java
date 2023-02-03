package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.User;
import com.revature.services.PostService;
import com.revature.services.UserService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {


    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private UserService userService;
    //what we use in order to map our objects to JSon strings. For converting our objects to compare to expected
    //response from the servlet
    @Autowired
    private ObjectMapper objectMapper;
    @BeforeEach
    void setup(){
        User testUser1 = new User("test.com", "password", "John", "Doe", "JDoe");

    }


    @Test
    public void createUser_Successful() throws Exception {
        //when method userService.save is given any User object, it will answer with an invocation(calling a method)
        //the invocation then gets the 1st indexed argument (0) of the userService.save() method
        //and then returns that argument
        given(userService.save(any(User.class))).willAnswer((invocation) -> invocation.getArgument(0));
        /*instantiating a new test user to use with the method. In this case, ALL fields must be written out
        even if they are going to have null values that we aren't checking in this particularly method.
        Followers and Following are both null when a user is created, but must be passed along as null
        in the constructor*/
        User testUser2 = new User(2,"test2.com","password2","Bob","Smith","BSmi",null,null,"image2.com");
        //Using this mockMvc perform a post request to the "/users" URI endpoint in controller
        this.mockMvc.perform(post("/users")
                //we want our request to be Application_JSON mediatype for our server to read it
                //used because we are performing a post request
                .contentType(MediaType.APPLICATION_JSON)
                 //We use the object mapper we called earlier and it's method writeValueAsString to actually
                //convert our user object to a JSon string
                .content(objectMapper.writeValueAsString(testUser2)))
                //we are now defining what HTTP response is expected to return from our Http request to the servlet
                //in this case a status of 200 when request is ok
                .andExpect(status().is(200))
                //The $ symbol represents the root element of the JSON document, and the property name following
                // it is used to select the value of that property.
                // In this case, $.id is used to select the value of the id property in the JSON response.
                //We now compare each of our fields in JSon string that is returned with the same field in the test
                //user object. In this case, only comparing the fields that are not null.
                .andExpect(jsonPath("$.id", is(testUser2.getId())))
                .andExpect(jsonPath("$.email", is(testUser2.getEmail())))
                .andExpect(jsonPath("$.password", is(testUser2.getPassword())))
                .andExpect(jsonPath("$.firstName", is(testUser2.getFirstName())))
                .andExpect(jsonPath("$.lastName", is(testUser2.getLastName())))
                .andExpect(jsonPath("$.username", is(testUser2.getUsername())))
                .andExpect(jsonPath("$.imageUrl", is(testUser2.getImageUrl())));
    }


    @Test
    void getAllUsers() throws Exception {
        User testUser1 = new User("test.com", "password", "John", "Doe", "JDoe");
        List<User> userList = new ArrayList<>();
        userList.add(testUser1);

        given(userService.getAll()).willReturn(userList);

        this.mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(userList.size())));
    }

    @Test
    void getUserById() throws Exception {
        User testUser2 = new User(2,"test2.com","password2","Bob","Smith","BSmi",null,null,"image2.com");

        given(userService.findById(2)).willReturn(Optional.of(testUser2));
        this.mockMvc.perform(get("/users/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(testUser2.getId())))
                .andExpect(jsonPath("$.email", is(testUser2.getEmail())))
                .andExpect(jsonPath("$.password", is(testUser2.getPassword())))
                .andExpect(jsonPath("$.firstName", is(testUser2.getFirstName())))
                .andExpect(jsonPath("$.lastName", is(testUser2.getLastName())))
                .andExpect(jsonPath("$.username", is(testUser2.getUsername())))
                .andExpect(jsonPath("$.imageUrl", is(testUser2.getImageUrl())));
    }

    @Test
    void findByUsername() throws Exception {
        User testUser2 = new User(2, "test2.com", "password2", "Bob", "Smith", "BSmi", null, null, "image2.com");

        given(userService.findByUsername("BSmi")).willReturn(Optional.of(testUser2));
        this.mockMvc.perform(get("/users/user/BSmi"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(testUser2.getId())))
                .andExpect(jsonPath("$.email", is(testUser2.getEmail())))
                .andExpect(jsonPath("$.password", is(testUser2.getPassword())))
                .andExpect(jsonPath("$.firstName", is(testUser2.getFirstName())))
                .andExpect(jsonPath("$.lastName", is(testUser2.getLastName())))
                .andExpect(jsonPath("$.username", is(testUser2.getUsername())))
                .andExpect(jsonPath("$.imageUrl", is(testUser2.getImageUrl())));
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
