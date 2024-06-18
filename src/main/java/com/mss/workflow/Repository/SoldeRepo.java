package com.mss.workflow.Repository;

import com.mss.workflow.Entity.Solde;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SoldeRepo extends JpaRepository<Solde,Long> {

    Solde findSoldeByIduser(String id);
}
