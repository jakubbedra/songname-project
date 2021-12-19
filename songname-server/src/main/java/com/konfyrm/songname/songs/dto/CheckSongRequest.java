package com.konfyrm.songname.songs.dto;

import java.util.List;
import java.util.UUID;

public class CheckSongRequest {

    private UUID uuid;
    private String title;
    private List<String> authorNames;

    public CheckSongRequest(UUID uuid, String title, List<String> authorNames) {
        this.uuid = uuid;
        this.title = title;
        this.authorNames = authorNames;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getAuthorNames() {
        return authorNames;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthorNames(List<String> authorNames) {
        this.authorNames = authorNames;
    }

}
