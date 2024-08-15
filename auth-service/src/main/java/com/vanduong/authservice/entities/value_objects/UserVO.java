package com.vanduong.authservice.entities.value_objects;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.jgit.lib.ObjectId;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserVO {
    private String id;

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
