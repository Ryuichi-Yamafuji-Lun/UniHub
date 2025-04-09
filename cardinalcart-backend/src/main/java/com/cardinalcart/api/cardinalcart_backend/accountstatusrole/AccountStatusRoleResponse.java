package com.cardinalcart.api.cardinalcart_backend.accountstatusrole;

public final class AccountStatusRoleResponse {

    private final Role role;
    private final AccountStatus userStatus;

    public AccountStatusRoleResponse(Role role, AccountStatus userStatus) {
        this.role = role;
        this.userStatus = userStatus;
    }

    public Role getRole() {
        return this.role;    
    }

    public AccountStatus getUserStatus() {
        return this.userStatus;
    }

}
