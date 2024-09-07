package com.vanduong.userservice.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document(collection = "users")
public class User {

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String fullName;

    private String email;

    private String phone;

    private String username;

    private String password;

    private String avatar;

    private String dateOfBirth;

    private String sex;

    private String facebook;

    private USER_ROLE role;

    private boolean isActive = true;

    private int point=1000;

    private Map<String, Integer> vouchers = new HashMap<>();

    public void addVoucher(String voucherId, int quantity) {
        this.vouchers.put(voucherId, this.vouchers.getOrDefault(voucherId, 0) + quantity);
    }

    public void removeVoucher(String voucherId, int quantity) {
        if (this.vouchers.containsKey(voucherId)) {
            int currentQuantity = this.vouchers.get(voucherId);
            if (currentQuantity <= quantity) {
                this.vouchers.remove(voucherId);
            } else {
                this.vouchers.put(voucherId, currentQuantity - quantity);
            }
        }
    }
}