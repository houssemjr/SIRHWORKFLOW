package com.example.rhservice.Repository;

import com.example.rhservice.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface userRepository extends JpaRepository<Users, UUID> {
}
