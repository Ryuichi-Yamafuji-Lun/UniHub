package com.cardinalcart.api.cardinalcart_backend.user;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cardinalcart.api.cardinalcart_backend.userstatusrole.Role;
import com.cardinalcart.api.cardinalcart_backend.userstatusrole.UserStatus;
import com.cardinalcart.api.cardinalcart_backend.userstatusrole.UserStatusRoleResponse;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // create user account
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // delete user account
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // find user by id
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    // find user by school email
    public Optional<User> findUserBySchoolEmail(String schoolEmail) {
        return userRepository.findBySchoolEmail(schoolEmail);
    }

    /*
     * ADMIN ONLY
     * getUserRoleAndStatus (gets user role and status)
     * updateUserRole (change user role if necessary)
     * updateUserStatus (Change user status such as for suspending)
     */

    // get user role and status
    public UserStatusRoleResponse getUserRoleAndStatus(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        
        return new UserStatusRoleResponse(user.getRole(), user.getUserStatus());
    }

    // update user role
    public User updateUserRole(Long id, Role newRole) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(newRole);
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // update user status
    public User updateUserStatus(Long id, UserStatus newUserStatus) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserStatus(newUserStatus);
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

}
