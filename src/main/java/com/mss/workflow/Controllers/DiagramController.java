package com.mss.workflow.Controllers;

import com.mss.workflow.DTO.DiagramRequest;
import com.mss.workflow.Entity.Diagram;
import com.mss.workflow.Service.DiagramDeploymentService;
import com.mss.workflow.Service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diagrams")
@CrossOrigin("*")
public class DiagramController {

    @Autowired
    private DiagramService diagramService;
    @Autowired
    DiagramDeploymentService diagramDeploymentService;

    @PostMapping("/save")
    public ResponseEntity<String> saveDiagram(@RequestBody DiagramRequest diagramRequest) {
        diagramService.saveDiagram(diagramRequest);
        return ResponseEntity.ok("Diagram saved successfully");
    }

    @GetMapping("/fetchall")
    List<Diagram>getAll(){
        return diagramService.fetchAllD();
    }

    @PostMapping("/deploy/{id}")
    public ResponseEntity<String> deployDiagram(@PathVariable Long id) {
        try {
            String result = diagramDeploymentService.deployDiagram(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Deployment failed: " + e.getMessage());
        }
    }    @PostMapping("/deploystart/{id}")
    public ResponseEntity<String> deploysDiagram(@PathVariable Long id) {
        try {
            String result = diagramDeploymentService.deployAndStartProcess(id);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Deployment failed: " + e.getMessage());
        }
    }



}
