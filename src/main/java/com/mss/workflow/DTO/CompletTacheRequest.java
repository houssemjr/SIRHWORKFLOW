package com.mss.workflow.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CompletTacheRequest {
    public CompletTacheRequest(String taskId, String decision) {
        this.taskId = taskId;
        this.decision = decision;
    }


    private String taskId;
    private String decision;

}
