package com.mss.workflow.Delegate;

import com.mss.workflow.DTO.PermissionRequest;
import com.mss.workflow.Entity.Permission;
import com.mss.workflow.Entity.Solde;
import com.mss.workflow.Repository.PermissionRepo;
import com.mss.workflow.Repository.SoldeRepo;
import com.mss.workflow.Service.SoldeService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.camunda.bpm.engine.variable.value.ObjectValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
public class NotifyDelegate implements JavaDelegate {



    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    PermissionRepo permissionRepo;
    
    @Autowired
    RuntimeService runtimeService;

   @Autowired
   SoldeRepo soldeRepo;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {


        ObjectValue objectValue = delegateExecution.getVariableTyped("PermissionRequest");
        PermissionRequest permissionRequest = (PermissionRequest) objectValue.getValue();



        System.out.println("approoved");
        System.out.println(runtimeService.getVariables(delegateExecution.getProcessInstanceId()));


        Permission ps = new Permission();
        ps.setIdEmployee(permissionRequest.getIdEmployee());
        ps.setDatepermission(permissionRequest.getDatepermission());
        ps.setMessage(permissionRequest.getMessage());
        ps.setMotif(permissionRequest.getMotif());
        ps.setNombreheures(permissionRequest.getNombreheures());
        permissionRepo.save(ps);

        Solde soldeu = soldeRepo.findSoldeByIduser(permissionRequest.getIdEmployee());
        soldeu.setSoldeheure(soldeu.getSoldeheure()-permissionRequest.getNombreheures());
        soldeRepo.save(soldeu);


        String email = "houssem.jrad@esprit.tn";
        String name = (String) delegateExecution.getVariable("employeeName"); // Nom de l'employé pour personnaliser l'email

        SimpleMailMessage messages = new SimpleMailMessage();
        messages.setTo(email);
        messages.setSubject("Demande de Permission Approuvée");
        messages.setText("Bonjour " + name + ",\n\nVotre demande de permission a été approuvée.\n\nCordialement,\nL'équipe des Ressources Humaines");
        mailSender.send(messages);

        System.out.println("E-mail de notification envoyé à " + email);
    }



}

