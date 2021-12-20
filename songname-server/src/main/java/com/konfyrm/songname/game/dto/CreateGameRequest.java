package com.konfyrm.songname.game.dto;

import java.util.List;

public class CreateGameRequest {

    private int turns;
    private List<String> excludedAuthorUuids;

    public CreateGameRequest(int turns, List<String> excludedAuthorUuids) {
        this.turns = turns;
        this.excludedAuthorUuids = excludedAuthorUuids;
    }

    public int getTurns() {
        return turns;
    }

    public List<String> getExcludedAuthorUuids() {
        return excludedAuthorUuids;
    }

}
