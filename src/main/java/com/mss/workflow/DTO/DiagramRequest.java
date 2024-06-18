package com.mss.workflow.DTO;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class DiagramRequest {
    private String name;
    private String xml;

}
