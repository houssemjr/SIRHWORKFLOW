    package com.example.rhservice.Service;

    import com.example.rhservice.DTO.UserDTO;
    import com.example.rhservice.Entity.Users;
    import com.example.rhservice.Repository.userRepository;
    import com.example.rhservice.keyckloak.Credentials;
    import com.example.rhservice.keyckloak.KeycloakConfig;
    import lombok.AllArgsConstructor;
    import org.keycloak.admin.client.Keycloak;
    import org.keycloak.admin.client.resource.*;
    import org.keycloak.representations.idm.*;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.core.userdetails.User;
    import org.springframework.stereotype.Service;

    import javax.ws.rs.ForbiddenException;
    import javax.ws.rs.NotFoundException;
    import java.util.*;

    @Service

    @AllArgsConstructor
    public class KeyCloakService {


        @Autowired
        userRepository userrepo;
        private static final Logger logger = LoggerFactory.getLogger(KeyCloakService.class);


        public void addUser(UserDTO userDTO){
            CredentialRepresentation credential = Credentials
                    .createPasswordCredentials(userDTO.getPassword());
            UserRepresentation user = new UserRepresentation();
            user.setUsername(userDTO.getUserName());
            user.setFirstName(userDTO.getFirstname());
            user.setLastName(userDTO.getLastName());
            user.setEmail(userDTO.getEmailId());
            user.setCredentials(Collections.singletonList(credential));
            user.setEnabled(true);
            user.singleAttribute("profileImage", "https://houssemjrad.blob.core.windows.net/houssemblob/pdep.avif");

            UsersResource instance = getInstance();
            instance.create(user);



        }

        public List<UserRepresentation> getUser(String userName){
            UsersResource usersResource = getInstance();
            List<UserRepresentation> user = usersResource.search(userName,false);
            System.out.println(user);

            return user;

        }

        public List<UserRepresentation>getallusers(){
            UsersResource usersResource=getInstance();
            List<UserRepresentation> user =usersResource.list();
         return  user;
        }

        public void updateUser(String userId, UserDTO userDTO){
            CredentialRepresentation credential = Credentials
                    .createPasswordCredentials(userDTO.getPassword());
            UserRepresentation user = new UserRepresentation();
            user.setUsername(userDTO.getUserName());
            user.setFirstName(userDTO.getFirstname());
            user.setLastName(userDTO.getLastName());
            user.setEmail(userDTO.getEmailId());
            user.setCredentials(Collections.singletonList(credential));

            UsersResource usersResource = getInstance();
            usersResource.get(userId).update(user);
        }
        public void deleteUser(String userId){
            UsersResource usersResource = getInstance();
            usersResource.get(userId)
                    .remove();
        }


        public void sendVerificationLink(String userId){
            UsersResource usersResource = getInstance();
            usersResource.get(userId)
                    .sendVerifyEmail();
        }

        public void sendResetPassword(String userId){
            UsersResource usersResource = getInstance();

            usersResource.get(userId)
                    .executeActionsEmail(Arrays.asList("UPDATE_PASSWORD"));
        }

        public UsersResource getInstance(){
            return KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users();
        }



        public void addusertodb(UserDTO user){
       Users us= new Users();
       us.setEmailid(user.getEmailId());
       us.setFirstname(user.getFirstname());
       us.setPassword(user.getPassword());
       us.setLastname(user.getLastName());

       userrepo.save(us);


        }

        public UserRepresentation getUserById(String userId) {
            logger.debug("Fetching user with ID: {}", userId);
            UsersResource usersResource = getInstance();
            try {
                UserResource userResource = usersResource.get(userId);
                return userResource.toRepresentation();
            } catch (NotFoundException e) {
                logger.error("User not found: {}", userId, e);
                return null;
            } catch (Exception e) {
                logger.error("Error retrieving user with ID: {}", userId, e);
                return null;
            }
        }
        public List<RoleRepresentation> getAllRolesForUser(String userId) {
            // Récupérer l'instance du realm Keycloak
            RealmResource realmResource = KeycloakConfig.getInstance().realm(KeycloakConfig.realm);

            // Récupérer la ressource utilisateur spécifique
            UserResource userResource = realmResource.users().get(userId);

            // Récupérer la ressource de mappage des rôles
            RoleMappingResource roleMappingResource = userResource.roles();

            // Récupérer tous les rôles de l'utilisateur
            return roleMappingResource.realmLevel().listEffective();
        }

        public List<GroupRepresentation> getGroupsForUser(String userId) {
            // Récupérer l'instance du realm Keycloak
            RealmResource realmResource = KeycloakConfig.getInstance().realm(KeycloakConfig.realm);

            // Récupérer la ressource utilisateur spécifique
            UserResource userResource = realmResource.users().get(userId);

            // Récupérer les groupes de l'utilisateur
            return userResource.groups();
        }

        public Set<UserRepresentation> getUsersWithRoleManagerInSameGroups(String userId) {
            Keycloak keycloak = KeycloakConfig.getInstance();
            RealmResource realmResource = keycloak.realm(KeycloakConfig.realm);
            UsersResource usersResource = realmResource.users();

            // Récupérer les groupes de l'utilisateur spécifié
            UserResource userResource = usersResource.get(userId);
            List<GroupRepresentation> userGroups = userResource.groups();

            // Récupérer la liste des utilisateurs ayant le rôle "manager"
            RoleResource roleResource = realmResource.roles().get("manager");
            RoleRepresentation managerRole = roleResource.toRepresentation();

            // Vérifiez si le rôle "manager" existe
            if (managerRole == null) {
                throw new RuntimeException("Role 'manager' not found in Keycloak");
            }

            Set<UserRepresentation> managers;
            try {
                managers = roleResource.getRoleUserMembers();
            } catch (ForbiddenException e) {
                throw new RuntimeException("Failed to retrieve users with role 'manager': " + e.getMessage(), e);
            }

            // Filtrer les utilisateurs avec le rôle "manager" appartenant aux mêmes groupes
            Set<UserRepresentation> result = new HashSet<>();
            for (UserRepresentation manager : managers) {
                UserResource managerResource = usersResource.get(manager.getId());
                List<GroupRepresentation> managerGroups = managerResource.groups();

                if (isUserInSameGroups(userGroups, managerGroups)) {
                    result.add(manager);
                }
            }

            return result;
        }

        private boolean isUserInSameGroups(List<GroupRepresentation> userGroups, List<GroupRepresentation> managerGroups) {
            Set<String> userGroupIds = new HashSet<>();
            for (GroupRepresentation group : userGroups) {
                userGroupIds.add(group.getId());
            }

            for (GroupRepresentation group : managerGroups) {
                if (userGroupIds.contains(group.getId())) {
                    return true;
                }
            }

            return false;
        }










    }

