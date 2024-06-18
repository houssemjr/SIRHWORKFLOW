package com.mss.workflow.Service;


import com.mss.workflow.Entity.Motif;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MotifService {

    public void addMotif(Motif motif);
    List<Motif>fetchAll();
}
