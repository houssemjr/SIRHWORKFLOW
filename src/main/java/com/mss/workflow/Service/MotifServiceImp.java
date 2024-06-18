package com.mss.workflow.Service;


import com.mss.workflow.DTO.MotifDTO;
import com.mss.workflow.Entity.Motif;
import com.mss.workflow.Repository.MotifRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotifServiceImp implements MotifService{

    @Autowired
    MotifRepo motifRepo;
    @Override
    public void addMotif(Motif motif) {
        motifRepo.save(motif);

    }

    @Override
    public List<Motif> fetchAll() {
        return motifRepo.findAll();
    }

    private MotifDTO convertToDTO(Motif motif) {
        MotifDTO dto = new MotifDTO();
        dto.setId(motif.getId());
        dto.setTitre(motif.getTitre());
        dto.setValidite(motif.getValidite());
        dto.setCouleur(motif.getCouleur());
        dto.setCode(motif.getCode());
        dto.setWorkflow(motif.getWorkflow());
        dto.setType(motif.getType());
        dto.setSoldeInitial(motif.getSoldeInitial());
        dto.setUnite(motif.getUnite());
        dto.setDepassementAutorise(motif.getDepassementAutorise());
        return dto;
    }

}
