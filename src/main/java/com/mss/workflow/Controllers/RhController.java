package com.mss.workflow.Controllers;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mss.workflow.Entity.FinalReportLeave;
import com.mss.workflow.Repository.FinalReportLeaveRepo;
import com.mss.workflow.Service.TaskManagementService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/Rh")
@CrossOrigin("*")
public class RhController {


    @Autowired
    RuntimeService runtimeService;

    @Autowired
    TaskService taskService;

    @Autowired
    TaskManagementService taskManagementService;

    @Autowired
    FinalReportLeaveRepo finalReportLeaveRepo;



    @PostMapping("/update-status")
    public ResponseEntity<?> updateTaskStatus(@RequestBody Map<String, String> payload) {
        try {
            String taskId = payload.get("taskId");
            String status = payload.get("status");

            // Mettre à jour le statut de la tâche
            taskManagementService.updateTaskStatus(taskId, status);

            // Préparer les variables
            Map<String, Object> variables = new HashMap<>();
            variables.put("approved", "approved".equals(status));
            variables.put("status", status);


            // Compléter la tâche


            // Fetch the task variables
            Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
            System.out.println(taskId);
            System.out.println(task);

            String executionId = task.getExecutionId();
                Map<String, Object> taskVariables = runtimeService.getVariables(executionId);
              System.out.println(taskVariables);

            // Créer et enregistrer la demande de congé dans la base de données
            FinalReportLeave leaveRequest = new FinalReportLeave();
            leaveRequest.setUserId((String) taskVariables.get("UserId")); // Assurez-vous que `employeeId` est dans le payload
            leaveRequest.setLeaveType((String)taskVariables.get("leaveType"));
            leaveRequest.setStartDate((Date) taskVariables.get("startDate"));
            leaveRequest.setEndDate((Date) taskVariables    .get("endDate"));
            leaveRequest.setMesssage((String)taskVariables.get("message") );

            finalReportLeaveRepo.save(leaveRequest);
            taskManagementService.completeTask(taskId, variables);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Task updated and completed successfully, leave request saved");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error updating or completing task");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }



}







