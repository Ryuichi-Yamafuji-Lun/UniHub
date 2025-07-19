package com.unihub.api.unihub_backend.common.util;

public class EmailDomainUtil {

    public static String extractDomainFromEmail(String email) {
        if (email == null || !email.contains("@")) {
            return null;
        }
        return email.substring(email.indexOf("@") + 1).toLowerCase();
    }
}