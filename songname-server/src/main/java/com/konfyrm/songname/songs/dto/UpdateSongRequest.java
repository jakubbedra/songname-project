package com.konfyrm.songname.songs.dto;

import java.util.List;
import java.util.UUID;

public class UpdateSongRequest {

    private String title;
    private List<UUID> authorUuids;

    public UpdateSongRequest(String title, List<UUID> authorUuids) {
        this.title = title;
        this.authorUuids = authorUuids;
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
