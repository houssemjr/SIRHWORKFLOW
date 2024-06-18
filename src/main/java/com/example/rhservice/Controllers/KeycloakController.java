package com.example.rhservice.Controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("*")
public class KeycloakController {

    @GetMapping(path = "/")
    public String index() {
        return "external";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request) throws Exception {
        request.logout();
        return "redirect:/aa";
    }

    @GetMapping("/secure-endpoint")
    public String secureEndpoint(KeycloakSecurityContext keycloakSecurityContext) {
        // Access authenticated user information
        String username = keycloakSecurityContext.getToken().getPreferredUsername();
        return "Hello, " + username + "! This is a secure endpoint.";
    }


}
