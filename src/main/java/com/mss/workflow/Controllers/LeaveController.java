package com.mss.workflow.Controllers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.mss.workflow.Config.ActivityInstanceUpdateListenerSerializer;
import com.mss.workflow.DTO.CompletTacheRequest;
import com.mss.workflow.DTO.TaskWithVariables;
import com.mss.workflow.Entity.Leave;
import com.mss.workflow.Entity.Motif;
import com.mss.workflow.Repository.LeaveRepository;
import com.mss.workflow.Repository.MotifRepo;
import com.mss.workflow.Service.CongeService;
import com.mss.workflow.Service.LeaveService;
import com.mss.workflow.Service.ProcessService;
import com.mss.workflow.Service.TaskManagementService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.impl.persistence.entity.TaskEntity;
import org.camunda.bpm.engine.runtime.Execution;
import org.camunda.bpm.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/leave")

public class LeaveController {
    private static final Logger logger = LoggerFactory.getLogger(LeaveController.class);

    @Autowired
    LeaveService leaveService;
    @Autowired
    ProcessService processService;
    @Autowired
    private CongeService congeService;
    @Autowired
    TaskService taskService;
    @Autowired
    TaskManagementService taskManagementService;
@Autowired
    LeaveRepository leaveRepository;
@Autowired
    MotifRepo motifRepo;

    @PostMapping("/leaverequests")
    public Leave userLeaveRequest(@RequestBody Leave leaveRequest) {
        try {
            String processInstanceId = processService.Sp(leaveRequest);
            logger.info("Process started with ID: {}",processInstanceId);
            Thread.sleep(1000);
            Task task = taskService.createTaskQuery().processInstanceId(processInstanceId).singleResult();
            if (task != null) {
                String userId = leaveRequest.getIdEmployee();
                taskService.claim(task.getId(), userId);
                task = taskService.createTaskQuery().taskId(task.getId()).singleResult();

                if (task.getAssignee() != null && task.getAssignee().equals(userId)) {
                    logger.info("Task successfully claimed by user: {}", userId);
                } else {
                    logger.error("Failed to claim the task.");
                }
            } else {
                logger.warn("No task found for process instance ID: {}", processInstanceId);
            }
            return leaveService.leaverrequestuser(leaveRequest);
        } catch (Exception e) {
            logger.error("Error processing leave request: ", e);
            throw new RuntimeException("Error processing leave request", e);
        }
    }

    @GetMapping("/taches-en-attente")
    public ResponseEntity<String> getTachesEnAttente(Execution execution) {
        List<Task> taches = congeService.getTachesEnAttente();

        ObjectMapper mapper = new ObjectMapper();

        // Register custom serializer (if needed)
        SimpleModule module = new SimpleModule();
        module.addSerializer(TaskEntity.class, new ActivityInstanceUpdateListenerSerializer()); // Replace with your actual serializer class
        mapper.registerModule(module);

        String jsonTasks;
        try {
            jsonTasks = mapper.writeValueAsString(taches);
            } catch (JsonProcessingException e) {
            // Handle serialization error gracefully
            return ResponseEntity.internalServerError().body("Error serializing tasks to JSON"+ e );
        }

        return ResponseEntity.ok(jsonTasks);
    }



    @GetMapping("/tasks")
    public List<Task> getPendingTasks() {
        List<Task> tasks = taskService.createTaskQuery().initializeFormKeys().list();
        return tasks;
    }
    @GetMapping("/demandes-en")
    public List<String> getDemandesEnAttente() {
        // Récupérer toutes les tâches de gestion de congé en attente d'approbation par le manager
        List<Task> demandesEnAttente = taskService.createTaskQuery()
                .taskName("Approbation par le manager")
                .list();

        // Extraire les IDs des tâches
        List<String> taskIds = demandesEnAttente.stream()
                .map(Task::getId)
                .collect(Collectors.toList());

        return taskIds;
    }


    @GetMapping("/demandes")
    public List<TaskWithVariables> getDemandessEnAttente() {
        // Récupérer toutes les tâches de gestion de congé en attente d'approbation par le manager
        List<Task> demandesEnAttente = taskService.createTaskQuery()
                .taskName("Approbation par le manager")
                .list();

        // Mapper les tâches avec leurs variables
        List<TaskWithVariables> tasksWithVariables = demandesEnAttente.stream()
                .map(this::mapTaskWithVariables)
                .collect(Collectors.toList());

        return tasksWithVariables;
    }

    private TaskWithVariables mapTaskWithVariables(Task task) {
        Map<String, Object> variables = taskService.getVariables(task.getId());
        return new TaskWithVariables(task.getId(), task.getName(),task.getAssignee(), variables);
    }


    @PostMapping("/completer-tache")
    public void completerTache(@RequestBody CompletTacheRequest request) {
        // Récupérer la tâche à compléter
        Task task = taskService.createTaskQuery()
                .taskId(request.getTaskId())
                .singleResult();

        if (task != null) {
            // Créer une carte de variables avec la décision du manager
            Map<String, Object> variables = new HashMap<>();
            variables.put("decisionManager", request.getDecision());

            // Compléter la tâche avec la décision du manager
            taskService.complete(task.getId(), variables);
            System.out.println("teste"+variables);

        }
    }


    //  Ajout a la base de la demande de congé

     @JsonIgnore
    @PostMapping("/leaverequest")
    public String startProcessAndAssignTask(@RequestBody Leave leaveRequest,Map<String, Object> requestData) {
        requestData.put("UserId",leaveRequest.getIdEmployee());
        requestData.put("leaveType",leaveRequest.getLeaveType());
        requestData.put("startDate",leaveRequest.getStartDate());
        requestData.put("endDate",leaveRequest.getEndDate());
        requestData.put("message",leaveRequest.getMessage());
        String userId = (String) requestData.get("userId");  // Assume user ID is passed in the request
        String processInstanceId = processService.startProcess(requestData);
         logger.info("le process instanceId"+processInstanceId);
        Task task=taskManagementService.assignInitialTaskToUser(processInstanceId, leaveRequest.getIdEmployee());
         if (task != null) {
             taskManagementService.completeTask(task.getId(), null); // Assuming no additional variables are needed to complete the task
             logger.info("Task successfully completed for user: " + leaveRequest.getIdEmployee());

             leaveRequest.setProcessInstanceId(processInstanceId);
             leaveService.leaverrequestuser(leaveRequest);
             return "Process started, task assigned and completed";
         } else {
             return "Process started, but no task was available to assign and complete";
         }

     }

     @GetMapping("getallleaves")
    List<Leave>getallleaves(){
        return leaveRepository.findAll();
     }

@PostMapping("/leave/{idl}/{idm}")

    Leave AssignLeaveToMotif(@PathVariable Long idl,@PathVariable Long idm){
    Leave lv=leaveRepository.findById(idl).orElse(null);
    Motif mt= motifRepo.findById(idm).orElse(null);
    lv.setMotifleave(mt);
    return leaveRepository.save(lv);

}

}






