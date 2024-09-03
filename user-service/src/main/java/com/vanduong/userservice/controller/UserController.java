package com.vanduong.userservice.controller;

import com.vanduong.userservice.entities.User;
import com.vanduong.userservice.entities.value_objects.ResponseTemplateVO;
import com.vanduong.userservice.services.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User save(@RequestBody User user) {
        if(user == null) {
            return null;
        }
        User existingUser = userService.findByUsername(user.getUsername());
        if(existingUser != null) {
            return null;
        }

        return userService.save(user);
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<User> getUserById(@PathVariable ObjectId id) {
        User user = userService.getById(id);
        return ResponseEntity.ok(user);
    }


@GetMapping(value = "/")
public ResponseEntity<List<User>> getAllUser() {
    List<User> users = userService.getAllUser();
    return ResponseEntity.ok(users);
}

    @GetMapping(value = "/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getByUsername(username);
        return ResponseEntity.ok(user);
    }


    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.update(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable ObjectId id) {
        userService.delete(id);
        return ResponseEntity.ok().build();
    }



}
