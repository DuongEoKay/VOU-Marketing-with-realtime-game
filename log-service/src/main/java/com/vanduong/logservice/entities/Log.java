package com.vanduong.logservice.entities;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;



@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document(collection = "log")
public class Log {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String content;






}