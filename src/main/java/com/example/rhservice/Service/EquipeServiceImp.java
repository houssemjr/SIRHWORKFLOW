package com.example.rhservice.Service;

import com.example.rhservice.Entity.Equipe;
import com.example.rhservice.Entity.Role;
import com.example.rhservice.Entity.UserInfo;
import com.example.rhservice.Repository.EquipeRepo;
import com.example.rhservice.Repository.RoleRepo;
import com.example.rhservice.Repository.UserInforRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class EquipeServiceImp implements EquipeService{

    @Autowired
    EquipeRepo equipeRepo;
    @Autowired
    UserInforRep userInforRep;
    @Autowired
    RoleRepo roleRepo;
    @Override
    public Equipe save(Equipe equipe) {
        return equipeRepo.save(equipe);
    }

    @Override
    public List<Equipe> fetchAll() {
        return equipeRepo.findAll();
    }

    @Override
    public List<UserInfo> getUserInfoEq(Long ide) {
        Equipe equipe=equipeRepo.findById(ide).orElse(null);

        return  equipe.getMembers();
    }

    @Override
    public UserInfo assignuserequipe(Long idUser,Long idEquipe) {
        UserInfo us = userInforRep.findById(idUser).orElse(null);
        Equipe eq=equipeRepo.findById(idEquipe).orElse(null);
        if(us.getEquipes()==null){
            List<Equipe> UL = new ArrayList<>();
            UL.add(eq);
            us.setEquipes(UL);
        }
         us.getEquipes().add(eq);
        return userInforRep.save(us);
    }








}

