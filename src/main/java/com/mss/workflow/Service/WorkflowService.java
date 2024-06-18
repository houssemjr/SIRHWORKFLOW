package com.mss.workflow.Service;

import com.mss.workflow.Entity.Workflow;

import java.util.List;

public interface WorkflowService {

    public Workflow addWorkflow(Workflow w);

    List<Workflow>fetchall();

     Workflow createWorkflowWithMotif(Workflow workflow, Long motifId);
    public Workflow createWorkflowWithMotifAndDiagram(Workflow workflow, Long motifId, Long diagramId);
    public Workflow assignDiagramToWorkflow(Long workflowId, Long diagramId);
    public Workflow getWorkflowById(Long id);
    Workflow getWorkflowByIds(Long id);
    }
