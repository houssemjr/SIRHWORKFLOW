package com.mss.workflow.Service;

import com.mss.workflow.DTO.DiagramRequest;
import com.mss.workflow.Entity.Diagram;
import com.mss.workflow.Repository.DiagramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagramService {

    @Autowired
    private DiagramRepository diagramRepository;

    public void saveDiagram(DiagramRequest diagramRequest) {
        Diagram diagram = new Diagram();
        diagram.setName(diagramRequest.getName());
        diagram.setXml(diagramRequest.getXml());
        diagramRepository.save(diagram);
    }

    public List<Diagram> fetchAllD(){
        return diagramRepository.findAll();
    }
}
