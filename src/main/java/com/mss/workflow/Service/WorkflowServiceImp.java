package com.mss.workflow.Service;

import com.mss.workflow.Entity.Diagram;
import com.mss.workflow.Entity.Motif;
import com.mss.workflow.Entity.Workflow;
import com.mss.workflow.Repository.DiagramRepository;
import com.mss.workflow.Repository.MotifRepo;
import com.mss.workflow.Repository.WorkflowRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class WorkflowServiceImp implements WorkflowService{

    @Autowired
    private WorkflowRepo workflowRepo;

    @Autowired
    MotifRepo motifRepository;

    @Autowired
    DiagramRepository diagramRepository;
    @Override
    public Workflow addWorkflow(Workflow w) {
        return workflowRepo.save(w);
    }

    @Override
    public List<Workflow> fetchall() {
        return workflowRepo.findAll();
    }

    @Override
    public Workflow createWorkflowWithMotif(Workflow workflow, Long motifId) {
        Optional<Motif> motifOptional = motifRepository.findById(motifId);
        if (motifOptional.isPresent()) {
            Motif motif = motifOptional.get();

            // Enregistrer d'abord le Workflow
            Workflow savedWorkflow = workflowRepo.save(workflow);

            // Associer le Workflow au Motif
            savedWorkflow.setMotif(motif);
            motif.setWorkflows(savedWorkflow);

            // Enregistrer les entités mises à jour
            motifRepository.save(motif);
            return workflowRepo.save(savedWorkflow);
        } else {
            throw new RuntimeException("Motif not found with id: " + motifId);
        }
    }

    @Override
    public Workflow createWorkflowWithMotifAndDiagram(Workflow workflow, Long motifId, Long diagramId) {
        Optional<Motif> motifOptional = motifRepository.findById(motifId);
        Optional<Diagram> diagramOptional = diagramRepository.findById(diagramId);

        if (motifOptional.isPresent() && diagramOptional.isPresent()) {
            Motif motif = motifOptional.get();
            Diagram diagram = diagramOptional.get();

            // Enregistrer d'abord le Workflow
            Workflow savedWorkflow = workflowRepo.save(workflow);

            // Associer le Workflow au Motif et au Diagram
            savedWorkflow.setMotif(motif);
            savedWorkflow.setDiagram(diagram);

            motif.setWorkflows(savedWorkflow);

            // Enregistrer les entités mises à jour
            motifRepository.save(motif);
            return workflowRepo.save(savedWorkflow);
        } else {
            String missingEntity = !motifOptional.isPresent() ? "Motif" : "Diagram";
            throw new RuntimeException(missingEntity + " not found with given id");
        }
    }
    @Override
    public Workflow assignDiagramToWorkflow(Long workflowId, Long diagramId) {
        Optional<Workflow> workflowOptional = workflowRepo.findById(workflowId);
        Optional<Diagram> diagramOptional = diagramRepository.findById(diagramId);

        if (workflowOptional.isPresent() && diagramOptional.isPresent()) {
            Workflow workflow = workflowOptional.get();
            Diagram diagram = diagramOptional.get();
            workflow.setDiagram(diagram);
            return workflowRepo.save(workflow);
        } else {
            throw new RuntimeException("Workflow or Diagram not found with provided ids.");
        }
    }

    @Override
    public Workflow getWorkflowById(Long id) {
        Optional<Workflow> workflow = workflowRepo.findById(id);
        return workflow.orElse(null);
    }


@Override
    public Workflow getWorkflowByIds(Long id) {
        return workflowRepo.findById(id).orElse(null);
    }


}

