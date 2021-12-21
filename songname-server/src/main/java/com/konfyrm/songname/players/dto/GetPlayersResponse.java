package com.konfyrm.songname.players.dto;

import com.konfyrm.songname.players.model.Player;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

public class GetPlayersResponse {

    public class PlayerDto {
        private UUID uuid;
        private String name;
        private float score;

        public PlayerDto(UUID uuid, String name, float score) {
            this.uuid = uuid;
            this.name = name;
            this.score = score;
        }

        public UUID getUuid() {
            return uuid;
        }

        public String getName() {
            return name;
        }

        public float getScore() {
            return score;
        }
    }

    private List<PlayerDto> players;

    public GetPlayersResponse(List<Player> players) {
        this.players = new LinkedList<>();
        players.forEach(p ->
                this.players.add(new PlayerDto(p.getUuid(), p.getName(), p.getScore()))
        );
    }

    public List<PlayerDto> getPlayers() {
        return players;
    }

}
