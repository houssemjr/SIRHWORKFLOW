package com.mss.workflow.Repository;


import com.mss.workflow.Entity.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave,Long> {

List<Leave>findLeaveByStateFalse();
}
