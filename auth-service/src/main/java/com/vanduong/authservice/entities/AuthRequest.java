package com.vanduong.authservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthRequest {

    private String fullName;

    private String email;

    private String phone;

    private String username;

    private String password;

    private String avatar;

    private String dateOfBirth;

    private String sex;

    private String facebook;

    private String role ;
}
