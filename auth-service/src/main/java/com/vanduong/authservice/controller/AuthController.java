package com.vanduong.authservice.controller;

import com.vanduong.authservice.entities.*;
import com.vanduong.authservice.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping(value = "/admin-register")
    public ResponseEntity<AuthResponse> adminRegister(@RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.adminRegister(authRequest));
    }


    @PostMapping(value = "/login")
    public ResponseEntity<OtpResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }



    @PostMapping(value = "/validate-otp")
    public ResponseEntity<AuthResponse> validateOtp(@RequestBody OtpValidationRequest otpValidationRequest) {
        return ResponseEntity.ok(authService.validateOtp(otpValidationRequest));
    }


    @PostMapping(value = "/validate-phone")
    public ResponseEntity<OtpResponse> validatePhone(@RequestBody PhoneValidateRequest phoneValidateRequest) {
        return ResponseEntity.ok(authService.validatePhone(phoneValidateRequest));
    }


}
