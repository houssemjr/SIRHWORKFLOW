package com.mss.workflow.Listners;

import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.springframework.stereotype.Component;

@Component
public class TaskCreationListener implements TaskListener {
    @Override
    public void notify(DelegateTask delegateTask) {
        String taskId = delegateTask.getId();
        String taskName = delegateTask.getName();
        System.out.println("Task ID: " + taskId);
        System.out.println("Task Name: " + taskName);

    }
}
