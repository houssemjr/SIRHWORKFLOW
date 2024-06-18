package com.example.rhservice.Service;
import com.example.rhservice.DTO.LoginRequest;
import com.nimbusds.oauth2.sdk.TokenResponse;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.AccessToken;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;


@Service
public class LoginService {

    private static final Logger log = LoggerFactory.getLogger(LoginService.class);

    // Mettez à jour ces valeurs avec les détails de votre configuration Keycloak
    private static final String KEYCLOAK_SERVER_URL = "http://localhost:8080/";
    private static final String REALM = "camunda-identity-realm";
    private static final String CLIENT_ID = "camunda-identity-service";
    private static final String CLIENT_SECRET = "n93fJNFySDXV4DDazbumydiAoede6fZN";

        public String login(LoginRequest loginRequest) {
            String username = loginRequest.getUsername();
            log.info("Attempting login for user: " + username);
    
    
            String password = loginRequest.getPassword();
    

                // Créez l'instance de Keycloak
                Keycloak keycloak = KeycloakBuilder.builder()
                        .serverUrl(KEYCLOAK_SERVER_URL)
                        .realm(REALM)
                        .grantType(OAuth2Constants.PASSWORD)
                        .clientId(CLIENT_ID)
                        .clientSecret(CLIENT_SECRET)
                        .username(username)
                        .password(password)
                        .build();
    
                log.info("Keycloak instance created successfully.");
    
                // Configurez les informations d'identification
                CredentialRepresentation credentials = new CredentialRepresentation();
                credentials.setType(CredentialRepresentation.PASSWORD);
                credentials.setValue(password);
                log.info("Keycloak credentials created successfully.");
    
                // Créez un jeton d'accès en utilisant le type de subvention 'password'
                AccessTokenResponse tokenResponse = keycloak.tokenManager()
                        .grantToken();
    
    
                log.info("Access token obtained successfully.");
    
                // Extrait et retourne le jeton d'accès
                return "login success";

        }

    public ResponseEntity<Map<String, String>> loging(LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        log.info("Attempting login for user: " + username);

        String password = loginRequest.getPassword();

        try {
            Keycloak keycloak = KeycloakBuilder.builder()
                    .serverUrl(KEYCLOAK_SERVER_URL)
                    .realm(REALM)
                    .grantType(OAuth2Constants.PASSWORD)
                    .clientId(CLIENT_ID)
                    .clientSecret(CLIENT_SECRET)
                    .username(username)
                    .password(password)
                    .build();

            log.info("Keycloak instance created successfully.");

            // Configurez les informations d'identification
            CredentialRepresentation credentials = new CredentialRepresentation();
            credentials.setType(CredentialRepresentation.PASSWORD);
            credentials.setValue(password);
            log.info("Keycloak credentials created successfully.");

            // Créez un jeton d'accès en utilisant le type de subvention 'password'
            AccessTokenResponse tokenResponse = keycloak.tokenManager()
                    .grantToken();





            // Create a map to represent the response
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("accessToken", tokenResponse.getToken());


            // Return a ResponseEntity with the JSON response
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            log.error("Keycloak login failed for user: " + username, e);

            // Return an error response
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Login failed");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    private Set<String> extractRoles(AccessToken accessToken) {
        Set<String> roles = new HashSet<>();

        // Realm roles
        AccessToken.Access realmAccess = accessToken.getRealmAccess();
        if (realmAccess != null) {
            roles.addAll(realmAccess.getRoles());
        }

        // Client roles (ajustez "votre-client-id" à votre ID de client réel)
        Map<String, AccessToken.Access> resourceAccess = accessToken.getResourceAccess();
        if (resourceAccess != null && resourceAccess.containsKey("votre-client-id")) {
            AccessToken.Access clientAccess = resourceAccess.get("votre-client-id");
            roles.addAll(clientAccess.getRoles());
        }

        return roles;
    }



}
