package com.unihub.api.unihub_backend.common.enums;

public enum Schools {
    USC("University of Southern California"),
    UCLA("University of California, Los Angeles");

    private final String displayName;

    Schools(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Schools fromDomain(String domain) {
        return switch (domain.toLowerCase()) {
            case "usc.edu" -> USC;
            case "ucla.edu" -> UCLA;
            default -> null;
        };
    }

    public static Schools fromDisplayName(String displayName) {
        for (Schools school : Schools.values()) {
            if (school.getDisplayName().equalsIgnoreCase(displayName)) {
                return school;
            }
        }
        return null;
    }
    
    public static boolean isValidDomain(String domain) {
        return fromDomain(domain) != null;
    }
}