package com.example.rhservice.Controllers;


import com.example.rhservice.DTO.RoleAssignmentRequest;
import com.example.rhservice.DTO.RoleDTO;
import com.example.rhservice.DTO.UpdateProfileRequest;
import com.example.rhservice.DTO.UserDTO;
import com.example.rhservice.Entity.Equipe;
import com.example.rhservice.Entity.Role;
import com.example.rhservice.Entity.UserInfo;
import com.example.rhservice.Entity.Workflow;
import com.example.rhservice.Repository.userRepository;
import com.example.rhservice.Service.*;
import com.example.rhservice.keyckloak.KeycloakConfig;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.*;

@RestController
@CrossOrigin(origins ="http://localhost:4200") //

@RequestMapping(path = "api/user")
public class RhController {

    private static final Logger logger = LoggerFactory.getLogger(UserInfoController.class);

    @Autowired
    WorkflowService workflowService;

    @Autowired
    KeyCloakService service;
    @Autowired
    RoleService roleService;
    @Autowired
    UserInfoServiceImp userInfoServiceImp;
    @Autowired
    KeycloakConfig keycloakConfig;
    @Autowired
    userRepository userrepo;
    @Autowired
    UserInfoService userInfoService;
    @Autowired
    RoleServiceBd roleServiceBd;
    @Autowired
    EquipeService equipeService;

    @Autowired

    
    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping
    public String addUser(@RequestBody UserDTO userDTO) {
        service.addUser(userDTO);
        service.addusertodb(userDTO);

        return "User Added Successfully." + userDTO;
    }

    @PostMapping("/addu")
    public void addUserDefault(@RequestBody UserDTO userDTO) {
        keycloakConfig.addUser(userDTO);
    }

    @GetMapping("/getrole")
    public List<RoleRepresentation> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("getgroups")
    public List<GroupRepresentation> getAllgroups() {
        return roleService.getAllgroups();
    }

    @PostMapping("/addrole")
    public void addRole(@RequestBody RoleDTO rl) {

        KeycloakConfig.addRole(rl);
    }

    @GetMapping("/getusers")
    List<UserRepresentation> getallusers() {
        return service.getallusers();
    }

    @GetMapping("/getuserId")
    public List<UserRepresentation> getUser(@RequestBody String userName) {
        return service.getUser(userName);
    }


    @GetMapping("/userinfo")
    public String getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return "Current user: " + authentication.getName();
        } else {
            return "No user authenticated";
        }
    }

    @GetMapping("getuserid/{userId}")
    private UserRepresentation getUserById(@PathVariable String userId) {

        return service.getUserById(userId);

    }

    @GetMapping("getuserids")
    private UserRepresentation getUserByIds(@PathVariable String UserId) {

        return service.getUserById("UserId");

    }

    @GetMapping("/user/{userId}/roles")
    public List<RoleRepresentation> getAllRolesForUser(@PathVariable String userId) {
        return service.getAllRolesForUser(userId);
    }

    @GetMapping("/user/{userId}/groups")
    public List<GroupRepresentation> getGroupsForUser(@PathVariable String userId) {
        return service.getGroupsForUser(userId);
    }

    @GetMapping("/managers-in-same-groups/{userId}")
    public Set<UserRepresentation> getUsersWithRoleManagerInSameGroups(@PathVariable String userId) {
        return service.getUsersWithRoleManagerInSameGroups(userId);
    }

    @PostMapping("/addus")
    private void addUser(@RequestBody UserInfo us) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(us.getUsername());
        userDTO.setEmailId(us.getEmail());
        userDTO.setPassword("welcom");
        System.out.println(userDTO);
        service.addUser(userDTO);
        userInfoService.addUsermodel(us);
    }

    @GetMapping("/getinfos")

    private List<UserInfo> fetchallUseri() {
        return userInfoService.fetchall();
    }

    @PostMapping("/add-role")
    private void addroletoDb(@RequestBody Role role) {
        roleServiceBd.AddRoles(role);

    }

    @GetMapping("/GetallRoles")
    private List<Role> fetchAllRoles() {
        return roleServiceBd.fetchAllRoles();
    }


    @GetMapping("/getinfoss")
    public ResponseEntity<List<UserInfo>> fetchAllUsers() {
        List<UserInfo> users = userInfoService.fetchall();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getequipes")
    public List<Equipe> fetchAllEquipes() {
        return equipeService.fetchAll();
    }

    @PostMapping("/addeq")
    public Equipe addEquipe(@RequestBody Equipe equipe) {
        return equipeService.save(equipe);
    }


    @GetMapping("/getusereq/{ide}")
    List<UserInfo> getUserEq(@PathVariable Long ide) {

        return equipeService.getUserInfoEq(ide);
    }

    @PostMapping("/assignequ/{idu}/{ideq}")
    public UserInfo assignuserequipe(@PathVariable Long idu, @PathVariable Long ideq) {
        return equipeService.assignuserequipe(idu, ideq);
    }

    @PostMapping("/addwork")

    public Workflow addwork(@RequestBody Workflow w) {
        return workflowService.addWorkflow(w);
    }

    @GetMapping("/wfetchall")
    List<Workflow> Wfetchall() {
        return workflowService.fetchall();
    }

    @PostMapping("/assignrl/{idUser}/{idRole}")

    public UserInfo assignRole(@PathVariable Long idUser, @PathVariable Long idRole) {
        return userInfoService.assignRole(idUser, idRole);
    }



    @GetMapping("/byUsername/{username}")
    public ResponseEntity<UserInfo> getUserByUsername(@PathVariable String username) {
        Optional<UserInfo> userInfo = userInfoService.getUserByUsername(username);
        return userInfo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String filePath = userInfoServiceImp.saveProfilePhoto(file);
            Map<String, String> response = new HashMap<>();
            response.put("filePath", filePath);
            return ResponseEntity.ok(response);
        } catch (IOException ex) {
            return ResponseEntity.status(500).body("Could not upload the file: " + ex.getMessage());
        }
    }

    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        try {
            UserInfo updatedUser = userInfoService.updateUserProfile(id, request);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}