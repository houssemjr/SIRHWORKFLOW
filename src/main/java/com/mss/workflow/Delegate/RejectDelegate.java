package com.mss.workflow.Delegate;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;


@Component
public class RejectDelegate implements JavaDelegate {

    @Autowired
    JavaMailSender javaMailSender;


    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {

        String email = "houssem.jrad@esprit.tn";
        String name = (String) delegateExecution.getVariable("employeeName"); // Nom de l'employé pour personnaliser l'email

        SimpleMailMessage messages = new SimpleMailMessage();
        messages.setTo(email);
        messages.setSubject("Demande de Permission Approuvée");
        messages.setText("Bonjour " + name + ",\n\nVotre demande de permission a été rejeté merci pour votre comprehension.\n\nCordialement,\nL'équipe des Ressources Humaines");
        javaMailSender.send(messages);

        System.out.println("E-mail de notification envoyé à " + email);




    }
}
