package com.cardinalcart.api.cardinalcart_backend.user;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cardinalcart.api.cardinalcart_backend.userstatusrole.Role;
import com.cardinalcart.api.cardinalcart_backend.userstatusrole.UserStatus;
import com.cardinalcart.api.cardinalcart_backend.userstatusrole.UserStatusRoleResponse;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(201).body(createdUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{schoolEmail}")
    public ResponseEntity<User> getUserBySchoolEmail(@PathVariable String schoolEmail) {
        Optional<User> user = userService.findUserBySchoolEmail(schoolEmail);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/role-status")
    public ResponseEntity<UserStatusRoleResponse> getUserRoleAndStatus(@PathVariable Long id) {
        UserStatusRoleResponse userStatusRoleResponse = userService.getUserRoleAndStatus(id);

        return ResponseEntity.ok(userStatusRoleResponse);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestParam Role role) {
        User user = userService.updateUserRole(id, role);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<User> changeUserStatus(@PathVariable Long id, @RequestParam UserStatus userStatus) {
        User user = userService.updateUserStatus(id, userStatus);
        return ResponseEntity.ok(user);
    }
}
