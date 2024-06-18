package com.example.rhservice.Repository;

import com.example.rhservice.Entity.Equipe;
import com.example.rhservice.Entity.UserInfo;
import com.example.rhservice.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserInforRep extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByUsername(String username);

  //  List<UserInfo>getUserInfoByEquipes(Equipe equipe);
}
