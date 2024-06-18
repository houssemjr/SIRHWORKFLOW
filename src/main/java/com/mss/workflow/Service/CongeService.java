package com.mss.workflow.Service;


import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CongeService {

    @Autowired
  private   TaskService taskService;

    @Autowired
    SoldeService soldeService;

    public List<Task> getTachesEnAttente() {
        taskService.createTaskQuery().initializeFormKeys();

        return taskService.createTaskQuery().taskName("Approbation par le manager").initializeFormKeys().list();
    }

    public void approuverDemandeConge(String taskId) {
        taskService.complete(taskId);
    }
    public void rejeterDemandeConge(String taskId) {
        // Implémentez la logique de rejet de la demande de congé, si nécessaire
        taskService.complete(taskId);
    }
}
