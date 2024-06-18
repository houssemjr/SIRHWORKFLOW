package com.mss.workflow.Listners;


import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TaskListner implements ExecutionListener {
    @Autowired
    private TaskService taskService;




    @Override
    public void notify(DelegateExecution delegateExecution) throws Exception {
        List<Task> tasks = taskService.createTaskQuery().taskName("Approbation par le manager").initializeFormKeys().list();
        for (Task task : tasks) {
            System.out.println("Task ID: " + task.getId() + ", Task Name: " + task.getName());
            // Vous pouvez effectuer d'autres opérations avec les tâches ici, par exemple, les envoyer à une interface utilisateur ou les traiter d'une autre manière.
        }

    }
}
