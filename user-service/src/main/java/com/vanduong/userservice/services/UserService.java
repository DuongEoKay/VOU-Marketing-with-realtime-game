package com.vanduong.userservice.services;

import com.vanduong.userservice.entities.*;
import com.vanduong.userservice.entities.value_objects.Department;
import com.vanduong.userservice.entities.value_objects.ResponseTemplateVO;
import com.vanduong.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class UserService {

    private final UserRepository repository;
    private final RestTemplate restTemplate;

    @Autowired
    public UserService(UserRepository repository,
                       RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }


    public User save(User user) {
        return this.repository.save(user);
    }

    public User getById(ObjectId id) {
        return this.repository.findById(id).orElse(null);
    }


    public User update(User user) {
        return this.repository.save(user);
    }

    public void delete(ObjectId id) {
        this.repository.deleteById(id);
    }

    public User getByUsername(String username) {
        return this.repository.findByUsername(username).orElse(null);
    }


    public List<User> getAllUser() {
        return this.repository.findAll();
    }

    public User findByUsername(String username) {
        return this.repository.findByUsername(username).orElse(null);
    }


    public boolean isPhoneExist(String phone) {
        return this.repository.existsByPhone(phone);
    }

    public ResponseEntity<VoucherResponse> getVoucherByUserId(ObjectId id) {
        User user = this.repository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Integer> vouchers = user.getVouchers();
        return ResponseEntity.ok(new VoucherResponse(user.getUsername(), vouchers, "Get voucher successfully"));
    }


    public ResponseEntity<VoucherResponse> addVoucherToUser(ObjectId id, VoucherRequest voucherRequest) {
        User user = this.repository.findById(id).orElse(null);
        User target = this.repository.findByPhone(voucherRequest.getTargetPhone()).orElse(null);
        try {

            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            if (target == null) {
                return ResponseEntity.notFound().build();
            }



            user.setPoint(user.getPoint() - voucherRequest.getPoint()*voucherRequest.getQuantity());




            if(user.getPoint() < 0){
                return ResponseEntity.badRequest().body(new VoucherResponse(target.getPhone(), target.getVouchers(), "Not enough point to add voucher"));
            }

            target.addVoucher(voucherRequest.getVoucher(), voucherRequest.getQuantity());
            this.repository.save(user);
            this.repository.save(target);
            return ResponseEntity.ok(new VoucherResponse(target.getPhone(), target.getVouchers(), "Add voucher successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new VoucherResponse(target.getPhone(),target.getVouchers(), "Failed to add voucher"));
        }
    }

    public ResponseEntity<VoucherResponse> removeVoucherFromUser(ObjectId id, VoucherRequest voucherRequest) {
        User user = this.repository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }

        user.removeVoucher(voucherRequest.getVoucher(), voucherRequest.getQuantity());
        this.repository.save(user);
        return ResponseEntity.ok(new VoucherResponse(user.getUsername(), user.getVouchers(), "Remove voucher successfully"));

    }


    public ResponseEntity<BasicResponse> addPointToUser(AddPointRequest addPointRequest) {
        try {
            User user = this.repository.findById(addPointRequest.getId()).orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            user.setPoint(user.getPoint() + addPointRequest.getPoint());
            this.repository.save(user);
            return ResponseEntity.ok(new BasicResponse("Add point successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new BasicResponse("Failed to add point"));
        }


    }

    public ResponseEntity<VoucherResponse> sendVoucherToUser(ObjectId id, VoucherRequest voucherRequest) {
        User user = this.repository.findById(id).orElse(null);
        User target = this.repository.findByPhone(voucherRequest.getTargetPhone()).orElse(null);
        try {
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            if (target == null) {
                return ResponseEntity.notFound().build();
            }
            if(user.getVouchers().get(voucherRequest.getVoucher()) < voucherRequest.getQuantity()){
                return ResponseEntity.badRequest().body(new VoucherResponse(target.getPhone(), target.getVouchers(), "Not enough voucher to send"));
            }


            target.addVoucher(voucherRequest.getVoucher(), voucherRequest.getQuantity());
            user.removeVoucher(voucherRequest.getVoucher(), voucherRequest.getQuantity());
            this.repository.save(user);
            this.repository.save(target);
            return ResponseEntity.ok(new VoucherResponse(target.getPhone(), target.getVouchers(), "Send voucher successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new VoucherResponse(target.getPhone(), target.getVouchers(), "Failed to send voucher"));
        }
    }
}

