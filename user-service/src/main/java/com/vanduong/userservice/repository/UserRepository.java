package com.vanduong.userservice.repository;


import com.vanduong.userservice.entities.USER_ROLE;
import com.vanduong.userservice.entities.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);

    boolean existsByPhone(String phone);

    Optional<User> findByPhone(String phone);

    List<User> findByRole(USER_ROLE role);


}
