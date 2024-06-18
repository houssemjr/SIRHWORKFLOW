package com.mss.workflow.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "motif")
public class Motif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToOne
    @JoinColumn(name = "workflow_id")
    @JsonIgnore
    private Workflow workflows;

    @OneToMany
            @JsonIgnore
    List<Leave>LeaveMotif;
}
