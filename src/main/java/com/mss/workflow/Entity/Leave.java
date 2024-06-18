package com.mss.workflow.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
public class Leave implements Serializable {
    //private static final long serialVersionUID = 3120498580962876858L;

    @Id
    @GeneratedValue
    private Long id;
    private String leaveType;
    @DateTimeFormat
    private Date startDate;
    @DateTimeFormat
    private Date endDate;

        private String IdEmployee;
    private String message;

    private String processInstanceId;

        private boolean state ;

    @ManyToOne
    Motif motifleave;



}
