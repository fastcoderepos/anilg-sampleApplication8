package com.fastcode.dvdrental.application.core.filmactor.dto;

import java.time.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetFilmOutput {

    private String description;
    private Integer filmId;
    private Short length;
    private String rating;
    private Integer releaseYear;
    private Short rentalDuration;
    private Double rentalRate;
    private Double replacementCost;
    private String title;
    private Integer filmActorActorId;
    private Integer filmActorFilmId;
}
