package com.example.rhservice.Controllers;


import com.example.rhservice.DTO.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        KeycloakSecurityContext securityContext = (KeycloakSecurityContext) request.getAttribute(KeycloakSecurityContext.class.getName());

        if (securityContext != null) {
            String token = securityContext.getTokenString();
            System.out.println("Token: " + token);

            String username = securityContext.getToken().getPreferredUsername();
            
            // Log the username for debugging
            System.out.println("Authenticated user: " + username);

            // Perform additional checks or actions based on the authenticated user
            // ...

            return new ResponseEntity<>("Login successful. Hello, " + username + "!", HttpStatus.OK);
        } else {
            // Log a message for debugging
            System.out.println("Authentication failed");

            return new ResponseEntity<>("Authentication failed", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, null, null);

        String keycloakLogoutUrl = "http://localhost:8080/auth/realms/camunda-identity-realm/protocol/openid-connect/logout";
        return "redirect:" + keycloakLogoutUrl;
    }



}





