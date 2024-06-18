package com.mss.workflow.Service;


import com.mss.workflow.DTO.PermissionRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface IPermissionService {

     String StartPro(PermissionRequest permissionRequest);

     String StartProAndAssign(PermissionRequest permissionRequest, Map<String,Object>RequestData);

     List<Map<String, Object>> getmanagerTasks();

     void approuverPermission(String decisionm);

      void RejectPermission(String taskId);

}
