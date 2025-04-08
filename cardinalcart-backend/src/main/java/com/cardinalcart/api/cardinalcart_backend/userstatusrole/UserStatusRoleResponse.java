package com.cardinalcart.api.cardinalcart_backend.userstatusrole;

public final class UserStatusRoleResponse {

    private final Role role;
    private final UserStatus userStatus;

    public UserStatusRoleResponse(Role role, UserStatus userStatus) {
        this.role = role;
        this.userStatus = userStatus;
    }

    public Role getRole() {
        return this.role;    
    }

    public UserStatus getUserStatus() {
        return this.userStatus;
    }

}
