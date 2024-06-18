package com.mss.workflow.DTO;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@RequiredArgsConstructor
public class TaskWithVariables {

    private String id;
    private String name;
    private String assignee;

    private Map<String, Object> variables;

    public TaskWithVariables(String id, String name, String assignee,Map<String, Object> variables) {
        this.id = id;
        this.name = name;
        this.assignee=assignee;
        this.variables = variables;

    }
}
