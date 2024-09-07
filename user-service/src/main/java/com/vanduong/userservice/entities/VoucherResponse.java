package com.vanduong.userservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponse {
    private String username;
    private Map<String, Integer> vouchers;
}