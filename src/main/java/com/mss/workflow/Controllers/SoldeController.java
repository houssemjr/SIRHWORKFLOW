package com.mss.workflow.Controllers;


import com.mss.workflow.Entity.Solde;
import com.mss.workflow.Repository.SoldeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/solde")
@CrossOrigin("*")
public class SoldeController {

    @Autowired
    SoldeRepo soldeRepo;

    @GetMapping("/getsolde/{iduser}")
    Solde getSoldebyuser(@PathVariable String iduser)  {

        return soldeRepo.findSoldeByIduser(iduser);
    }

    @GetMapping("/getsoldes/{iduser}")
    public ResponseEntity<Solde> getSoldeByUserorcreate(@PathVariable String iduser) {
        // Try to find the existing solde
        Solde solde = soldeRepo.findSoldeByIduser(iduser);

        // Check if solde exists
        if (solde != null) {
            return ResponseEntity.ok(solde);
        } else {
            Solde newSolde = new Solde();
            newSolde.setIduser(iduser);
            newSolde.setSoldeconge(21F);
            newSolde.setSoldeheure(3);
            newSolde.setSoldemaladie(3F);
            Solde savedSolde = soldeRepo.save(newSolde);  // Save the new solde to the database

            return ResponseEntity.ok(savedSolde);  // Return the newly created solde
        }
    }
}
