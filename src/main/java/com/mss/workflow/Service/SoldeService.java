package com.mss.workflow.Service;


import com.mss.workflow.Entity.Solde;
import com.mss.workflow.Repository.SoldeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SoldeService {

    @Autowired
    SoldeRepo soldeRepo;

      void updateSolde(String iduser, int nbh){

        Solde soldeu = soldeRepo.findSoldeByIduser(iduser);
        soldeu.setSoldeheure(soldeu.getSoldeheure()-nbh);
        soldeRepo.save(soldeu);

    }
}
