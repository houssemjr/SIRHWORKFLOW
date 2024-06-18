package com.mss.workflow.DTO;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Getter
@Setter

public class PermissionRequest {
    public PermissionRequest() {
    }

    private String motif;




    private Integer nombreheures;

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDatepermission() {
        return datepermission;
    }

    public void setDatepermission(Date datepermission) {
        this.datepermission = datepermission;
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public PermissionRequest(String motif, String message, Date datepermission, String processInstanceId) {
        this.motif = motif;
        this.message = message;
        this.datepermission = datepermission;
        this.processInstanceId = processInstanceId;
    }

    private String message ;
    @DateTimeFormat
    private Date datepermission;


    private String processInstanceId;

    public String getIdEmployee() {
        return IdEmployee;
    }

    public void setIdEmployee(String idEmployee) {
        IdEmployee = idEmployee;
    }

    public PermissionRequest(String motif, String message, Date datepermission, String processInstanceId, String idEmployee, int
            nombreheures) {
        this.motif = motif;
        this.message = message;
        this.datepermission = datepermission;
        this.processInstanceId = processInstanceId;
        IdEmployee = idEmployee;
        this.nombreheures=nombreheures;
    }

    private String IdEmployee;

}
