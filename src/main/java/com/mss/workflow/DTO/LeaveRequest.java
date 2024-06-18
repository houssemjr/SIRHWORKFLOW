package com.mss.workflow.DTO;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class LeaveRequest  {


    private String leaveType;
    private Date startDate;
    private Date endDate;
    private String IdEmployee;
    private String message;

    private String processInstanceId;

    private boolean state ;



    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("employeeId", IdEmployee);
        map.put("leaveType", leaveType);
        map.put("startDate", startDate);
        map.put("endDate", endDate);
        return map;
    }


}
