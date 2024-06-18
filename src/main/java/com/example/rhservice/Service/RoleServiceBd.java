package com.example.rhservice.Service;


import com.example.rhservice.Entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleServiceBd {

    public void AddRoles(Role role);
    List<Role>fetchAllRoles();
}
