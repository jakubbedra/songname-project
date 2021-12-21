package com.konfyrm.songname.players.dto;

public class UpdatePlayerScore {

    private float points;

    public UpdatePlayerScore() {

    }

    public UpdatePlayerScore(float points) {
        this.points = points;
    }

    public float getPoints() {
        return points;
    }

    public void setPoints(float points) {
        this.points = points;
    }

}
