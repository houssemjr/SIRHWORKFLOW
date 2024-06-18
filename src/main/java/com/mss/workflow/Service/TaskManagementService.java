package com.mss.workflow.Service;


import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskManagementService {

    @Autowired
    private TaskService taskService;
    @Autowired
    private RuntimeService runtimeService;

    public Task assignInitialTaskToUser(String processInstanceId, String userId) {
        Task task = taskService.createTaskQuery()
                .processInstanceId(processInstanceId)
                .active()
                .singleResult();  // Get the first active task
        if (task != null) {
            taskService.setAssignee(task.getId(), userId);
        }
        return task;
    }

    public void completeTask(String taskId, Map<String, Object> variables) {
        taskService.complete(taskId, variables);
    }

    public Task getTaskByProcessInstanceId(String processInstanceId) {
        List<Task> tasks = taskService.createTaskQuery()
                .processInstanceId(processInstanceId)
                .active()
                .list();
        if (!tasks.isEmpty()) {
            // Suppose we take the first active task
            return tasks.get(0);
        } else {
            return null; // No active tasks found
        }
    }

    public void updateTaskStatus(String taskId, String status) {
        // Récupérer la tâche par son ID
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        System.out.println(task);

        if (task == null) {
            throw new IllegalArgumentException("Task not found: " + taskId);
        }

        String executionId = task.getExecutionId();

        // Mettre à jour les variables de la tâche dans le contexte d'exécution
        Map<String, Object> variables = new HashMap<>();
        variables.put("rhdecision", status);
        runtimeService.setVariables(executionId, variables);
        System.out.println(variables);
    }

}
