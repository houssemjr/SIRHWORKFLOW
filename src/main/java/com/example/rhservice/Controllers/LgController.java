package com.example.rhservice.Controllers;

import com.example.rhservice.DTO.LoginRequest;
import com.example.rhservice.DTO.LogoutRequest;
import com.example.rhservice.Service.LoginService;
import com.example.rhservice.keyckloak.KeycloakConfig;
import org.apache.juli.logging.Log;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.RefreshableKeycloakSecurityContext;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from this origin

@RequestMapping("/login")

public class LgController {

    @Autowired
    KeycloakConfig keycloakConfig;
    @Autowired
    LoginService loginService;

    @PostMapping("/lg")
    public String login(@RequestBody LoginRequest loginRequest, Authentication authentication) {

        if (authentication != null && authentication.getPrincipal() instanceof KeycloakPrincipal) {
            KeycloakPrincipal<?> keycloakPrincipal = (KeycloakPrincipal<?>) authentication.getPrincipal();
            RefreshableKeycloakSecurityContext keycloakSecurityContext = (RefreshableKeycloakSecurityContext) keycloakPrincipal.getKeycloakSecurityContext();
            System.out.println("Authentication failed. Principal: " + authentication.getPrincipal());

            // You can access token information here
            String accessToken = keycloakSecurityContext.getTokenString();
            String refreshToken = keycloakSecurityContext.getRefreshToken();

            System.out.println("access token :"+accessToken);

            // Perform additional actions if needed, e.g., store tokens, update user details, etc.

            return "Login successful!";
        } else {
            System.out.println("Authentication failed. Principal: " + authentication.getPrincipal());

            // Handle Keycloak authentication failure
            return "Authentication failed";

    }}
@PostMapping("auth")
    public ResponseEntity<Map<String, String>> login (@RequestBody LoginRequest loginRequest){
        //return loginService.login(loginRequest);
    return  loginService.loging(loginRequest);
}

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LogoutRequest logoutRequest) {

        // Vous pouvez utiliser le service KeycloakService pour gérer la déconnexion
        boolean logoutSuccess = keycloakConfig.logout(logoutRequest.getUsername());

        if (logoutSuccess) {
            // La déconnexion a réussi, renvoyez une réponse avec le code 200 OK
            return ResponseEntity.ok("User logged out successfully");
        } else {
            // La déconnexion a échoué, renvoyez une réponse avec le code 500 Internal Server Error
            return ResponseEntity.status(500).body("Failed to log out user");
        }
    }


    @PostMapping("/out")
    public String logout(Authentication authentication) {
        if (authentication instanceof KeycloakAuthenticationToken) {
            KeycloakAuthenticationToken keycloakAuthentication = (KeycloakAuthenticationToken) authentication;
            keycloakAuthentication.setAuthenticated(false); // Mark the token as not authenticated
            // Perform additional logout logic if needed
            return "Logged out successfully";
        } else {
            return "Not a Keycloak-secured session";
        }
    }


    @GetMapping("/getuserid")
    public String getIdUser(Authentication authentication){
        KeycloakPrincipal  principal =(KeycloakPrincipal) authentication.getPrincipal();
        String userId=principal.getKeycloakSecurityContext().getToken().getSubject();
        return userId;


    }






}

