package com.mss.workflow.Controllers;


import com.mss.workflow.DTO.PermissionRequest;
import com.mss.workflow.Service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class PermissionController {
  @Autowired
  PermissionService permissionService;

  @PostMapping("/start")
  private String StartPermissionprocess(@RequestBody PermissionRequest permissionRequest) {
    return permissionService.StartPro(permissionRequest);
  }

  @PostMapping("/startpermission")

  private String startprocessproandassign(@RequestBody PermissionRequest permissionRequest, Map<String, Object> requestData) {
    return permissionService.StartProAndAssign(permissionRequest, requestData);
  }

  @GetMapping("/gettasks")
  private List<Map<String, Object>> getmanagerTasks() {

    return permissionService.getmanagerTasks();
  }

  @PostMapping("/approve/{taskId}")
  public ResponseEntity<String> approvePermission(@PathVariable String taskId) {
    try {
      permissionService.approuverPermission(taskId);
      return ResponseEntity.ok("Permission approuvée avec succès pour la tâche ID: " + taskId);
    } catch (IllegalStateException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Erreur lors de l'approbation de la permission: " + e.getMessage());
    }
  }

  @PostMapping("/rejected/{taskId}")

  public ResponseEntity<?> RejectPermission(@PathVariable String taskId) {
    try {
      permissionService.RejectPermission(taskId);
      return ResponseEntity.ok("Permission rejeté pour la tâche ID: " + taskId);

    } catch (IllegalStateException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body("Erreur lors de l'approbation de la permission: " + e.getMessage());
    }


  }
}
