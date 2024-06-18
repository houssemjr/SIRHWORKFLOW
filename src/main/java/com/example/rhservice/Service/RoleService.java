package com.example.rhservice.Service;

import com.example.rhservice.DTO.RoleDTO;
import com.example.rhservice.keyckloak.KeycloakConfig;
import lombok.RequiredArgsConstructor;
import org.keycloak.admin.client.resource.GroupsResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {



  public void addRole (RoleDTO roleDTO){

      RoleRepresentation role=new RoleRepresentation();
      role.setName(roleDTO.getRoleName());
      role.setDescription(roleDTO.getDescription());
RolesResource rs =getInstance();
rs.create(role);

  }



  public List<RoleRepresentation> getAllRoles(){

       RolesResource rs = getInstance();
        List<RoleRepresentation> availableRoles = rs.list();
        return availableRoles;
    }

    public List<GroupRepresentation> getAllgroups(){
        GroupsResource gs=getInstanceg();
        List<GroupRepresentation> aviablegroupe=gs.groups();
        return  aviablegroupe;
    }




    public RolesResource getInstance(){
        return KeycloakConfig.getInstance().realm(KeycloakConfig.realm).roles();
    }

    public GroupsResource getInstanceg() {
        return  KeycloakConfig.getInstance().realm(KeycloakConfig.realm).groups();
    }


}
