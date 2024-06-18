package com.mss.workflow.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Solde {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idsolde;
    private Float soldeconge;
    private Float soldemaladie;
    private Integer soldeheure;
    private String iduser;
    private String state;


}
