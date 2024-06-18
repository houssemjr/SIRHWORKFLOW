package com.example.rhservice.Service;


import com.example.rhservice.Entity.Equipe;
import com.example.rhservice.Entity.UserInfo;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EquipeService {

    public Equipe save(Equipe equipe);
    public List<Equipe> fetchAll();
   // public Equipe addMembreToEquipe(Long equipeId, Long userId);

    List<UserInfo>getUserInfoEq(Long ide);

    UserInfo assignuserequipe(Long idUser, Long idEquipe);

}
