package com.mss.workflow.Controllers;


import com.mss.workflow.Entity.Diagram;
import com.mss.workflow.Entity.Workflow;
import com.mss.workflow.Repository.DiagramRepository;
import com.mss.workflow.Repository.WorkflowRepo;
import com.mss.workflow.Service.WorkflowService;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/wf")


public class WorkflowController {
@Autowired
    WorkflowService workflowService;
@Autowired
    WorkflowRepo workflowRepository;
@Autowired
    DiagramRepository diagramRepository;
    @PostMapping("/addwork")

    public Workflow addwork(@RequestBody Workflow w){

        return workflowService.addWorkflow(w);
    }
    @GetMapping("/wfetchall")
    List<Workflow> Wfetchall() {
        return workflowService.fetchall();
    }

    @PostMapping("/createWithMotif/{motifId}")
    public ResponseEntity<Workflow> createWorkflowWithMotif(@RequestBody Workflow workflow, @PathVariable Long motifId) {
        Workflow createdWorkflow = workflowService.createWorkflowWithMotif(workflow, motifId);
        return ResponseEntity.ok(createdWorkflow);
    }

    @PostMapping("/createWithMotifAndDiagram/{motifId}/{diagramId}")
    public ResponseEntity<Workflow> createWorkflowWithMotifAndDiagram(@RequestBody Workflow workflow,
                                                                      @PathVariable Long motifId,
                                                                      @PathVariable Long diagramId) {
        Workflow createdWorkflow = workflowService.createWorkflowWithMotifAndDiagram(workflow, motifId, diagramId);
        return ResponseEntity.ok(createdWorkflow);
    }

    @PostMapping("/assignDiagram/{workflowId}/{diagramId}")
    public Workflow assignDiagramToWorkflow(@PathVariable Long workflowId, @PathVariable Long diagramId) {
        return workflowService.assignDiagramToWorkflow(workflowId, diagramId);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Workflow> getWorkflowById(@PathVariable Long id) {
        Workflow workflow = workflowService.getWorkflowById(id);
        if (workflow != null) {
            return ResponseEntity.ok(workflow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/workflows/{id}")
    public ResponseEntity<Workflow> getWorkflowByIds(@PathVariable Long id) {
        Workflow workflow = workflowService.getWorkflowByIds(id);
        if (workflow != null) {
            return ResponseEntity.ok(workflow);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
