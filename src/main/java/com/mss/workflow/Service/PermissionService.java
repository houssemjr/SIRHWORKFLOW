package com.mss.workflow.Service;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mss.workflow.Controllers.LeaveController;
import com.mss.workflow.DTO.PermissionRequest;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PermissionService implements IPermissionService {
    private static final Logger logger = LoggerFactory.getLogger(PermissionService.class);

    @Autowired
    private ProcessService processService;
    @Autowired
    TaskManagementService taskManagementService;
    @Autowired
    TaskService taskService;
    @Autowired
    RuntimeService runtimeService;

    @Override
    public String StartPro(PermissionRequest permissionRequest) {
        processService.StartP(permissionRequest);
        return "process permissionStarted";
    }

    @Override
    public String StartProAndAssign(PermissionRequest permissionRequest, Map<String, Object> RequestData) {
        RequestData.put("UserId", permissionRequest.getIdEmployee());
        RequestData.put("motif", permissionRequest.getMotif());
        RequestData.put("datepermission", permissionRequest.getDatepermission());
        RequestData.put("message", permissionRequest.getMessage());
        RequestData.put("nombreheures",permissionRequest.getNombreheures());

        String processInstanceId = processService.StartP(permissionRequest);

        logger.info("le process instanceId" + processInstanceId);

        Task task = taskManagementService.assignInitialTaskToUser(processInstanceId, permissionRequest.getIdEmployee());
        if (task != null) {
            taskManagementService.completeTask(task.getId(), null);
            logger.info("Task successfully completed for user: " + permissionRequest.getIdEmployee());
            permissionRequest.setProcessInstanceId(processInstanceId);
            return "Process started, task assigned and completed";

        }else {

            return "Process started, but no task was available to assign and complete";

    }

}

    @Override
    public List<Map<String, Object>> getmanagerTasks() {
        List<Task> tasks = taskService.createTaskQuery()
                .taskName("manager approbation")
                .list();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.NONE);
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);

        return tasks.stream()
                .map(task -> {
                    Map<String, Object> taskDetails = new HashMap<>();
                    taskDetails.put("taskId", task.getId());
                    taskDetails.put("Name", task.getName());
                    taskDetails.put("Assignee", task.getAssignee());

                    // Récupérer les variables pour chaque tâche
                    Map<String, Object> variables = runtimeService.getVariables(task.getExecutionId());

                    Map<String,Object> tds = new HashMap<>();
                    // Transformer les variables en JSON
                    try {
                        String variablesJson = mapper.writeValueAsString(variables);
                        taskDetails.put("Variables", variablesJson);
                    } catch (Exception e) {
                        e.printStackTrace();
                        taskDetails.put("Variables", "Error serializing variables");
                    }

                    return taskDetails;
                })
                .collect(Collectors.toList());

    }

    public void approuverPermission(String taskId) {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();

        if (task == null) {
            throw new IllegalStateException("Tâche non trouvée avec ID: " + taskId);
        }
        System.out.println("les variabels sont " +runtimeService.getVariables(task.getExecutionId()));
        runtimeService.setVariable(task.getExecutionId(), "decisionm", "approved");


        // Compléter la tâche
        taskService.complete(taskId);
    }

    @Override
    public void RejectPermission(String taskId) {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();

        if (task == null) {
            throw new IllegalStateException("Tâche non trouvée avec ID: " + taskId);
        }
        runtimeService.setVariable(task.getExecutionId(), "decisionm", "rejected");


        taskService.complete(taskId);
    }
}