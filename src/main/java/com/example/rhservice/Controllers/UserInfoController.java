package com.example.rhservice.Controllers;

import com.example.rhservice.Entity.UserInfo;
import com.example.rhservice.Service.UserInfoService;
import com.example.rhservice.keyckloak.KeycloakConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/us")
public class UserInfoController {

    @Autowired
    UserInfoService userInfoService;

    @Autowired
    KeycloakConfig keycloakConfig;

    @PostMapping("/addus")
    private void addUser(@RequestBody UserInfo us ){

        userInfoService.addUsermodel(us);
    }
    @GetMapping("/{userId}/username")
    public String getUsernameById(@PathVariable String userId) {
        return keycloakConfig.getUsernameById(userId);
    }

}
