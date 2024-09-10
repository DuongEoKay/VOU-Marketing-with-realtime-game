package com.vanduong.reportservice.entities;

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
@Document(collection = "play")
public class PlayData {
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    private String userId;

    private String gameId;

    private String eventId;

    private int scores;

    private String date;









}