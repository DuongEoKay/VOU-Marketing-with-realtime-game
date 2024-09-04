package com.vanduong.authservice.services;

import com.vanduong.authservice.entities.*;
import com.vanduong.authservice.entities.value_objects.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final RestTemplate restTemplate;
    private final JwtUtil jwt;

    @Autowired
    public AuthService(RestTemplate restTemplate,
                       final JwtUtil jwt) {
        this.restTemplate = restTemplate;
        this.jwt = jwt;
    }


    @Autowired
    private RedisService redisService;


    public OtpResponse validatePhone(PhoneValidateRequest phoneValidateRequest) {
        try {
            boolean isPhoneExist = Boolean.TRUE.equals(restTemplate.getForObject("http://user-service/users/is-phone-exist/" + phoneValidateRequest.getPhone(), Boolean.class));
            if (!isPhoneExist) {
                // Generate OTP
                String otp = generateOtp();

                // Store OTP in a temporary storage
                redisService.setOtp(phoneValidateRequest.getPhone(), otp);

                // Send OTP
                String apiKeySid = "SK.0.smr6FMyYiyjzIDHuFao0T1VMBRsh5k";
                String apiKeySecret = "TjFBODFQTGpEb3hjSlYycnNRQ3VIMExkV0RFSEdu";
                String brandName = "Duong Dep Trai";

                StringeeService stringeeService = new StringeeService(apiKeySid, apiKeySecret, brandName);

                System.out.println("Now sending OTP to " + phoneValidateRequest.getPhone());

                // Try to call OTP immediately
                boolean otpSent = stringeeService.callOtp(phoneValidateRequest.getPhone(), otp);
                if (!otpSent) {
                    // If the first attempt failed, try again
                    otpSent = stringeeService.callOtp(phoneValidateRequest.getPhone(), otp);
                }

                // Store OTP in user's session or a temporary storage

                // Return a response indicating that the OTP has been sent
                return new OtpResponse(true, "OTP sent");
            } else {
                return new OtpResponse(false, "Phone already exist or invalid phone number");
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return null;
            }
        }
        return null;
    }


    public AuthResponse register(AuthRequest authRequest) {

        try {
            UserVO tempUser = restTemplate.getForObject("http://user-service/users/username/" + authRequest.getUsername(), UserVO.class);
            if (tempUser != null) {
                return new AuthResponse(null, null, "Username already exists");
            }


            String storedOtp = redisService.getOtp(authRequest.getPhone());



            // Compare the stored OTP with the one provided by the user
            if (authRequest.getOtp().equals(storedOtp)) {


                authRequest.setPassword(BCrypt.hashpw(authRequest.getPassword(), BCrypt.gensalt()));

                UserVO userVO = restTemplate.postForObject("http://user-service/users", authRequest, UserVO.class);
                Assert.notNull(userVO, "Failed to register user. Please try again later");

                String accessToken = jwt.generate(userVO, "ACCESS");
                String refreshToken = jwt.generate(userVO, "REFRESH");

                return new AuthResponse(accessToken, refreshToken, "User registered successfully");
            } else {
                return new AuthResponse(null, null, "Invalid OTP");
            }
        } catch (HttpClientErrorException e) {

            return null;
        }
    }


    public OtpResponse login(LoginRequest loginRequest) {
        try {
            UserVO userVO = restTemplate.getForObject("http://user-service/users/username/" + loginRequest.getUsername(), UserVO.class);
            if (userVO != null && BCrypt.checkpw(loginRequest.getPassword(), userVO.getPassword())) {
                // Generate OTP
                String otp = generateOtp();

                // Store OTP in a temporary storage
                redisService.setOtp(loginRequest.getUsername(), otp);

                // Send OTP
                String apiKeySid = "SK.0.smr6FMyYiyjzIDHuFao0T1VMBRsh5k";
                String apiKeySecret = "TjFBODFQTGpEb3hjSlYycnNRQ3VIMExkV0RFSEdu";
                String brandName = "Duong Dep Trai";

                StringeeService stringeeService = new StringeeService(apiKeySid, apiKeySecret, brandName);

                System.out.println("Now sending OTP to " + userVO.getPhone());

                // Try to call OTP immediately
                boolean otpSent = stringeeService.callOtp(userVO.getPhone(), otp);
                if (!otpSent) {
                    // If the first attempt failed, try again
                    otpSent = stringeeService.callOtp(userVO.getPhone(), otp);
                }

                // Store OTP in user's session or a temporary storage

                // Return a response indicating that the OTP has been sent
                return new OtpResponse(true, "OTP sent");
            } else {
                return new OtpResponse(false, "Invalid username or password");
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                return null;
            }
        }
        return null;
    }

    private String generateOtp() {
        return "1711";
    }


    public AuthResponse validateOtp(OtpValidationRequest otpValidationRequest) {
        try {
            // Retrieve the OTP associated with the username from the session or temporary storage
            String storedOtp = redisService.getOtp(otpValidationRequest.getUsername());



            // Compare the stored OTP with the one provided by the user
            if (otpValidationRequest.getOtp().equals(storedOtp)) {
                // If the OTPs match, proceed with the login process
                UserVO userVO = restTemplate.getForObject("http://user-service/users/username/" + otpValidationRequest.getUsername(), UserVO.class);
                String accessToken = jwt.generate(userVO, "ACCESS");
                String refreshToken = jwt.generate(userVO, "REFRESH");

                return new AuthResponse(accessToken, refreshToken, "User logged in successfully");
            } else {
                // If the OTPs do not match, return an error response
                return new AuthResponse(null, null, "Invalid OTP");
            }
        } catch (Exception e) {
            // Log the exception and return an error response
            System.out.println("An error occurred while validating the OTP: " + e.getMessage());
            return new AuthResponse(null, null, "An error occurred while validating the OTP");
        }
    }


}
