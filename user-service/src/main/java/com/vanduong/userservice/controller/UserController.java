package com.vanduong.userservice.controller;

import com.vanduong.userservice.entities.*;
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
        if (user == null) {
            return null;
        }
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser != null) {
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

    @GetMapping(value = "/is-phone-exist/{phone}")
    public ResponseEntity<Boolean> isPhoneExist(@PathVariable String phone) {
        boolean isPhoneExist = userService.isPhoneExist(phone);
        return ResponseEntity.ok(isPhoneExist);
    }

    @GetMapping(value = "/voucher/{id}")
    public ResponseEntity<VoucherResponse> getVoucherByUserId(@PathVariable ObjectId id) {
        return userService.getVoucherByUserId(id);
    }

    @PostMapping(value = "/voucher/{id}")
    public ResponseEntity<VoucherResponse> addVoucherToUser(@PathVariable ObjectId id, @RequestBody VoucherRequest voucherRequest) {
        return userService.addVoucherToUser(id, voucherRequest);
    }

    @PostMapping(value = "/remove-voucher/{id}")
    public ResponseEntity<VoucherResponse> removeVoucherFromUser(@PathVariable ObjectId id, @RequestBody VoucherRequest voucherRequest) {
        return userService.removeVoucherFromUser(id, voucherRequest);
    }

    @PostMapping(value = "/add-point")
    public ResponseEntity<BasicResponse> addPointToUser( @RequestBody AddPointRequest addPointRequest) {
        return userService.addPointToUser(addPointRequest);
    }

    @PostMapping(value = "/send-voucher/{id}")
    public ResponseEntity<VoucherResponse> sendVoucherToUser(@PathVariable ObjectId id, @RequestBody VoucherRequest voucherRequest) {
        return userService.sendVoucherToUser(id, voucherRequest);
    }

    @GetMapping(value = "/total-customer")
    public ResponseEntity<TotalResponse> getTotalCustomer() {
        int amount = userService.getTotalCustomer();
        String title = "Total Customers";
        String icon ="user";
        TotalResponse response = new TotalResponse(amount, title, icon);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/total-brand")
    public ResponseEntity<TotalResponse> getTotalBrand() {
        int amount = userService.getTotalBrand();
        String title = "Total Brands";
        String icon ="brand";
        TotalResponse response = new TotalResponse(amount, title, icon);
        return ResponseEntity.ok(response);
    }




}
