package com.example.rhservice.Service;

import com.example.rhservice.Entity.Workflow;

import java.util.List;

public interface WorkflowService {

    public Workflow addWorkflow(Workflow w);

    List<Workflow>fetchall();
}
