package com.mss.workflow.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@RequiredArgsConstructor
public class StartProcessRequest {



    private String processKey;
    private Map<String, Object> variables;

}
