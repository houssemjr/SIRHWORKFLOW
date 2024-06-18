package com.mss.workflow.Config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.camunda.bpm.engine.impl.history.parser.ActivityInstanceUpdateListener;
import org.camunda.bpm.engine.impl.persistence.entity.TaskEntity;

import java.io.IOException;

public class ActivityInstanceUpdateListenerSerializer extends StdSerializer<TaskEntity> {

    public ActivityInstanceUpdateListenerSerializer() {
        super(TaskEntity.class);
    }

    @Override
    public void serialize(TaskEntity taskEntity, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("id", TaskEntity.CASE_INSTANCE_ID);
        jsonGenerator.writeStringField("name", TaskEntity.NAME);
        jsonGenerator.writeStringField("description", TaskEntity.DESCRIPTION);
        jsonGenerator.writeEndObject();

    }
}
