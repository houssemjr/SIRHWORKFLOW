package com.mss.workflow.Repository;

import com.mss.workflow.Entity.Diagram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DiagramRepository extends JpaRepository<Diagram, Long> {

 Diagram findDiagramByWorkflows_Id(Long id);
}
