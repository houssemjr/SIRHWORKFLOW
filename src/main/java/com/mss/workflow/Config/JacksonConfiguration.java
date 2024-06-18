package com.mss.workflow.Config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.validation.DefaultMessageCodesResolver;

import java.io.IOException;

@Configuration
public class JacksonConfiguration {

    @Bean
    public ObjectMapper objectMapper() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();

        // Désactiver Seriali   zationFeature.FAIL_ON_EMPTY_BEANS
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

        // Configurer le filtrage des propriétés
        SimpleFilterProvider filterProvider = new SimpleFilterProvider();
        filterProvider.addFilter("myCustomFilter",
                SimpleBeanPropertyFilter.serializeAllExcept("theFieldToExclude"));
        objectMapper.setFilterProvider(filterProvider);

        // Ajout d'un module pour gérer les types problématiques avec un sérialiseur par défaut
        SimpleModule module = new SimpleModule();
        module.addSerializer(DefaultMessageCodesResolver.class, new StdSerializer<DefaultMessageCodesResolver>(DefaultMessageCodesResolver.class) {
            @Override
            public void serialize(DefaultMessageCodesResolver value, JsonGenerator gen, SerializerProvider provider) throws IOException {
                gen.writeStartObject();
                gen.writeStringField("message", "Custom serialization logic needed");
                gen.writeEndObject();
            }
        });
        objectMapper.registerModule(module);

        return objectMapper;
    }
}
