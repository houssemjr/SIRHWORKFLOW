package com.mss.workflow.Service;


import com.mss.workflow.DTO.PermissionRequest;
import com.mss.workflow.Entity.Leave;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.variable.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Map;

@Service

public class ProcessService {

    @Autowired
    RuntimeService runtimeService;
    public String Sp(Leave leaveRequest) {
        try {
            runtimeService.startProcessInstanceByKey("leaveprocess", Variables.putValue("leaveRequest", leaveRequest));
            return "Process started successfully";
        } catch (Exception e) {
            return "Error starting process: " + e.getMessage();
        }
    }


    public String StartP(PermissionRequest permissionRequest){

      try {
       ProcessInstance instance= runtimeService.startProcessInstanceByKey("permissionpro", Variables.putValue("PermissionRequest",permissionRequest));
        return instance.getId();
    }catch (Exception e){
          return "Error starting process: " + e.getMessage();

      }}



    public String startProcess(Map<String, Object> variables) {
        ProcessInstance instance = runtimeService.startProcessInstanceByKey("leaveprocess", variables);
        return instance.getId();
    }




}
