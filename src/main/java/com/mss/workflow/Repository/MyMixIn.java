package com.mss.workflow.Repository;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({
        "propertyAccessor",
        "propertyDescriptors",
        "readMethod",
        "genericReturnType"
})
public interface MyMixIn{
}
