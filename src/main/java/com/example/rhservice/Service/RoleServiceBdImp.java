package com.example.rhservice.Service;


import com.example.rhservice.Entity.Role;
import com.example.rhservice.Repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class RoleServiceBdImp implements RoleServiceBd{

    @Autowired
    RoleRepo roleRepo;


    @Override
    public void AddRoles(Role role) {
        roleRepo.save(role);

    }

    @Override
    public List<Role> fetchAllRoles() {
        return roleRepo.findAll();
    }
}
