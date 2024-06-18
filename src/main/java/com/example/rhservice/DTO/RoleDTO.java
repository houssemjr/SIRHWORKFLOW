package com.example.rhservice.DTO;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class RoleDTO {

    private String roleName;
    private String description;
}
