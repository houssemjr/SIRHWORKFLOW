package com.example.rhservice.Controllers;


import com.example.rhservice.Service.KeyCloakService;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profil")
public class profilController {

    @Autowired
    KeyCloakService keyCloakService;

    @GetMapping("getuserid")
    private UserRepresentation getUserById (@PathVariable String UserId){

        return keyCloakService.getUserById(UserId);

    }
    @GetMapping("getusername")
    private List<UserRepresentation> getUserByname (@RequestBody String username){

        return keyCloakService.getUser(username);

    }
}
