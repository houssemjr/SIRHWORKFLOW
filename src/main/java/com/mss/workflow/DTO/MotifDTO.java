package com.mss.workflow.DTO;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Getter
@Setter
@RequiredArgsConstructor
public class MotifDTO {
    private Long id;
    private String titre;

    @DateTimeFormat
    private Date validite;
    private String couleur;
    private String code;
    private String workflow;
    private String type;
    private Integer soldeInitial;
    private String unite;
    private Boolean depassementAutorise;

    // Constructeurs, getters et setters
}
