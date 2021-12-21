package com.konfyrm.songname.game.dto;

import com.konfyrm.songname.players.model.Player;

import java.util.UUID;

public class GameTurnDTO {

    public class PlayerDTO {
        private UUID uuid;
        private String name;
        private float score;

        public PlayerDTO(UUID uuid, String name, float score) {
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

    private PlayerDTO player;
    private UUID songUuid;
    private int songAuthorsCount;
    private int turn;

    public GameTurnDTO(Player player, UUID songUuid, int songAuthorsCount, int turn) {
        this.player = new PlayerDTO(player.getUuid(), player.getName(), player.getScore());
        this.songUuid = songUuid;
        this.songAuthorsCount = songAuthorsCount;
        this.turn = turn;
    }

    public PlayerDTO getPlayer() {
        return player;
    }

    public UUID getSongUuid() {
        return songUuid;
    }

    public int getSongAuthorsCount() {
        return songAuthorsCount;
    }

    public int getTurn() {
        return turn;
    }

}
