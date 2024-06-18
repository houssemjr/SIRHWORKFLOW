package com.mss.workflow.Controllers;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mss.workflow.DTO.MotifDTO;
import com.mss.workflow.Entity.Motif;
import com.mss.workflow.Repository.MotifRepo;
import com.mss.workflow.Service.MotifService;
import com.mss.workflow.Service.MotifServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/motif")
@CrossOrigin("*")
public class MotifController {
    @Autowired
    MotifService motifService;
    @Autowired
    MotifRepo motifRepo;

    @Autowired
    MotifServiceImp motifServiceImp;

    @PostMapping("/add")
    private void addMotif(@RequestBody Motif motif){
    motifService.addMotif(motif);
    }
    @GetMapping("/getall")
    List<Motif>fetchAll(){
        return motifService.fetchAll();
    }



        @GetMapping("/getbt/{titre}")
              Optional  <Motif> getbt(@PathVariable String titre) {
        Motif motif = new Motif();
        Optional <Motif>  m= motifRepo.findMotifByTitre(titre);
       return m;
        }

        @GetMapping("/findbyid/{id}")
        Motif findbyid(@PathVariable Long id){
        return motifRepo.findById(id).orElse(null);
        }
    }




