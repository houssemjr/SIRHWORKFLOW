package com.mss.workflow.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Getter
@Setter
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String motif;

    private String message ;

    private Integer nombreheures;

    public Permission(String motif, String message, Date datePermission, String employeeId) {
    }


    public String getStatus() {

        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String status;


    private String IdEmployee;
@DateTimeFormat
    private Date datepermission;


    private String processInstanceId;

    public Permission(String motif, String message, Date datePermission, String processInstanceId, String employeeId) {
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }


    public Permission(Long id, String motif, String message, String status, String idEmployee, Date datepermission, String processInstanceId) {
        this.id = id;
        this.motif = motif;
        this.message = message;
        this.status = status;
        IdEmployee = idEmployee;
        this.datepermission = datepermission;
        this.processInstanceId = processInstanceId;
    }

    public Permission() {

    }

    public String getMotif() {
        return motif;
    }

    public String getMessage() {
        return message;
    }

    public Date getDatepermission() {
        return datepermission;
    }



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
    public String getIdEmployee() {
        return IdEmployee;
    }

    public void setIdEmployee(String idEmployee) {
        IdEmployee = idEmployee;
    }
    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

}
