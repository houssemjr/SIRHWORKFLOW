package com.mss.workflow.Controllers;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mss.workflow.DTO.TaskWithVariables;
import com.mss.workflow.Entity.Leave;
import com.mss.workflow.Repository.MyMixIn;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.runtime.ProcessInstanceQuery;
import org.camunda.bpm.engine.task.Task;
import org.glassfish.hk2.utilities.reflection.ParameterizedTypeImpl;
import org.glassfish.jersey.server.JSONP;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController("/task")
@CrossOrigin("*")
public class TaskController {


    @Autowired
    private TaskService taskService;
    @Autowired

    private RuntimeService runtimeService;

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);


    @GetMapping("/rh-approval")
    public List<Map<String, Object>> getRHTasks() {
        List<Task> tasks = taskService.createTaskQuery()
                .taskName("Rh approval")
                .list();
        return tasks.stream()
                .map(task -> {
                    Map<String, Object> taskDetails = new HashMap<>();
                    taskDetails.put("Task ID", task.getId());
                    taskDetails.put("Name", task.getName());
                    taskDetails.put("Assignee", task.getAssignee());

                    Map<String, Object> tds = new HashMap<>();


                    // Récupérer les variables pour chaque tâche
                    Map<String, Object> variables = runtimeService.getVariables(task.getExecutionId());
                    tds.put("Variables", variables);
                    System.out.println( "les variables de rh approval sont "+tds);


                    return taskDetails;
                })
                .collect(Collectors.toList());
    }


    @PostMapping("/dd")

    public void deleteAllProcessInstances() {
        ProcessInstanceQuery query = runtimeService.createProcessInstanceQuery();
        List<ProcessInstance> instances = query.list();
        for (ProcessInstance instance : instances) {
            runtimeService.deleteProcessInstance(instance.getId(), "Batch delete of all instances");
        }


    }


    @GetMapping("/rh-approv")
    public List<Map<String, Object>> getRHTask() {
        List<Task> tasks = taskService.createTaskQuery()
                .taskName("Rh approval")
                .list();
        return tasks.stream()
                .map(task -> {
                    Map<String, Object> taskDetails = new HashMap<>();
                    taskDetails.put("Task ID", task.getId());
                    taskDetails.put("Name", task.getName());
                    taskDetails.put("Assignee", task.getAssignee());

                    Map<String, Object> variables = runtimeService.getVariables(task.getExecutionId());
                    Map<String, Object> filteredVariables = filterVariables(variables);
                    taskDetails.put("Variables", filteredVariables);

                    return taskDetails;
                })
                .collect(Collectors.toList());
    }

    private Map<String, Object> filterVariables(Map<String, Object> originalVariables) {
        Map<String, Object> safeVariables = new HashMap<>();
        for (Map.Entry<String, Object> entry : originalVariables.entrySet()) {
            Object value = entry.getValue();
            // Check if the value is an instance of a problematic class
            if (!(value instanceof java.lang.reflect.Type || value.getClass().getName().contains("reflect"))) {
                safeVariables.put(entry.getKey(), value);
            }
        }
        return safeVariables;
    }


    @GetMapping("/rh-approve")
    public List<TaskWithVariables> getR() {
        List<Task> tasks = taskService.createTaskQuery()
                .taskName("Rh approval")
                .list();
        return tasks.stream()
                .map(task -> {
                    TaskWithVariables dto = new TaskWithVariables();
                    dto.setId(task.getId());
                    dto.setName(task.getName());
                    dto.setAssignee(task.getAssignee());

                    Map<String, Object> variables = runtimeService.getVariables(task.getExecutionId());
                    dto.setVariables(filterVariables(variables));

                    return dto;
                })
                .collect(Collectors.toList());
    }


        @GetMapping("/rh-a")
        public List<Map<String, Object>> getRHTks() {
            List<Task> tasks = taskService.createTaskQuery()
                    .taskName("Rh approval")
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

}