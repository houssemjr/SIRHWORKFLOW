package com.example.rhservice.Service;

import com.example.rhservice.Entity.Workflow;
import com.example.rhservice.Repository.WorkflowRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class WorkflowServiceImp implements WorkflowService{

    @Autowired
   private WorkflowRepo workflowRepo;
    @Override
    public Workflow addWorkflow(Workflow w) {
        return workflowRepo.save(w);
    }

    @Override
    public List<Workflow> fetchall() {
        return workflowRepo.findAll();
    }
}
    