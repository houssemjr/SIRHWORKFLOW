package com.mss.workflow.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import jdk.jshell.Diag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Workflow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
        private String titre;
    private String processid;
    private String code;
    private String path;
    @DateTimeFormat
    private Date datecreation;
    @DateTimeFormat
    private Date datevalidation;
    private boolean status;

    @OneToOne
    @JoinColumn(name = "motif_id")
    @JsonIgnore
    private Motif motif;

    @OneToOne
    @JoinColumn(name="diagram_id")
    private Diagram diagram;
}
