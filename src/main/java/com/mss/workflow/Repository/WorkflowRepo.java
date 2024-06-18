package com.mss.workflow.Repository;

import com.mss.workflow.Entity.Workflow;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface WorkflowRepo  extends JpaRepository<Workflow,Long> {


    @EntityGraph(attributePaths = {"diagram"})
    Optional<Workflow> findById(Long id);

}
