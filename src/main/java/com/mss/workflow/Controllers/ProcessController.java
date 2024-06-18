package com.mss.workflow.Controllers;


import com.mss.workflow.DTO.LeaveRequest;
import com.mss.workflow.DTO.StartProcessRequest;
import com.mss.workflow.Service.ProcessService;
import com.mss.workflow.Service.TaskManagementService;
import org.camunda.bpm.engine.RuntimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/process")
public class ProcessController {

    @Autowired
    RuntimeService runtimeService;

    @Autowired
    ProcessService processService;
    @Autowired
    TaskManagementService taskManagementService;

    @PostMapping("/startProcess")
    public String startProcess(@RequestBody StartProcessRequest request) {
        try {
            runtimeService.startProcessInstanceByKey(request.getProcessKey(), request.getVariables());
            return "Process started successfully";
        } catch (Exception e) {
            return "Error starting process: " + e.getMessage();
        }
    }

    public Map<String,Object> leaveemployee(LeaveRequest lr){
        Map<String,Object> map=new HashMap<>();
        map.put("emplId",lr.getIdEmployee() );
        map.put("leavetype",lr.getLeaveType());
        map.put("start",lr.getLeaveType());
        map.put("end",lr.getEndDate());
        return map;

    }

    @PostMapping("/start-processs")
    public String startProcessAndAssignTask(@RequestBody Map<String, Object> requestData) {
        String userId = (String) requestData.get("userId");  // Assume user ID is passed in the request
        String processInstanceId = processService.startProcess(requestData);

        taskManagementService.assignInitialTaskToUser(processInstanceId, userId);

        return "Process started and task assigned";
    }





}
