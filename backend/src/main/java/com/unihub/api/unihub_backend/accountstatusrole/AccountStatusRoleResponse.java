package com.unihub.api.unihub_backend.accountstatusrole;

import java.util.Set;

public final class AccountStatusRoleResponse {

    private final Set<Role> roles;
    private final AccountStatus userStatus;

    public AccountStatusRoleResponse(Set<Role> roles, AccountStatus userStatus) {
        this.roles = roles;
        this.userStatus = userStatus;
    }

    public Set<Role> getRole() {
        return this.roles;    
    }

    public AccountStatus getUserStatus() {
        return this.userStatus;
    }

}
