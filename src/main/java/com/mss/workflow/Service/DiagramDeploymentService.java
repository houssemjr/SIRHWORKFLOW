package com.mss.workflow.Service;


import com.mss.workflow.Entity.Diagram;
import com.mss.workflow.Repository.DiagramRepository;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.repository.Deployment;
import org.camunda.bpm.engine.repository.ProcessDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiagramDeploymentService {
    @Autowired
    RepositoryService repositoryService ;
    @Autowired
    DiagramRepository diagramRepository;

    @Autowired
    RuntimeService runtimeService;

    private static final Logger logger = LoggerFactory.getLogger(DiagramDeploymentService.class);


    public String deployDiagram(Long diagramId) {
        Diagram  diagram = diagramRepository.findById(diagramId)
                .orElseThrow(() -> new RuntimeException("Diagram not found"));

        repositoryService.createDeployment()
                .addString(diagram.getName(), diagram.getXml())
                .name(diagram.getName())
                .deploy();

        return "Deployment successful";
    }
    public String deployAndStartProcess(Long diagramId) {
        Diagram diagram = diagramRepository.findById(diagramId)
                .orElseThrow(() -> new RuntimeException("Diagram not found"));

        logger.info("Deploying diagram with ID: {}", diagramId);

        Deployment deployment;
        try {
            deployment = repositoryService.createDeployment()
                    .addString(diagram.getName() + ".bpmn", diagram.getXml())
                    .name(diagram.getName())
                    .deploy();
        } catch (Exception e) {
            logger.error("Deployment failed: ", e);
            throw new RuntimeException("Deployment failed: " + e.getMessage(), e);
        }

        ProcessDefinition processDefinition = repositoryService.createProcessDefinitionQuery()
                .deploymentId(deployment.getId())
                .singleResult();

        if (processDefinition == null) {
            logger.error("No process definition found for deployment id: {}", deployment.getId());
            throw new RuntimeException("No process definition found for deployment id: " + deployment.getId());
        }

        logger.info("Starting process instance for process definition ID: {}", processDefinition.getId());

        runtimeService.startProcessInstanceById(processDefinition.getId());

        return "Deployment and process instance start successful";
    }


}
