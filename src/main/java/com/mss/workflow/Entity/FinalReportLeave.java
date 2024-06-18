package com.mss.workflow.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity

public class FinalReportLeave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String taskId;
    private String status;
    private String userId;
    private String managerId;
    private String rhId;

    public String getMesssage() {
        return messsage;
    }

    public void setMesssage(String messsage) {
        this.messsage = messsage;
    }

    private String messsage;

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    private String leaveType;

    public FinalReportLeave(Long id, String taskId, String status, String userId, String managerId, String rhId, String messsage, String leaveType, Date startDate, Date endDate) {
        this.id = id;
        this.taskId = taskId;
        this.status = status;
        this.userId = userId;
        this.managerId = managerId;
        this.rhId = rhId;
        this.messsage = messsage;
        this.leaveType = leaveType;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public FinalReportLeave() {

    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getManagerId() {
        return managerId;
    }

    public void setManagerId(String managerId) {
        this.managerId = managerId;
    }

    public String getRhId() {
        return rhId;
    }

    public void setRhId(String rhId) {
        this.rhId = rhId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @DateTimeFormat

    private Date startDate;
    @DateTimeFormat

    private Date endDate;



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
