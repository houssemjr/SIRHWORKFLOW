package com.example.rhservice.Repository;


import com.example.rhservice.Entity.Equipe;
import com.example.rhservice.Entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipeRepo extends JpaRepository<Equipe,Long> {


}
