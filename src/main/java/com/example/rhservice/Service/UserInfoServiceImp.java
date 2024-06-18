package com.example.rhservice.Service;


import com.example.rhservice.DTO.UpdateProfileRequest;
import com.example.rhservice.Entity.Role;
import com.example.rhservice.Entity.UserInfo;
import com.example.rhservice.Repository.RoleRepo;
import com.example.rhservice.Repository.UserInforRep;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class UserInfoServiceImp  implements UserInfoService{
    private final String uploadDir = "C:/Uploads";
    @Autowired
    UserInforRep userInforRep;

    @Autowired
    RoleRepo  roleRepo;
    @Override
    public void addUsermodel(UserInfo uf) {
        userInforRep.save(uf);

    }

    @Override
    public List<UserInfo> fetchall() {
        return userInforRep.findAll();
    }

    @Override
    public UserInfo assignRole(Long idUser,Long idRole){

        UserInfo user =userInforRep.findById(idUser).orElse(null);
        Role role=roleRepo.findById(idRole).orElse(null);

        user.setRole(role);
        return  userInforRep.save(user);
    }


    @Transactional

    @Override
    public UserInfo updateUserProfile(Long id, UpdateProfileRequest request) {
        Optional<UserInfo> optionalUser = userInforRep.findById(id);
        if (optionalUser.isPresent()) {
            UserInfo user = optionalUser.get();
            user.setAdresse(request.getAdresse());
            user.setTelephone(request.getTelephone());
            user.setEmail(request.getEmail());
            user.setPhotodeProfil(request.getPhotodeProfil()); // Store the file path
            return userInforRep.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }


    @Transactional

    @Override
    public Optional<UserInfo> getUserByUsername(String username) {
        return userInforRep.findByUsername(username);
    }



    public String saveProfilePhoto(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("Please select a file to upload");
        }

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = file.getOriginalFilename();
        Path path = Paths.get(uploadDir, fileName);
        Files.copy(file.getInputStream(), path);

        // Return the URL path
        return "/uploads/" + fileName;
    }

}




    
