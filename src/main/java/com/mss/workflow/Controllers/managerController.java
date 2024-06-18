package com.mss.workflow.Controllers;


import com.mss.workflow.Entity.Leave;
import com.mss.workflow.Repository.LeaveRepository;
import com.mss.workflow.Service.TaskManagementService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manager")
@CrossOrigin("*")
public class managerController {

    @Autowired
    LeaveRepository leaveRepository;
    @Autowired
    private TaskManagementService taskManagementService;

    @Autowired
    private RuntimeService runtimeService;



    @GetMapping("leaverequests")
    public List<Leave> getAllRequests(){

        return leaveRepository.findLeaveByStateFalse();
    }
    @PostMapping("/process-leave/{processInstanceId}/{idle}")
    public ResponseEntity<?> handleLeaveRequest(@PathVariable String processInstanceId,@PathVariable Long idle,
                                                @RequestBody Map<String, Object> decisionData) {
        String decision = (String) decisionData.get("decision"); // "approve" or "reject"
        Map<String, Object> variables = new HashMap<>();
        variables.put("approved", decision.equals("approve"));
        variables.put("decision", decision); // Ajout de la variable 'decision'

       Leave lr=leaveRepository.findById(idle).orElse(null);
        lr.setState(true);

        Task task = taskManagementService.getTaskByProcessInstanceId(processInstanceId);
        if (task != null) {
            taskManagementService.completeTask(task.getId(), variables);
            return ResponseEntity.ok("Decision processed: " + decision);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active task found for process instance: " + processInstanceId);
        }
    }



}






