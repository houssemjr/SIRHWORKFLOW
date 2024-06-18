package com.mss.workflow.Repository;


import com.mss.workflow.Entity.Motif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MotifRepo extends JpaRepository<Motif,Long> {

     Optional  <Motif> findMotifByTitre(String titre);
}
