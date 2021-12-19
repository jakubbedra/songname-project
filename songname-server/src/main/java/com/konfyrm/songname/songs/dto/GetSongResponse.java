package com.konfyrm.songname.songs.dto;

import com.konfyrm.songname.authors.model.Author;
import com.konfyrm.songname.songs.model.Song;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class GetSongResponse {

    private UUID uuid;
    private String title;
    private List<String> authors;

    public GetSongResponse(Song song) {
        this.uuid = song.getUuid();
        this.title = song.getTitle();
        this.authors = song.getAuthors().stream().map(Author::getName).collect(Collectors.toList());
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

}
