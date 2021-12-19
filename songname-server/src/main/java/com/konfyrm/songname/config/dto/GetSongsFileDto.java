package com.konfyrm.songname.config.dto;

import java.util.List;
import java.util.UUID;

public class GetSongsFileDto {

    public static class SongGet {

        private UUID uuid;
        private String title;
        private List<UUID> authorUuids;

        public SongGet() {
        }

        public SongGet(UUID uuid, String title, List<UUID> authorUuids) {
            this.uuid = uuid;
            this.title = title;
            this.authorUuids = authorUuids;
        }

        public UUID getUuid() {
            return uuid;
        }

        public String getTitle() {
            return title;
        }

        public List<UUID> getAuthorUuids() {
            return authorUuids;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setAuthorUuids(List<UUID> authorUuids) {
            this.authorUuids = authorUuids;
        }
    }

    private List<SongGet> songs;

    public GetSongsFileDto() {
    }

    public List<SongGet> getSongs() {
        return songs;
    }

    public void setSongs(List<SongGet> songs) {
        this.songs = songs;
    }

}
