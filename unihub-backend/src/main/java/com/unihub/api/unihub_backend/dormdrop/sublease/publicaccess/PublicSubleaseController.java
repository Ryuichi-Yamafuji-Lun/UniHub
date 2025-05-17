package com.unihub.api.unihub_backend.dormdrop.sublease.publicaccess;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unihub.api.unihub_backend.dormdrop.sublease.SubleaseService;

@RestController
@RequestMapping(path = "api/v1/public/subleases")
public class PublicSubleaseController {

    private final SubleaseService subleaseService;

    public PublicSubleaseController(SubleaseService subleaseService) {
        this.subleaseService = subleaseService;
    }

    
}
