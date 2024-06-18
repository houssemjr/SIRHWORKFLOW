package com.example.rhservice.Repository;

import com.example.rhservice.Entity.Workflow;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WorkflowRepo  extends JpaRepository<Workflow,Long> {
}
