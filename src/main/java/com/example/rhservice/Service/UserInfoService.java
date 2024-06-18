package com.example.rhservice.Service;


import com.example.rhservice.DTO.UpdateProfileRequest;
import com.example.rhservice.Entity.UserInfo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserInfoService {

    public void addUsermodel(UserInfo uf);

    List<UserInfo>fetchall();
    UserInfo assignRole(Long idUser,Long idRole);
    public UserInfo updateUserProfile(Long id, UpdateProfileRequest request);

     Optional<UserInfo> getUserByUsername(String username);
}
