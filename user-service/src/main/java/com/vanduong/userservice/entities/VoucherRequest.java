package com.vanduong.userservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherRequest {
    private String targetPhone;
    private String voucher;
    private int quantity;
    private int point;
}