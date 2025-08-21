package com.unihub.api.unihub_backend.dormdrop.sublease;

import jakarta.persistence.*;

@Entity
public class SubleaseImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int imagePosition;
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sublease_id")
    private Sublease sublease;

    public SubleaseImage(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Sublease getSublease() {
        return sublease;
    }

    public void setSublease(Sublease sublease) {
        this.sublease = sublease;
    }

    public int getImagePosition() {
        return imagePosition;
    }

    public void setImagePosition(int imagePosition) {
        this.imagePosition = imagePosition;
    }
}