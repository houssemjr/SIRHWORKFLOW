package com.example.rhservice.DTO;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UpdateProfileRequest{

    private String photodeProfil;
    private String adresse;
    private String telephone;
    private String email;

}
