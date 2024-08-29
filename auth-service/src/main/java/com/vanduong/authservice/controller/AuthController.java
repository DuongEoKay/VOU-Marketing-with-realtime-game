package com.vanduong.authservice.controller;

import com.vanduong.authservice.entities.*;
import com.vanduong.authservice.entities.value_objects.UserVO;
import com.vanduong.authservice.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.register(authRequest));
    }


    @PostMapping(value = "/login")
    public ResponseEntity<OtpResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }



    @PostMapping(value = "/validate-otp")
    public ResponseEntity<AuthResponse> validateOtp(@RequestBody OtpValidationRequest otpValidationRequest) {
        return ResponseEntity.ok(authService.validateOtp(otpValidationRequest));
    }

}
