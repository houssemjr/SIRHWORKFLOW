package com.mss.workflow.Repository;

import com.mss.workflow.Entity.FinalReportLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FinalReportLeaveRepo extends JpaRepository<FinalReportLeave,Long> {
}
